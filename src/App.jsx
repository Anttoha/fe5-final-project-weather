import React from "react";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Days from "./components/days/Days";
import { useCities } from "./shared/contexts/citiesContext";
import Current from "./components/current/Current.jsx";
import Hourly from "./components/hourly/Hourly.jsx";
import { Toaster } from "sileo";
import { useMediaQuery } from "./shared/hooks/useMediaQuery.js";

const App = () => {
  const { weatherDetails } = useCities();
const isMobile = useMediaQuery("(max-width: 767px)");

  return (
    <>
      <Toaster
      position={isMobile ? "top-center" : "bottom-right"}
        theme="dark"
        offset={{ bottom: 32 }}
        options={{
          fill: "#171717",
          styles: {
            title: "text-white!",
            description: "text-white/75!",
            badge: "bg-white/10!",
            button: "bg-white/10! hover:bg-white/15!",
          },
        }}
      />
      <Header />
      <main>
        <Hero />
        <Days />
        {weatherDetails.visibleTypes.includes("current") && <Current />}
        {weatherDetails.visibleTypes.includes("hourly") && <Hourly />}
        {/* <Hourly /> */}
      </main>
    </>
  );
};

export default App;
