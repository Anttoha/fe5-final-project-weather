import { useEffect, useState } from "react";

import {
  fetchCurrentWeather,
  fetchWeatherForecast,
  searchCities,
} from "../api/owmApi";

import { mapWeatherToCity } from "../utils/mapWeatherToCity";
import { useIconActions } from "./useIconActions";

const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 10000,
      maximumAge: 300000,
    });
  });
};

export const useCitySearch = (onAddCity) => {
  const { runAction, getStatus } = useIconActions();

  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const isAddingCity = getStatus("addCity") === "loading";

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
  };

  const addCityByCoords = async ({ lat, lon, name, country }) => {
    const [weatherData, forecast] = await Promise.all([
      fetchCurrentWeather({ lat, lon }),
      fetchWeatherForecast({ lat, lon }),
    ]);

    const newCity = mapWeatherToCity(
      {
        id: weatherData.id,
        city: name ?? weatherData.name,
        country: country ?? weatherData.sys?.country ?? "",
        isLiked: false,
        lat,
        lon,
      },
      weatherData,
      forecast,
    );

    onAddCity(newCity);

    clearSearch();
  };

  const selectCity = (city) => {
    runAction(
      "addCity",
      () =>
        addCityByCoords({
          lat: city.lat,
          lon: city.lon,
          name: city.name,
          country: city.country,
        }),
      800,
    );
  };

  const selectCurrentLocation = () => {
    runAction(
      "addCity",
      async () => {
        const position = await getCurrentPosition();

        const { latitude, longitude } = position.coords;

        await addCityByCoords({
          lat: latitude,
          lon: longitude,
        });
      },
      800,
    );
  };

  useEffect(() => {
    const normalizedQuery = query.trim();

    if (normalizedQuery.length < 3) {
      setSearchResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const data = await searchCities(normalizedQuery);

        setSearchResults(data);
      } catch (error) {
        console.error(error);
      }
    }, 400);

    return () => clearTimeout(timeoutId);
  }, [query]);

  return {
    query,
    setQuery,
    searchResults,
    isAddingCity,
    selectCity,
    selectCurrentLocation,
    clearSearch,
  };
};
