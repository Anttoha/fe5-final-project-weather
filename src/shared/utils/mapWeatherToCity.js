import { formatDate, formatTime, formatWeekday } from "./dateTime.js";

export const mapWeatherToCity = (city, data, forecast = undefined) => ({
  ...city,
  timezone: data.timezone,
  time: formatTime(data.dt, data.timezone),
  date: {
    date: formatDate(data.dt, data.timezone),
    day: formatWeekday(data.dt, data.timezone),
  },
  img: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
  description: data.weather[0].description,
  temperature: {
    celsius: Math.round(data.main.temp),
    fahrenheit: Math.round(data.main.temp * 1.8 + 32),
  },
  info: {
    feelsLike: data.main.feels_like ?? "",
    tempMin: data.main.temp_min ?? "",
    tempMax: data.main.temp_max ?? "",
    humidity: data.main.humidity ?? "",
    pressure: data.main.pressure ?? "",
    speed: data.wind.speed ?? "",
    visibility: data.visibility ?? "",
  },
  updatedAt: Date.now(),
  forecast: {
    hourly: (forecast?.list ?? []).slice(0, 5),
    eightDays: Object.values(
      (forecast?.list ?? []).reduce((acc, item) => {
        const dateStr = item.dt_txt.split(" ")[0];
        if (!acc[dateStr]) {
          acc[dateStr] = {
            dt: item.dt,
            temps: [],
            weather: item.weather[0],
          };
        }
        acc[dateStr].temps.push(item.main.temp_max, item.main.temp_min);
        return acc;
      }, {}),
    ).map((day) => {
      const dateObj = new Date(day.dt * 1000);
      return {
        tempMin: Math.round(Math.min(...day.temps)),
        tempMax: Math.round(Math.max(...day.temps)),
        description: day.weather.description,
        day: dateObj.toLocaleDateString("en-US", { weekday: "short" }), 
        date: dateObj.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        codeDate: day.dt, 
      };
    }),
  },
});
