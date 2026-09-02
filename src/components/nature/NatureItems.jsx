import React, { useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import NatureItem from "./NatureItem";
import SwiperNavigation from "../ui/SwiperNavigation";

const NatureItems = ({
  items,
  onLoadMore,
  isLoading,
  hasMore,
}) => {
  const [swiper, setSwiper] = useState(null);

  const updateOpacity = (swiperInstance) => {
    swiperInstance.slides.forEach((slide) => {
      const distance = Math.abs(slide.progress);

      let opacity = 0;

      if (distance <= 2) {
        opacity = 1;
      } else if (distance < 3) {
        opacity = 3 - distance;
      }

      slide.style.opacity = opacity;
      slide.style.pointerEvents =
        opacity > 0 ? "auto" : "none";
    });
  };

  return (
    <div className="relative w-full site-xl:w-200 mx-auto py-10">
      <Swiper
        modules={[EffectCoverflow]}
        effect="coverflow"
        grabCursor
        centeredSlides
        slidesPerView="auto"
        loop={false}
        speed={350}
        watchSlidesProgress
        watchOverflow
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          updateOpacity(swiperInstance);
        }}
        onSetTranslate={updateOpacity}
        onReachEnd={() => {
          if (!isLoading && hasMore) {
            onLoadMore();
          }
        }}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 600,
          modifier: 1,
          slideShadows: false,
        }}
      >
        {items.map((slide) => (
          <SwiperSlide
            key={slide.id}
            className="h-50! w-75! will-change-[opacity,transform]"
          >
            <NatureItem item={slide} />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperNavigation swiper={swiper} />

      {isLoading && (
        <p className="mt-4 text-center">
          Загрузка...
        </p>
      )}
    </div>
  );
};

export default NatureItems;