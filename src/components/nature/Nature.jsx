import React, { useCallback, useEffect, useState } from "react";
import Container from "../ui/Container";
import NatureItems from "./NatureItems";
import { fetchPixabay } from "../../shared/api/pixabayApi";
import { useNearViewport } from "../../shared/hooks/useNearViewport";

const PER_PAGE = 12;

const Nature = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [request, setRequest] = useState({
    status: "idle",
    error: null,
    message: null,
  });
  const isLoading = request.status === "loading";
  const [hasMore, setHasMore] = useState(true);
  const [sectionRef, shouldLoad] = useNearViewport("0px 0px -150px 0px");

  const loadFirstPage = useCallback(async () => {
    setRequest({
      status: "loading",
      error: null,
      message: null,
    });

    try {

      const data = await fetchPixabay({
        query: "nature",
        page: 1,
        perPage: PER_PAGE,
      });

      setItems(data.hits);
      setHasMore(data.hits.length < data.totalHits);
      setRequest({
        status: "success",
        error: null,
        message: null,
      });
    } catch (error) {
      console.error(error);

      setRequest({
        status: "error",
        error,
        message: error.message || "An error occurred while loading.",
      });
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    loadFirstPage();
  }, [shouldLoad, loadFirstPage]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;
    setRequest((prev) => ({
      ...prev,
      status: "loading",
      error: null,
      message: null,
    }));

    try {
      const nextPage = page + 1;

      const data = await fetchPixabay({
        query: "nature",
        page: nextPage,
        perPage: PER_PAGE,
      });

      setItems((prevItems) => {
        const newItems = [...prevItems, ...data.hits];
        setHasMore(newItems.length < data.totalHits);
        return newItems;
      });

      setPage(nextPage);
      setRequest({
        status: "success",
        error: null,
        message: null,
      });
    } catch (error) {
      console.error(error);

      setRequest({
        status: "error",
        error,
        message: error.message || "Произошла ошибка при дозагрузке",
      });
    }
  };

  return (
    <section ref={sectionRef} className="pb-12 w-full">
      <Container className="w-full">
        <h2 className="text-[20px] font-medium">Beautiful nature</h2>

        {request.status === "error" && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-5 text-red-600">
              <p className="font-semibold">Ошибка загрузки:</p>
              <p className="mt-1 text-sm">{request.message}</p>
            </div>
          )}
        <NatureItems
          items={items}
          onLoadMore={loadMore}
          isLoading={isLoading}
          hasMore={hasMore}
        />
      </Container>
    </section>
  );
};

export default Nature;
