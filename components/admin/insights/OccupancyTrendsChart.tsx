"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  { date: "Sept 1", cancellations: 20, upsells: 35, repeats: 48 },
  { date: "Sept 3", cancellations: 30, upsells: 44, repeats: 58 },
  { date: "Sept 5", cancellations: 25, upsells: 40, repeats: 54 },
  { date: "Sept 7", cancellations: 58, upsells: 72, repeats: 86 },
  { date: "Sept 10", cancellations: 38, upsells: 54, repeats: 67 },
  { date: "Sept 13", cancellations: 33, upsells: 49, repeats: 63 },
  { date: "Sept 16", cancellations: 36, upsells: 52, repeats: 66 },
  { date: "Sept 19", cancellations: 25, upsells: 39, repeats: 53 },
  { date: "Sept 21", cancellations: 66, upsells: 82, repeats: 96 },
  { date: "Sept 26", cancellations: 52, upsells: 66, repeats: 80 },
  { date: "Sept 28", cancellations: 46, upsells: 62, repeats: 75 },
];

const COLORS = {
  cancellations: "#D6A83C", // gold
  upsells: "#2E2E2E", // deep gray/black
  repeats: "#2BA69A", // teal
};

export default function OccupancyTrendsChart() {
  return (
    <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6">
      <h3 className="mb-0.5 text-[15px] font-semibold text-gray-800">
        Occupancy Trends
      </h3>
      <p className="mb-4 text-[13px] text-gray-500">
        Last 30 days performance metrics
      </p>

      <div className="h-[420px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 18, left: 6, bottom: 8 }}
          >
            <CartesianGrid
              stroke="#E5E7EB"
              strokeDasharray="3 3"
              vertical={false}
            />

            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              interval="preserveStartEnd"
            />

            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              label={{
                value: "Percentage",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#6B7280", fontSize: 12 },
              }}
            />

            <Tooltip
              formatter={(v: any) => `${v}%`}
              contentStyle={{
                borderRadius: 8,
                borderColor: "#E5E7EB",
                fontSize: 12,
              }}
            />

            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              iconSize={4}
              wrapperStyle={{ top: -60, right: 0 }}
              formatter={(value) => {
                const label =
                  value === "cancellations"
                    ? "Cancellations"
                    : value === "upsells"
                    ? "Upsell Conversions"
                    : value === "repeats"
                    ? "Repeat Guests"
                    : value;

                return (
                  <span
                    style={{
                      fontSize: 12,
                      color: "#4B5563",
                    }}
                  >
                    {label}
                  </span>
                ); // text-sm, gray-600
              }}
            />

            <Line
              type="linear"
              dataKey="cancellations"
              stroke={COLORS.cancellations}
              strokeWidth={1}
              dot={{ r: 0 }}
              activeDot={{ r: 3 }}
            />
            <Line
              type="linear"
              dataKey="upsells"
              stroke={COLORS.upsells}
              strokeWidth={1}
              dot={{ r: 0 }}
              activeDot={{ r: 3 }}
            />
            <Line
              type="linear"
              dataKey="repeats"
              stroke={COLORS.repeats}
              strokeWidth={1}
              dot={{ r: 0 }}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
