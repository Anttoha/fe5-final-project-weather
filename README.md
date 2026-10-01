# Weather Dashboard

A weather app built with React. Search for cities, save your favourites and see the current weather, a chart of how the weather changes and a daily forecast.

**Live demo:** https://fe5-final-project-weather.vercel.app/

<!-- Screenshot: in the GitHub editor, drag a screenshot of the site onto the empty line below this comment -->


## Features

- **City search** with the OpenWeatherMap Geocoding API; saved cities stay after a page reload (localStorage)
- **Weather cards** for several cities at once: local time, temperature, weather icon and buttons to add a city to favourites and manage the card
- **Detailed data** for the selected city: feels like, min / max temperature, humidity, pressure, wind speed and visibility
- **Interactive chart** of how the weather changes over time (Recharts)
- **Daily forecast**: date, weather icon, temperature and description
- **News cards** (NewsAPI) with a "See more" button
- **Photo gallery** (Pixabay API) with a slider and a full-size view
- Responsive layout for mobile, tablet and desktop, animations and toast notifications

## Tech stack

React 19 · Vite · Tailwind CSS 4 · Context API · Axios · Recharts · Swiper · Motion · ESLint

APIs: OpenWeatherMap (current weather, forecast, geocoding) · NewsAPI · Pixabay

## Run locally

```bash
git clone https://github.com/Antoha2012pro/fe5-final-project-weather.git
cd fe5-final-project-weather
npm install
cp .env.example .env
npm run dev
```

Put your own free API keys from [openweathermap.org](https://openweathermap.org/), [newsapi.org](https://newsapi.org/) and [pixabay.com](https://pixabay.com/api/docs/) into `.env`.

## Known limitations

- The free NewsAPI plan only allows requests from `localhost`, so the news section may not load on the live demo.
- API keys in `VITE_` variables end up in the browser bundle. A small server-side proxy would be needed to hide them completely.

## About this project

Final project of the Front-End course at GoITeens (module 5). The design was provided by the course as a Figma mockup, and I built it as a responsive React app. I wrote most of the code myself and used AI as a helper for some parts (for example, the hourly chart section).

## Kurz auf Deutsch

Wetter-Dashboard mit React und Vite: Städtesuche, gespeicherte Lieblingsstädte, aktuelles Wetter, ein Diagramm zum Wetterverlauf und eine Tagesvorhersage. Abschlussprojekt meines Front-End-Kurses bei GoITeens. Das Design stammt aus einer Figma-Vorlage des Kurses; den Code habe ich größtenteils selbst geschrieben und bei einigen Teilen KI als Hilfe genutzt.
