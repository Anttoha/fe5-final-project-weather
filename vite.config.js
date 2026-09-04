// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { webfontDl } from "vite-plugin-webfont-dl";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    webfontDl([
      "https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600&family=Montserrat+Alternates:wght@400;500&display=swap",
    ]),
  ],
});
