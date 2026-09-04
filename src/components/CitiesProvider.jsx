import React, { useMemo, useState } from "react";

import { CitiesContext } from "../shared/contexts/citiesContext.js";
import { useCitiesWeather } from "../shared/hooks/useCitiesWeather.js";
import { MAX_CITIES } from "../shared/constants/config.js";

const CitiesProvider = ({ children }) => {
  const { cities, setCities, refreshCities, refreshCity } = useCitiesWeather();

  const [weatherDetails, setWeatherDetails] = useState({
    type: null,
    visibleTypes: [],
    cityId: null,

    scrollRequest: 0,
    waitForLayout: false,
  });

  const value = useMemo(
    () => ({
      cities,
      setCities,

      refreshCities,
      refreshCity,

      weatherDetails,
      setWeatherDetails,
    }),
    [cities, refreshCities, refreshCity, weatherDetails],
  );

  return (
    <CitiesContext.Provider value={value}>{children}</CitiesContext.Provider>
  );
};

export default CitiesProvider;
