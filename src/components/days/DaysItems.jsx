import React, { useState } from "react";
import DaysItem from "./DaysItem";
import { useCities } from "../../shared/contexts/citiesContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "../../shared/utils/cn";
import { isSameCity } from "../../shared/utils/isSameCity";

const DaysItems = () => {
  const [swiper, setSwiper] = useState(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  const { cities, setCities, weatherDetails, setWeatherDetails } = useCities();

  const updateSwiperState = (swiperInstance) => {
    setIsBeginning(swiperInstance.isBeginning);
    setIsEnd(swiperInstance.isEnd);
    setIsLocked(swiperInstance.isLocked);
  };

  const handleLike = (id) => {
    setCities((prevCities) =>
      prevCities.map((city) =>
        city.id === id ? { ...city, isLiked: !city.isLiked } : city,
      ),
    );
  };

  //   const addCity = (city) => {
  //     setCities(prevCities => ([...prevCities, {
  //         id: "asdasdasdasd",
  //         city: city
  //     }]))
  //   }

  const handleChangeVisibility = (id, visibleType) => {
    setWeatherDetails((prev) => ({
      cityId: id,

      visibleTypes:
        prev.cityId === id
          ? [...new Set([...prev.visibleTypes, visibleType])]
          : [visibleType],
    }));
  };

  const handleDeleteCity = (id) => {
    setCities((prevCities) => prevCities.filter((city) => city.id !== id));
    setWeatherDetails((prevDetails) => {
      if (prevDetails.cityId !== id) {
        return prevDetails;
      }

      return {
        // type: null,
        visibleTypes: [],
        cityId: null,
      };
    });
  };

  const handleRestoreCity = (cityToRestore) => {
    setCities((prevCities) => {
      const alreadyExists = prevCities.some((city) =>
        isSameCity(city, cityToRestore),
      );

      if (alreadyExists) {
        return prevCities;
      }

      return [...prevCities, cityToRestore];
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => swiper?.slidePrev()}
        className={cn(
          "absolute left-0 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:bg-brand hover:text-white active:scale-90 transition-all",
          isBeginning && "opacity-0 pointer-events-none",
        )}
      >
        <ChevronLeft />
      </button>

      <Swiper
        centerInsufficientSlides
        watchOverflow
        onSwiper={(swiperInstance) => {
          setSwiper(swiperInstance);
          updateSwiperState(swiperInstance);
        }}
        onSlideChange={updateSwiperState}
        onUpdate={updateSwiperState}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          674: {
            slidesPerView: 2,
          },
          1200: {
            slidesPerView: 3,
          },
        }}
      >
        {cities.map((city, index) => (
          <SwiperSlide key={city.id} className="w-full">
            <DaysItem
              key={city.id || index}
              city={city}
              onLike={handleLike}
              className="w-full mx-auto"
              onVisibleSection={handleChangeVisibility}
              onDeleteCity={handleDeleteCity}
              onRestoreCity={handleRestoreCity}
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        type="button"
        onClick={() => swiper?.slideNext()}
        className={cn(
          "absolute right-0 top-1/2 z-20 translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md cursor-pointer hover:bg-brand hover:text-white active:scale-90 transition-all",
          isEnd && "opacity-0 pointer-events-none",
        )}
      >
        <ChevronRight />
      </button>
    </div>
  );
};

export default DaysItems;
