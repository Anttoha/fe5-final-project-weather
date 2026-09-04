import { fetchJson } from "../helpers/fetchJson";

const API_KEY = import.meta.env.VITE_OWM_KEY;

export const searchCities = async (query) => {
  return fetchJson("https://api.openweathermap.org/geo/1.0/direct", {
    q: query,
    limit: 5,
    appid: API_KEY,
  });
};

export const fetchCurrentWeather = async ({ lat, lon }) => {
  return fetchJson("https://api.openweathermap.org/data/2.5/weather", {
    lat,
    lon,
    units: "metric",
    appid: API_KEY,
  });
};

export const fetchWeatherForecast = async ({ lat, lon }) => {
  return fetchJson("https://api.openweathermap.org/data/2.5/forecast", {
    lat,
    lon,
    units: "metric",
    lang: "en",
    exclude: "current,minutely,alerts",
    appid: API_KEY,
  });
};
