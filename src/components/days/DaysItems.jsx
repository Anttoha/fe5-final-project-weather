import React, { useState } from "react";
import DaysItem from "./DaysItem";
import { useCities } from "../../shared/contexts/citiesContext";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { isSameCity } from "../../shared/utils/isSameCity";
import SwiperNavigation from "../ui/SwiperNavigation";

const DaysItems = () => {
  const [swiper, setSwiper] = useState(null);

  const { cities, setCities, weatherDetails, setWeatherDetails } = useCities();

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
      <Swiper
        centerInsufficientSlides
        watchOverflow
        onSwiper={setSwiper}
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
        {cities.map((city) => (
          <SwiperSlide key={city.id} className="w-full">
            <DaysItem
              city={city}
              onLike={handleLike}
              className="mx-auto w-full"
              onVisibleSection={handleChangeVisibility}
              onDeleteCity={handleDeleteCity}
              onRestoreCity={handleRestoreCity}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <SwiperNavigation swiper={swiper} />
    </div>
  );
};

export default DaysItems;
