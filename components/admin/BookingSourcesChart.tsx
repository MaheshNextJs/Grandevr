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
import { bookingSources } from "@/app/admin/dashboard/data/mock";

const COLORS: Record<string, string> = {
  "Direct Website": "#A57865", // brown
  OTAs: "#3AA89E", // teal
  "Corporate Contracts": "#2E3E3E", // dark gray/green
  "Walk-ins": "#D6BF69", // mustard
};

export default function BookingSourcesChart() {
  return (
    <div>
      {/* Header row */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Booking Sources</h3>

        {/* Static period pill (calendar icon can be swapped later) */}
        <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
          <svg
            viewBox="0 0 20 20"
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
          >
            <path d="M5 2v3M15 2v3M3 8h14M4 18h12a1 1 0 001-1V6H3v11a1 1 0 001 1z" />
          </svg>
          This Month
          <svg
            viewBox="0 0 20 20"
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M6 8l4 4 4-4" />
          </svg>
        </button>
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={bookingSources}
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
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={(v) => `${v}%`}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip
              formatter={(v: number, _k, item) => [
                `${v}%`,
                item?.payload?.name,
              ]}
              labelStyle={{ color: "#6B7280" }}
              contentStyle={{ borderRadius: 8, borderColor: "#E5E7EB" }}
            />
            <Bar dataKey="value" barSize={35} radius={[4, 4, 0, 0]}>
              {bookingSources.map((d) => (
                <Cell key={d.name} fill={COLORS[d.name] ?? "#A3A3A3"} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend (order to match screenshot) */}
      <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-neutral-600">
        {[
          { name: "Walk-ins", color: COLORS["Walk-ins"] },
          { name: "Corporate Contracts", color: COLORS["Corporate Contracts"] },
          { name: "OTAs", color: COLORS["OTAs"] },
          { name: "Direct Website", color: COLORS["Direct Website"] },
        ].map((l) => (
          <span key={l.name} className="inline-flex items-center gap-2">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: l.color }}
            />
            {l.name}
          </span>
        ))}
      </div>
    </div>
  );
}
