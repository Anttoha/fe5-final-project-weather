import React, { useEffect, useRef } from "react";
import { motion } from "motion/react";

const LAYOUT_ANIMATION_TIME = 400;

const AnimatedSection = ({
  children,
  type,
  activeType,
  scrollRequest,
  waitForLayout,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (!scrollRequest) return;
    if (activeType !== type) return;

    const scrollToSection = () => {
      sectionRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    };

    if (waitForLayout) {
      const timeoutId = window.setTimeout(
        scrollToSection,
        LAYOUT_ANIMATION_TIME,
      );

      return () => window.clearTimeout(timeoutId);
    }

    const frameId = requestAnimationFrame(scrollToSection);

    return () => cancelAnimationFrame(frameId);
  }, [
    activeType,
    type,
    scrollRequest,
    waitForLayout,
  ]);

  return (
    <motion.section
      ref={sectionRef}
      className="scroll-mt-20"
      initial={{
        opacity: 0,
        y: 30,
        scale: 0.98,
        "--gradient-alpha": 0,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,

        "--gradient-alpha": [0, 0.35, 0],
      }}
      style={{
        backgroundImage:
          "linear-gradient(to bottom, rgba(255, 179, 108, 0) 5%, rgba(255, 179, 108, var(--gradient-alpha)) 50%, rgba(255, 179, 108, 0) 95%)",
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.98,
      }}
      transition={{
        opacity: {
          duration: 0.35,
        },

        y: {
          duration: 0.35,
        },

        scale: {
          duration: 0.35,
        },

        "--gradient-alpha": {
          duration: 1.5,
          delay: 0.25,
          times: [0, 0.25, 1],
        },
      }}
    >
      {children}
    </motion.section>
  );
};

export default AnimatedSection;