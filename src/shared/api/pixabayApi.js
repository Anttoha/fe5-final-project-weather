import axios from "axios";

const API_KEY = import.meta.env.VITE_PIXABAY_KEY;

export const fetchPixabay = async ({
  query = "nature",
  page = 1,
  perPage = 12,
}) => {
  try {
    const { data } = await axios.get("https://pixabay.com/api/", {
      params: {
        key: API_KEY,
        q: query,
        page: page,
        per_page: perPage,
      },
    });

    return data;
  } catch (error) {
    const errorMessage =
      typeof error.response?.data === "string"
        ? error.response.data
        : error.message || "Ошибка при получении данных от Pixabay";
    throw new Error(errorMessage);
  }
};