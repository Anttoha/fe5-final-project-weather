import React from "react";
import Container from "../ui/Container";
import { useCities } from "../../shared/contexts/citiesContext";
import EightDay from "./EightDay";
import TitleSection from "../TitleSection";

const Eight = () => {
  const { cities, weatherDetails } = useCities();

  const city = cities.find((city) => city.id === weatherDetails.cityId);

  return (
    <section>
      <Container className="pb-12.5 site-xl:pb-20">
        <div className="w-full bg-[#E8E8E8] rounded-[15px] space-y-6.25 site-md:space-y-4.25 site-xl:space-y-5 pt-4.5 site-md:pt-5 site-xl:pt-6.5 px-6.25 site-md:px-8.75 site-xl:px-19 pb-8.75 site-xl:pb-10.5">
          <TitleSection className="ml-4.5 site-md:ml-2.5 site-xl:ml-auto">
            Weekly forecast
          </TitleSection>
          <ul className="flex justify-between flex-wrap site-md:flex-col gap-4.25 site-xl:gap-2.5">
            {city?.forecast?.eightDays?.map((item) => (
              <EightDay key={item.codeDate} city={item} />
            ))}
          </ul>
        </div>
      </Container>
    </section>
  );
};

export default Eight;
