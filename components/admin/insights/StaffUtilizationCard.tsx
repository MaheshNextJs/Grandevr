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
import { useState } from "react";
import Image from "next/image";

type Props = {
  onViewSchedule?: () => void;
  onReassign?: () => void;
};

const COLORS = {
  understaffed: "#B25E49", // warm red-brown
  predicted: "#6CB28E", // soft green
  actual: "#2BA69A", // teal
};

const data = [
  { date: "Sept 1", understaffed: 20, predicted: 48, actual: 48 },
  { date: "Sept 7", understaffed: 38, predicted: 10, actual: 35 },
  { date: "Sept 14", understaffed: 22, predicted: 26, actual: 46 },
  { date: "Sept 21", understaffed: 8, predicted: 38, actual: 28 },
  { date: "Sept 28", understaffed: 36, predicted: 28, actual: 28 },
];

export default function StaffUtilizationCard({
  onViewSchedule,
  onReassign,
}: Props) {
  const [range, setRange] = useState("Last 7 Days");
  const [dept, setDept] = useState("Department");

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      {/* Header row */}
      <div className="flex items-center justify-between px-6 pt-5">
        <h3 className="text-[15px] font-semibold text-gray-800">
          Staff Utilization
        </h3>

        <div className="flex items-center gap-2">
          {/* Legend (custom, compact, matches screenshot dots) */}
          <div className="hidden sm:flex items-center gap-4 text-[12px] text-gray-600 mr-2">
            <LegendDot color={COLORS.understaffed} label="Understaffed Gap" />
            <LegendDot
              color={COLORS.predicted}
              label="Predicted Guest Demand"
            />
            <LegendDot color={COLORS.actual} label="Actual Occupancy" />
          </div>

          {/* Range button */}
          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              onClick={() => {}}
            >
              <CalendarIcon />
              {range}
              <ChevronDown />
            </button>
          </div>

          {/* Department button */}
          <div className="relative">
            <button
              className="inline-flex items-center gap-2 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              onClick={() => {}}
            >
              {dept}
              <ChevronDown />
            </button>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-[320px] w-full px-2 pb-4 pt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 20, left: 8, bottom: 0 }}
          >
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
              interval="preserveStartEnd"
            />
            <YAxis
              domain={[0, 55]}
              ticks={[0, 10, 20, 30, 40, 50]}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              axisLine={{ stroke: "#E5E7EB" }}
              tickLine={{ stroke: "#E5E7EB" }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 8,
                borderColor: "#E5E7EB",
                fontSize: 12,
              }}
            />
            {/* extra legend hidden since we render a custom one in header */}
            <Legend
              verticalAlign="top"
              align="right"
              wrapperStyle={{ display: "none" }}
            />

            {/* Sharp lines, thinner width, tiny dots */}
            <Line
              type="linear"
              dataKey="understaffed"
              name="Understaffed Gap"
              stroke={COLORS.understaffed}
              strokeWidth={1.25}
              dot={{
                r: 2,
                stroke: COLORS.understaffed,
                fill: "#fff",
                strokeWidth: 1,
              }}
              activeDot={{ r: 3 }}
            />
            {/* <Line
              type="linear"
              dataKey="predicted"
              name="Predicted Guest Demand"
              stroke={COLORS.predicted}
              strokeWidth={1.25}
              dot={{
                r: 2,
                stroke: COLORS.predicted,
                fill: "#fff",
                strokeWidth: 1,
              }}
              activeDot={{ r: 3 }}
            /> */}
            <Line
              type="linear"
              dataKey="actual"
              name="Actual Occupancy"
              stroke={COLORS.actual}
              strokeWidth={1.25}
              dot={{
                r: 2,
                stroke: COLORS.actual,
                fill: "#fff",
                strokeWidth: 1,
              }}
              activeDot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* AI Suggestion panel */}
      <div className="mx-4 mb-4 rounded-md border border-[#E7D8D1] bg-[#F6EEEA]">
        <div className="flex items-start gap-2 px-4 py-3">
          <Image
            src="/icons/admin/critical.png"
            alt="AI Suggestion"
            width={16}
            height={16}
            className="mt-0.5"
          />
          <div className="flex-1">
            <div className="text-[13px] font-medium text-gray-800">
              AI Suggestion
            </div>
            <p className="mt-1 text-[13px] text-gray-700">
              Add 2 evening staff on Sept 23 and Sept 26.
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              <button
                onClick={onViewSchedule}
                className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
              >
                View Staff Schedule
              </button>
              <button
                onClick={onReassign}
                className="rounded-md bg-[#A57865] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
              >
                Reassign Shifts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ——— Small presentational bits ——— */

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2">
      <span
        className="inline-block h-2 w-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span className="text-[12px] text-gray-600">{label}</span>
    </span>
  );
}

function CalendarIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

function ChevronDown() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-3.5 w-3.5 text-gray-600"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function Sparkle() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="mt-0.5 h-4 w-4 text-[#A57865]"
      fill="currentColor"
    >
      <path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z" />
    </svg>
  );
}
