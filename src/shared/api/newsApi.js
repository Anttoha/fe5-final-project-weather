import { fetchJson } from "../helpers/fetchJson";

const API_KEY = import.meta.env.VITE_NEWS_KEY;

export const fetchNews = async ({ country, page }) => {
const data = await fetchJson("https://newsapi.org/v2/top-headlines", {
    country: country.toLowerCase(),
    apiKey: API_KEY,
    page,
    pageSize: 4,
  });

  return Array.isArray(data.articles) ? data.articles : [];
};