import React, { useCallback, useEffect, useState } from "react";
import Container from "../ui/Container";
import NatureItems from "./NatureItems";
import { fetchPixabay } from "../../shared/api/pixabayApi";
import { useNearViewport } from "../../shared/hooks/useNearViewport";

const PER_PAGE = 12;

const Nature = () => {
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sectionRef, shouldLoad] = useNearViewport("0px 0px -150px 0px");

  const loadFirstPage = useCallback(async () => {
    try {
      setIsLoading(true);

      const data = await fetchPixabay({
        query: "nature",
        page: 1,
        perPage: PER_PAGE,
      });

      setItems(data.hits);
      setHasMore(data.hits.length < data.totalHits);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    loadFirstPage();
  }, [shouldLoad, loadFirstPage]);

  const loadMore = async () => {
    if (isLoading || !hasMore) return;

    try {
      setIsLoading(true);

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
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section ref={sectionRef} className="pb-12 w-full">
      <Container className="w-full">
        <h2 className="text-[20px] font-medium">Beautiful nature</h2>

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
