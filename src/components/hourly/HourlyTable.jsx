import React, { useId, useMemo } from "react";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import { formatHourlyLabel } from "../../shared/utils/dateTime";

export default function HourlyTable({ hourlyData = [], timezone = 0 }) {
  const gradientId = `temp-fill-${useId().replaceAll(":", "")}`;

  const { data, labelsByDt, yMin, yMax, ticks } = useMemo(() => {
    const safeTimezone = Number.isFinite(Number(timezone))
      ? Number(timezone)
      : 0;

    const source = Array.isArray(hourlyData) ? hourlyData : [];

    // Убираем битые точки API.
    const validItems = source.filter((item) => {
      const dt = Number(item?.dt);
      const temp = Number(item?.main?.temp);

      return Number.isFinite(dt) && Number.isFinite(temp);
    });

    const preparedData = validItems.map((item, index) => {
      const dt = Number(item.dt);
      const temp = Number(item.main.temp);

      const previousDt = index > 0 ? Number(validItems[index - 1].dt) : null;

      const label = formatHourlyLabel(dt, safeTimezone, previousDt);

      return {
        dt,
        temp: Math.round(temp * 10) / 10,
        timeLabel: String(label?.time ?? ""),
        dateLabel: label?.date ? String(label.date) : null,
      };
    });

    const labels = new Map(
      preparedData.map((item) => [
        item.dt,
        {
          timeLabel: item.timeLabel,
          dateLabel: item.dateLabel,
        },
      ]),
    );

    if (!preparedData.length) {
      return {
        data: [],
        labelsByDt: labels,
        yMin: 0,
        yMax: 5,
        ticks: [0, 5],
      };
    }

    const temperatures = preparedData.map((item) => item.temp);

    const minTemp = Math.min(...temperatures);
    const maxTemp = Math.max(...temperatures);

    let min = Math.floor((minTemp - 2) / 5) * 5;

    let max = Math.ceil((maxTemp + 2) / 5) * 5;

    if (min === max) {
      min -= 5;
      max += 5;
    }

    const yTicks = [];

    for (let value = min; value <= max; value += 5) {
      yTicks.push(value);
    }

    return {
      data: preparedData,
      labelsByDt: labels,
      yMin: min,
      yMax: max,
      ticks: yTicks,
    };
  }, [hourlyData, timezone]);

  const renderXAxisTick = ({ x, y, payload }) => {
    const label = labelsByDt.get(Number(payload?.value));

    y -= 30

    if (!label) return null;

    return (
      <g transform={`translate(${x}, ${y})`} >
        <text
          x={0}
          y={0}
          dy={12}
          textAnchor="middle"
          fill="#6b6b6b"
          fontSize={11}
        >
          {label.timeLabel}
        </text>

        {label.dateLabel && (
          <text
            x={0}
            y={0}
            dy={27}
            textAnchor="middle"
            fill="#6b6b6b"
            fontSize={11}
          >
            {label.dateLabel}
          </text>
        )}
      </g>
    );
  };

  if (!data.length) {
    return (
      <div
        className="flex h-[340px] w-full items-center justify-center"
        style={{ background: "#e6e6e6" }}
      >
        No hourly weather data
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        height: 340,
        minWidth: 0,
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 15,
            right: 5,
            left: 0,
            bottom: 15,
          }}
        >
          <CartesianGrid
            strokeWidth={1}
            horizontalValues={ticks.slice(1, -1)}
            verticalValues={data.slice(1, -1).map((item) => item.dt)}
          />

          <XAxis
            dataKey="dt"
            orientation="top"
            type="category"
            axisLine={false}
            tickLine={false}
            tick={renderXAxisTick}
            interval={0}
            height={48}
          />

          <YAxis
            orientation="left"
            axisLine={false}
            tickLine={false}
            width={48}
            domain={[yMin, yMax]}
            ticks={ticks}
            tick={{
              fill: "#6b6b6b",
              fontSize: 11,
            }}
            tickFormatter={(value) => `${value}°C`}
          />

          <Area
            type="monotone"
            dataKey="temp"
            stroke="#ff9d42"
            strokeWidth={2}
            fill="transparent"
            dot={false}
            activeDot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
