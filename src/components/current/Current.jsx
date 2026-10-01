import React from "react";
import Container from "../ui/Container";
import { useCities } from "../../shared/contexts/citiesContext";
import { weatherIcon } from "../../shared/utils/weatherIcons";

const Current = () => {
  const { cities, weatherDetails } = useCities();

  const city = cities.find((city) => city.id === weatherDetails.cityId);

  return (
    <section className="pb-20">
      <Container>
        <ul className="bg-panel rounded-[15px] py-8.75 px-4 site-md:p-7.5 site-xl:py-10 site-md:px-19.25 grid justify-items-center grid-cols-1 site-md:grid-cols-3 gap-y-8.75 site-md:gap-y-7.5 site-md:gap-x-5.5 site-xl:gap-y-10 site-xl:gap-x-14.5">
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center w-full max-w-[207px] site-md:max-w-full">
            <p className="text-[10px] site-md:text-[12px] site-xl:text-[16px] font-medium">
              Feels like
            </p>
            <h3 className="mt-2 mb-4.5 site-md:mb-9.25 site-xl:mb-5.75 site-xl:mt-2.5 text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
              {city?.info?.feelsLike ?? ""} ℃
            </h3>
            <img
              src={weatherIcon(city?.description)}
              alt={city?.description}
              className="w-15 h-15"
            />
          </li>
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center gap-5.5 site-md:gap-7.25 site-xl:gap-4.75 w-full max-w-[207px] site-md:max-w-full text-center leading-[1.2]">
            <div className="space-y-2 site-xl:space-y-2.5">
              <p className="text-[10px] site-md:text-[12px] site-xl:text-[16px] font-medium">
                Min ℃
              </p>
              <h3 className="text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
                {city?.info?.tempMin ?? ""} ℃
              </h3>
            </div>
            <div className="space-y-2 site-xl:space-y-2.5">
              <p className="text-[10px] site-md:text-[12px] site-xl:text-[16px] font-medium">
                Max ℃
              </p>
              <h3 className="text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
                {city?.info?.tempMax ?? ""} ℃
              </h3>
            </div>
          </li>
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center w-full max-w-[207px] site-md:max-w-full">
            <p className="text-[10px] site-md:text-[12px] font-medium">
              Humidity
            </p>
            <h3 className="mt-2 mb-4.5 site-md:mb-9.25 site-xl:mb-5.75 site-xl:mt-2.5 text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
              {city?.info?.humidity ?? ""}%
            </h3>
            <img src="#" alt="Humiduty" className="w-15 h-15" />
          </li>
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center w-full max-w-[207px] site-md:max-w-full">
            <p className="text-[10px] site-md:text-[12px] font-medium">
              Pressure
            </p>
            <h3 className="mt-2 mb-4.5 site-md:mb-9.25 site-xl:mb-5.75 site-xl:mt-2.5 text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
              {city?.info?.pressure ?? ""} hPa
            </h3>
            <img src="#" alt="Pressure" className="w-15 h-15" />
          </li>
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center w-full max-w-[207px] site-md:max-w-full">
            <p className="text-[10px] site-md:text-[12px] font-medium">
              Wind speed
            </p>
            <h3 className="mt-2 mb-4.5 site-md:mb-9.25 site-xl:mb-5.75 site-xl:mt-2.5 text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
              {city?.info?.speed ?? ""} m/s
            </h3>
            <img src="#" alt="Wind speed" className="w-15 h-15" />
          </li>
          <li className="bg-box rounded-[10px] pt-3.75 site-md:pt-5 h-40 site-md:h-50 site-xl:h-54.25 flex flex-col items-center w-full max-w-[207px] site-md:max-w-full">
            <p className="text-[10px] site-md:text-[12px] font-medium">
              Visibility
            </p>
            <h3 className="mt-2 mb-4.5 site-md:mb-9.25 site-xl:mb-5.75 site-xl:mt-2.5 text-[14px] site-md:text-[16px] site-xl:text-[32px] font-medium">
              {city?.info?.visibility ?? ""}
            </h3>
            <img src="#" alt="Visibility" className="w-15 h-15" />
          </li>
        </ul>
      </Container>
    </section>
  );
};

export default Current;
