import React, { useCallback, useEffect, useState } from "react";
import Container from "../ui/Container";
import { fetchNews } from "../../shared/api/newsApi";
import PetsItems from "./PetsItems";
import { useNearViewport } from "../../shared/hooks/useNearViewport";

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
  const [error, setError] = useState(null);

  const isLoading = request.status === "loading";
  const [hasMore, setHasMore] = useState(true);

  const [sectionRef, shouldLoad] = useNearViewport("0px 0px -150px 0px");

  const loadNews = useCallback(async (currentParams) => {
    setRequest((prev) => ({
      status: "loading",
      error: null,
    }));

    try {
      const articles = await fetchNews(currentParams);

      if (articles.length === 0) {
        setHasMore(false);

        setRequest({
          status: "success",
          error: null,
        });

        return;
      }

      const validArticles = articles.filter(
        (article) => article?.url && article?.title !== "[Removed]",
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
        message: error.message || "An unexpected error occurred.",
      }));
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    loadNews(paramsInfo);
  }, [shouldLoad, paramsInfo, loadNews]);

  const handleLoadMore = () => {
    if (isLoading) return;

    setParamsInfo((prevParams) => ({
      ...prevParams,
      page: prevParams.page + 1,
    }));
  };

  return (
    <section ref={sectionRef} className="pb-20">
      <Container className="space-y-10">
        <h2 className="text-[20px] font-medium">Interacting with our pets</h2>

        <div className="min-h-[360px] space-y-5">
          {request.status === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
              <p className="mt-1 text-sm">{request.message}</p>
            </div>
          )}

          {news.length > 0 && <PetsItems news={news} />}

          {request.status === "success" && hasMore && (
            <button
              onClick={handleLoadMore}
              disabled={isLoading}
              className="squircle-24 bg-[#FFB36C] px-[30px] py-[10px] text-[16px] font-medium text-black transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? "Loading..." : "See more"}
            </button>
          )}
        </div>
      </Container>
    </section>
  );
};

export default Pets;
