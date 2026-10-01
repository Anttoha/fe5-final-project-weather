import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CitiesProvider from "./components/CitiesProvider.jsx";
import ModalProvider from "./components/ModalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <CitiesProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </CitiesProvider>,
);
