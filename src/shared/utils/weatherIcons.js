const icons = {
  "clear sky": "#icon-sunny",
  "few clouds": "#icon-mostly-sunny",
  "scattered clouds": "#icon-partly-cloudy",
  "broken clouds": "#icon-mostly-cloudy",
  "overcast clouds": "#icon-cloudy",

  "light rain": "#icon-drizzle",
  "moderate rain": "#icon-showers",
  "heavy intensity rain": "#icon-showers",
  rain: "#icon-showers",

  drizzle: "#icon-drizzle",
  thunderstorm: "#icon-strong-tstorms",
  snow: "#icon-snow-showers",

  mist: "#icon-cloudy",
  fog: "#icon-cloudy",
  haze: "#icon-cloudy",
};

export const weatherIcon = (condition) => {
  const key = condition?.trim().toLowerCase();

  return icons[key] ?? null;
};