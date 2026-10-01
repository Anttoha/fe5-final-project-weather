import { useCallback, useEffect, useRef, useState } from "react";

import { fetchCurrentWeather, fetchWeatherForecast } from "../api/owmApi.js";
import { loadCities } from "../utils/saveCities.js";
import { mapWeatherToCity } from "../utils/mapWeatherToCity.js";

const HALF_HOUR = 30 * 60 * 1000;

const cityKey = (city) => {
  return city.id ?? `${city.lat},${city.lon}`;
};

const getDelayToNextSlot = () => {
  const now = new Date();
  const next = new Date(now);

  next.setSeconds(0, 0);

  if (now.getMinutes() < 30) {
    next.setMinutes(30);
  } else {
    next.setHours(now.getHours() + 1);
    next.setMinutes(0);
  }

  return next.getTime() - now.getTime();
};

export const useCitiesWeather = () => {
  const [cities, setCities] = useState(loadCities);

  const citiesRef = useRef(cities);

  const isCityFresh = (city) => {
    if (!city.updatedAt) return false;

    return Date.now() - city.updatedAt < HALF_HOUR;
  };

  useEffect(() => {
    citiesRef.current = cities;
  }, [cities]);

  const refreshCities = useCallback(async () => {
    const currentCities = citiesRef.current;

    if (currentCities.length === 0) return;

    const updatedCities = await Promise.all(
      currentCities.map(async (city) => {
        if (isCityFresh(city)) {
          return city;
        }

        try {
          const data = await fetchCurrentWeather({
            lat: city.lat,
            lon: city.lon,
          });

          const forecast = await fetchWeatherForecast({
            lat: city.lat,
            lon: city.lon,
          });

          return mapWeatherToCity(city, data, forecast);
        } catch (error) {
          console.error(`Failed to update ${city.city}:`, error);

          return city;
        }
      }),
    );

    const citiesByKey = new Map(
      updatedCities.map((city) => [cityKey(city), city]),
    );

    setCities((prevCities) =>
      prevCities.map((city) => citiesByKey.get(cityKey(city)) ?? city),
    );
  }, []);

  const refreshCity = useCallback(async (id) => {
    const city = citiesRef.current.find((city) => city.id === id);

    if (!city) return;

    try {
      const data = await fetchCurrentWeather({
        lat: city.lat,
        lon: city.lon,
      });
      const forecast = await fetchWeatherForecast({
        lat: city.lat,
        lon: city.lon,
      });

      const updatedCity = mapWeatherToCity(city, data, forecast);

      setCities((prevCities) =>
        prevCities.map((city) => (city.id === id ? updatedCity : city)),
      );
    } catch (error) {
      console.error(`Failed to update ${city.city}:`, error);
      throw error;
    }
  }, []);

  useEffect(() => {
    let timeoutId;

    const scheduleNextUpdate = () => {
      timeoutId = setTimeout(async () => {
        await refreshCities();

        scheduleNextUpdate();
      }, getDelayToNextSlot());
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState !== "visible") {
        return;
      }

      const currentCities = citiesRef.current;

      if (currentCities.length === 0) return;

      const oldestUpdate = Math.min(
        ...currentCities.map((city) => city.updatedAt || 0),
      );

      const isStale = Date.now() - oldestUpdate >= HALF_HOUR;

      if (isStale) {
        refreshCities();
      }
    };

    refreshCities();
    scheduleNextUpdate();

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      clearTimeout(timeoutId);

      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshCities]);

  return {
    cities,
    setCities,
    refreshCities,
    refreshCity,
  };
};
