import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "../../shared/utils/cn";

const SwiperNavigation = ({ swiper, className = "" }) => {
  const [state, setState] = useState({
    isBeginning: true,
    isEnd: true,
    isLocked: true,
  });

  useEffect(() => {
    if (!swiper || swiper.destroyed) return;

    const updateState = () => {
      setState({
        isBeginning: swiper.isBeginning,
        isEnd: swiper.isEnd,
        isLocked: swiper.isLocked,
      });
    };

    updateState();

    swiper.on("slideChange", updateState);
    swiper.on("reachBeginning", updateState);
    swiper.on("reachEnd", updateState);
    swiper.on("fromEdge", updateState);

    swiper.on("lock", updateState);
    swiper.on("unlock", updateState);

    swiper.on("update", updateState);
    swiper.on("slidesLengthChange", updateState);
    swiper.on("slidesUpdated", updateState);

    return () => {
      swiper.off("slideChange", updateState);
      swiper.off("reachBeginning", updateState);
      swiper.off("reachEnd", updateState);
      swiper.off("fromEdge", updateState);

      swiper.off("lock", updateState);
      swiper.off("unlock", updateState);

      swiper.off("update", updateState);
      swiper.off("slidesLengthChange", updateState);
      swiper.off("slidesUpdated", updateState);
    };
  }, [swiper]);

  const { isBeginning, isEnd, isLocked } = state;

  return (
    <>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => swiper?.slidePrev()}
        className={cn(
          `absolute left-0 top-1/2 z-20 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center bg-white shadow-md transition-all
 hover:bg-brand hover:text-white
 active:scale-90 squircle-150 overflow-hidden`,
          (isBeginning || isLocked) &&
            "pointer-events-none opacity-0",
          className,
        )}
      >
        <ChevronLeft />
      </button>

      <button
        type="button"
        aria-label="Next slide"
        onClick={() => swiper?.slideNext()}
        className={cn(
          `absolute right-0 top-1/2 z-20 flex h-10 w-10 translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center bg-white shadow-md transition-all
 hover:bg-brand hover:text-white
 active:scale-90 squircle-150`,
          (isEnd || isLocked) &&
            "pointer-events-none opacity-0",
          className,
        )}
      >
        <ChevronRight />
      </button>
    </>
  );
};

export default SwiperNavigation;