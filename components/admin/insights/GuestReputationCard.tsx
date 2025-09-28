"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { useState } from "react";

const chartData = [
  { category: "Service", value: 55, color: "#DC2626" }, // red
  { category: "Cleanliness", value: 80, color: "#2BA69A" }, // teal
  { category: "Cleanliness", value: 65, color: "#DC2626" }, // red again (intentional?)
];

export default function GuestReputationCard() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Title */}
      <h3 className="mb-4 text-[15px] font-semibold text-gray-800">
        Guest Reputation
      </h3>

      {/* Chart */}
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 12, left: 8, bottom: 16 }}
            barSize={40}
          >
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="category"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={false}
              label={{
                value: "Percentage",
                angle: -90,
                position: "insideLeft",
                offset: 10,
                style: { fill: "#6B7280", fontSize: 12 },
              }}
            />
            <Tooltip formatter={(v: any) => `${v}%`} />
            <Bar
              dataKey="value"
              radius={[4, 4, 0, 0]}
              fill="#8884d8"
              isAnimationActive={false}
              activeBar={false}
            >
              {
                // Set individual bar colors from data
                chartData.map((entry, index) => (
                  <Cell key={`bar-${index}`} fill={entry.color} />
                ))
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer Buttons */}
    </div>
  );
}
