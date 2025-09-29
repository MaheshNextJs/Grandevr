"use client";

import { useMemo } from "react";
import {
  ComposedChart,
  Area,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { occupancy as data } from "@/app/admin/dashboard/data/mock";

function formatPct(v: number) {
  return `${v}%`;
}

export default function OccupancyTrends() {
  // derive stats
  const stats = useMemo(() => {
    if (!data?.length) return null;
    const current = data[data.length - 1];
    let hi = data[0];
    let lo = data[0];
    for (const d of data) {
      if (d.occupancy > hi.occupancy) hi = d;
      if (d.occupancy < lo.occupancy) lo = d;
    }
    return { current, hi, lo };
  }, []);

  return (
    <div className="space-y-4">
      {/* Header row */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Occupancy Trends</h3>

        <div className="flex items-center gap-3">
          {/* legend */}
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <span
              className="inline-block h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: "#2979F2" }}
            />
            Actual Occupancy
          </div>

          {/* period pill (static for now) */}
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
            Daily
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
      </div>

      {/* Chart */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={data}
            margin={{ left: 12, right: 12, top: 8, bottom: 8 }}
          >
            <defs>
              <linearGradient id="occFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#A57865" stopOpacity={0.18} />
                <stop offset="100%" stopColor="#A57865" stopOpacity={0.06} />
              </linearGradient>
            </defs>

            <CartesianGrid stroke="#eee" vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 12 }}
              domain={[0, 100]}
              ticks={[0, 25, 50, 75, 100]}
              tickFormatter={formatPct}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip
              formatter={(v: any) => formatPct(Number(v))}
              labelStyle={{ color: "#6B7280" }}
              contentStyle={{ borderRadius: 8, borderColor: "#E5E7EB" }}
            />

            {/* soft area */}
            <Area
              type="linear"
              dataKey="occupancy"
              stroke="none"
              fill="url(#occFill)"
            />
            {/* line on top */}
            <Line
              type="linear"
              dataKey="occupancy"
              stroke="#A57865"
              strokeWidth={1}
              dot={false}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Bottom summary tiles */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-rose-100 bg-rose-50/60 px-6 py-3">
            <div className="text-xs text-neutral-500">Occupancy</div>
            <div className="text-xl text-[#A57865] font-semibold">
              {formatPct(stats.current.occupancy)}
            </div>
            <div className="text-xs text-neutral-400">Today</div>
          </div>

          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 px-6 py-3">
            <div className="text-xs text-neutral-500">Highest Occupancy</div>
            <div className="text-xl font-semibold text-emerald-600">
              {formatPct(stats.hi.occupancy)}
            </div>
            <div className="text-xs text-neutral-400">{stats.hi.date}</div>
          </div>

          <div className="rounded-xl border border-amber-100 bg-amber-50/60 px-6 py-3">
            <div className="text-xs text-neutral-500">Lowest Occupancy</div>
            <div className="text-xl font-semibold text-amber-600">
              {formatPct(stats.lo.occupancy)}
            </div>
            <div className="text-xs text-neutral-400">{stats.lo.date}</div>
          </div>
        </div>
      )}
    </div>
  );
}
