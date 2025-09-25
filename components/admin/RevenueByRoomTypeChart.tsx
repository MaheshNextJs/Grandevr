"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { revenueByRoomType } from "@/app/admin/dashboard/data/mock";

const BAR_COLOR = "#3AA89E"; // teal like the mock

export default function RevenueByRoomTypeChart() {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">Revenue by Room Type</h3>

      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={revenueByRoomType}
            margin={{ left: 12, right: 12, top: 8, bottom: 8 }}
          >
            <CartesianGrid stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="name"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              tickFormatter={(v) => `${Math.round(Number(v) / 1000)}k`}
            />
            <Tooltip
              formatter={(v: number) => [
                `₹ ${v.toLocaleString("en-IN")}`,
                "Revenue",
              ]}
              labelStyle={{ color: "#6B7280" }}
              contentStyle={{ borderRadius: 8, borderColor: "#E5E7EB" }}
            />
            <Bar
              dataKey="value"
              barSize={35}
              fill={BAR_COLOR}
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Single-item legend like the mock */}
      <div className="mt-3 text-xs text-neutral-600">
        <span className="inline-flex items-center gap-2">
          <span
            className="inline-block h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: BAR_COLOR }}
          />
          Revenue
        </span>
      </div>
    </div>
  );
}
