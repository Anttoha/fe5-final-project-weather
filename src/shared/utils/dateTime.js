export const formatTime = (dt, timezone) => {
  const date = new Date((dt + timezone) * 1000);

  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

export const formatDate = (dt, timezone) => {
  const date = new Date((dt + timezone) * 1000);

  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}.${month}.${year}`;
};

export const formatWeekday = (dt, timezone) => {
  const date = new Date((dt + timezone) * 1000);

  return date.toLocaleDateString("en-US", {
    weekday: "long",
    timeZone: "UTC",
  });
};

export const formatHour = (dt) => {
  return new Date(dt * 1000).toLocaleTimeString("en-US", {
    hour: "numeric",
  });
};

export const formatDay = (dt) => {
  return new Date(dt * 1000).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
};

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export const formatHourlyLabel = (dt, timezone, prevDt) => {
  const date = new Date((dt + timezone) * 1000);

  const hours24 = date.getUTCHours();
  const hours12 = hours24 % 12 === 0 ? 12 : hours24 % 12;
  const ampm = hours24 < 12 ? "am" : "pm";
  const time = `${hours12} ${ampm}`;

  const prevDate =
    prevDt != null ? new Date((prevDt + timezone) * 1000) : null;
  const isNewDay = !prevDate || prevDate.getUTCDate() !== date.getUTCDate();

  const dateLabel = isNewDay
    ? `${MONTH_NAMES[date.getUTCMonth()]} ${date.getUTCDate()}`
    : null;

  return { time, date: dateLabel };
};

export const getHeroDate = () => {
  const now = new Date();

  return {
    monthYear: now.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    }),

    weekday: now.toLocaleDateString("en-US", {
      weekday: "long",
    }),

    day: now.getDate(),
  };
};