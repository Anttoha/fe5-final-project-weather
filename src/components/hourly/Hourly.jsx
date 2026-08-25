import React from "react";
import HourlyTable from "./HourlyTable";
import Container from "../ui/Container";
import { useCities } from "../../shared/contexts/citiesContext";
import TitleSection from "../TitleSection";

const Hourly = () => {
  const { cities, weatherDetails } = useCities();

  console.log(cities);

  const city = cities.find((city) => city.id === weatherDetails.cityId);

  console.log("Hourly debug:", {
    cityId: weatherDetails.cityId,
    city,
    hourlyData: city?.forecast?.hourly,
  });

  return (
    <section className="pb-8.75 site-md:pb-12.5 site-xl:pb-20">
      <Container className="">
        <div className="bg-[#E8E8E8] rounded-[15px] pb-6 site-md:pb-6.5 site-xl:pb-10 px-6.25 site-md:px-8.75 site-xl:px-10.25 pt-4.5 site-md:pt-5 site-xl:pt-6.5 space-y-4 site-md:space-y-7 site-xl:space-y-5">
          <TitleSection className="ml-4.5 site-md:ml-1.75 site-xl:ml-9.25">Hourly forecast</TitleSection>
          <HourlyTable
            hourlyData={city?.forecast?.hourly}
            timezone={city?.timezone}
          />
        </div>
      </Container>
    </section>
  );
};

export default Hourly;
