import React, { useCallback, useEffect, useState } from "react";
import Container from "../ui/Container";
import { fetchNews } from "../../shared/api/newsApi";
import PetsItems from "./PetsItems";
import { sileo } from "sileo";

const Pets = () => {
  const [news, setNews] = useState([]);
  const [request, setRequest] = useState({
    status: "idle",
    error: null,
  });
  const [paramsInfo, setParamsInfo] = useState({
    page: 1,
    country: "us",
  });

  const isLoading = request.status === "loading";

  const loadNews = useCallback(async (currentParams) => {
    setRequest((prev) => ({
      status: "loading",
      error: null,
    }));

    try {
      const articles = await sileo.promise(
        fetchNews(currentParams),
        {
          loading: { title: "Loading news..." },
          success: { title: "News successfully loaded!" },
          error: { title: "Failed to load news" },
        }
      );;

      const validArticles = articles.filter(
        (article) => article.url && article.title !== "[Removed]",
      );

      setNews((prevNews) => [...prevNews, ...validArticles]);
      setRequest((prev) => ({
        status: "success",
        error: null,
      }));
    } catch (error) {
      console.error(error);

      setRequest((prev) => ({
        status: "error",
        error,
      }));
    }
  }, []);

  useEffect(() => {
    loadNews(paramsInfo);
  }, [paramsInfo, loadNews]);

  const handleLoadMore = () => {
    if (isLoading) return;

    setParamsInfo((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
  };

  return (
    <section className="pb-20">
      <Container className="space-y-10">
        <h2 className="text-[20px] font-medium">Interacting with our pets</h2>

        <div className="space-y-5">
          <PetsItems news={news} />
          <button
            onClick={handleLoadMore}
            disabled={isLoading}
            className="rounded-[10px] py-[10px] px-[30px] bg-[#FFB36C] text-black text-[16px] font-medium cursor-pointer hover:opacity-80 transition"
          >
            {isLoading ? "Loading..." : "See more"}
          </button>
        </div>
      </Container>
    </section>
  );
};

export default Pets;
