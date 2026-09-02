import { createContext, useContext } from "react";

export const CitiesContext = createContext();

export const useCities = () => {
  const context = useContext(CitiesContext);

  if (!context) {
    throw new Error("useCities must be used inside CitiesProvider");
  }

  return context;
};
