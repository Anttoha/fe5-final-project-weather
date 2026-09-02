import axios from "axios";

const API_KEY = import.meta.env.VITE_NEWS_KEY;

export const fetchNews = async ({ country, page }) => {
  const { data } = await axios.get("https://newsapi.org/v2/top-headlines", {
    params: {
      country: country.toLowerCase(),
      apiKey: API_KEY,
      page,
      pageSize: 4,
    },
  });
  return data.articles;
};
