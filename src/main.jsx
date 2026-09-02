import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import smoothCornersPaint from "smooth-corners/lib/paint.js?url";
import "./index.css";
import App from "./App.jsx";
import CitiesProvider from "./components/CitiesProvider.jsx";
import ModalProvider from "./components/ModalProvider.jsx";

if ("paintWorklet" in CSS) {
  CSS.paintWorklet.addModule(smoothCornersPaint);
}

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <CitiesProvider>
    <ModalProvider>
      <App />
    </ModalProvider>
  </CitiesProvider>,
  // </StrictMode>,
);
