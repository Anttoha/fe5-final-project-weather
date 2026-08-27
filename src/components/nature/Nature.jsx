import React from "react";
import Container from "../ui/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";

const slides = [
  {
    id: 1,
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
  {
    id: 2,
    img: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
  },
  {
    id: 3,
    img: "https://images.unsplash.com/photo-1426604966848-d7adac402bff",
  },
  {
    id: 4,
    img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
  },
  {
    id: 5,
    img: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e",
  },
];

const Nature = () => {
  return (
    <section className="pb-12">
      <Container className="">
        <h2 className="text-[20px] font-medium">Beautiful nature</h2>

        <div className="w-full py-10 overflow-hidden">
          <Swiper
            modules={[EffectCoverflow]}
            effect="coverflow"
            grabCursor={true}
            centeredSlides={true}
            slidesPerView="auto"
            loop={true}
            coverflowEffect={{
              rotate: 0,
              stretch: 0, // Нахлест слайдов друг на друга
              depth: 600, // Уводит боковые слайды в глубину (уменьшает их)
              modifier: 1,
              slideShadows: true, // Включаем родные тени Swiper — они идеально затемняют боковые слайды
            }}
            className="w-full py-10 [&_.swiper-slide-active]:z-30"
          >
            {slides.map((slide) => (
              <SwiperSlide
                key={slide.id}
                className="!w-[300px] !h-[200px] transition-transform duration-300"
              >
                <img
                  src={slide.img}
                  alt={`Slide ${slide.id}`}
                  className="w-full h-full object-cover shadow-lg"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </Container>
    </section>
  );
};

export default Nature;
