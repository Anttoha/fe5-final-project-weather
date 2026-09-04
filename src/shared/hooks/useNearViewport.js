import { useEffect, useRef, useState } from "react";

export const useNearViewport = (rootMargin = "300px") => {
  const ref = useRef(null);
  const [isNearViewport, setIsNearViewport] = useState(false);

  useEffect(() => {
    if (isNearViewport) return;

    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        setIsNearViewport(true);
        observer.disconnect();
      },
      {
        rootMargin,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isNearViewport, rootMargin]);

  return [ref, isNearViewport];
};