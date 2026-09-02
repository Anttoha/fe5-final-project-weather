import axios from "axios";

const API_KEY = import.meta.env.VITE_PIXABAY_KEY;

export const fetchPixabay = async ({
  query = "nature",
  page = 1,
  perPage = 12,
}) => {
  const { data } = await axios.get("https://pixabay.com/api/", {
    params: {
      key: API_KEY,
      q: query,
      page: page,
      per_page: perPage,
    },
  });

  return data;
};
