import React, { lazy, Suspense } from "react";
import Header from "./components/header/Header";
import Hero from "./components/hero/Hero";
import Days from "./components/days/Days";
import { useCities } from "./shared/contexts/citiesContext";
import Current from "./components/current/Current.jsx";
const Hourly = lazy(() => import("./components/hourly/Hourly.jsx"));
import { Toaster } from "sileo";
import { useMediaQuery } from "./shared/hooks/useMediaQuery.js";
import Eight from "./components/eight/Eight.jsx";
import Footer from "./components/footer/Footer.jsx";
import Nature from "./components/nature/Nature.jsx";
import Pets from "./components/pets/Pets.jsx";
import { AnimatePresence } from "motion/react";
import AnimatedSection from "./components/ui/AnimatedSection.jsx";

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
        {/* {weatherDetails.visibleTypes.includes("current") && <Current />}
        {weatherDetails.visibleTypes.includes("hourly") && <Hourly />}
        {weatherDetails.visibleTypes.includes("eight") && <Eight />} */}
        <AnimatePresence>
          {weatherDetails.visibleTypes.includes("current") && (
            <AnimatedSection
              key="current"
              type="current"
              activeType={weatherDetails.type}
              scrollRequest={weatherDetails.scrollRequest}
              waitForLayout={weatherDetails.waitForLayout}
            >
              <Current />
            </AnimatedSection>
          )}
          {weatherDetails.visibleTypes.includes("hourly") && (
            <AnimatedSection
              key="hourly"
              type="hourly"
              activeType={weatherDetails.type}
              scrollRequest={weatherDetails.scrollRequest}
              waitForLayout={weatherDetails.waitForLayout}
            >
              <Suspense
                fallback={
                  <div className="pb-20 text-center">
                    Loading hourly forecast...
                  </div>
                }
              >
                <Hourly />
              </Suspense>
            </AnimatedSection>
          )}
          {weatherDetails.visibleTypes.includes("eight") && (
            <AnimatedSection
              key="eight"
              type="eight"
              activeType={weatherDetails.type}
              scrollRequest={weatherDetails.scrollRequest}
              waitForLayout={weatherDetails.waitForLayout}
            >
              <Eight />
            </AnimatedSection>
          )}
        </AnimatePresence>
        <Pets />
        <Nature />
      </main>
      <Footer />
    </>
  );
};

export default App;
