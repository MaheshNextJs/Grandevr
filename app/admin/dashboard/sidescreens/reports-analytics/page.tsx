"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
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

type Range = { start: string; end: string };

export default function Page() {
  // ---- Filters / Report Builder state ----
  const [datePreset, setDatePreset] = useState("last-30");
  const [reportType, setReportType] = useState("occupancy");
  const [format, setFormat] = useState("all");
  const [exportAs, setExportAs] = useState("pdf");

  const [range] = useState<Range>({
    start: "2025-09-01",
    end: "2025-09-28",
  });

  const rangePretty = useMemo(() => {
    const fmt = (d: string) =>
      new Date(d).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
      });
    return `${fmt(range.start)} to ${fmt(range.end)}`;
  }, [range]);

  const handleGenerate = () => {
    // wire up to your API later
    console.log("Generate report:", {
      datePreset,
      reportType,
      format,
      exportAs,
    });
  };

  // ---- KPI tiles (mock) ----
  const KPIS = [
    { label: "Occupancy rate", value: "82%", sub: "12% ▲ vs last week" },
    { label: "Avg Length of Stay", value: "2.3 nights", sub: "" },
    { label: "Total Room Nights Sold", value: "2.3 nights", sub: "" },
    { label: "Top Room Nights Source", value: "OTA (45%)", sub: "" },
  ];

  // ---- Chart data (mock) ----
  const chartData = [
    { date: "Sept 1", occ: 72, below90: 90 },
    { date: "Sept 5", occ: 58, below90: 90 },
    { date: "Sept 9", occ: 28, below90: 90 },
    { date: "Sept 13", occ: 62, below90: 90 },
    { date: "Sept 17", occ: 75, below90: 90 },
    { date: "Sept 21", occ: 60, below90: 90 },
    { date: "Sept 25", occ: 60, below90: 90 },
  ];

  const tableRows = [
    { room: "Standard", occ: "120%", occupancy: 1200, revenueShare: "15%" },
    { room: "Deluxe", occ: "80%", occupancy: 800, revenueShare: "10%" },
    { room: "Suite", occ: "40%", occupancy: 500, revenueShare: "3%" },
  ];

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-gray-500">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700">Reports & Analytics</span>
      </nav>

      <h1 className="text-2xl font-semibold text-gray-900">
        Reports & Analytics
      </h1>

      {/* Report Builder */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Date Range */}
          <Field label="Date Range">
            <div className="relative max-w-xs">
              <select
                value={datePreset}
                onChange={(e) => setDatePreset(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
              >
                <option value="last-7">Last 7 Days</option>
                <option value="last-30">Last 30 Days</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="custom">Custom</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </Field>

          {/* Report Type */}
          <Field label="Report Type">
            <div className="relative max-w-xs">
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
              >
                <option value="occupancy">Occupancy</option>
                <option value="revenue">Revenue</option>
                <option value="guest-experience">Guest Experience</option>
                <option value="staff">Staff Utilization</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </Field>

          {/* Format */}
          <Field label="Format">
            <div className="relative max-w-xs">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
              >
                <option value="all">All</option>
                <option value="summary">Summary</option>
                <option value="detailed">Detailed</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </Field>

          {/* Export As */}
          <Field label="Export As">
            <div className="flex items-center gap-4">
              <div className="relative sm:w-[200px] w-full shrink-0">
                <select
                  value={exportAs}
                  onChange={(e) => setExportAs(e.target.value)}
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
                >
                  <option value="pdf">PDF</option>
                  <option value="csv">CSV</option>
                  <option value="xlsx">XLSX</option>
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                  ▾
                </span>
              </div>

              <button
                onClick={handleGenerate}
                className="rounded-md bg-[#A57865] px-4 py-2 text-xs text-white hover:opacity-90"
              >
                Generate Report
              </button>
            </div>
          </Field>
        </div>

        {/* Section: Title */}
        <div className="mb-3 mt-10 text-[13px] text-gray-500">
          <span className="font-medium text-gray-800">Occupancy Report</span> –{" "}
          {rangePretty}
        </div>

        {/* KPI Tiles */}
        <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi, i) => (
            <div
              key={i}
              className="rounded-xl border border-gray-200 bg-white p-4"
            >
              <div className="text-[11px] text-gray-500">{kpi.label}</div>
              <div className="mt-1 text-[15px] font-semibold text-gray-900">
                {kpi.value}
              </div>
              {kpi.sub && (
                <div className="mt-0.5 text-[11px] text-emerald-600">
                  {kpi.sub}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Chart */}
        <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[12px] font-medium text-gray-700">Trend</div>
            <div className="text-[11px] text-gray-500">
              <span className="mr-4 inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[#EF4444]" />
                Below 90% (target/rolling days)
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="inline-block h-2 w-2 rounded-full bg-[#2BA69A]" />
                Occupancy trend
              </span>
            </div>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={chartData}
                margin={{ top: 8, right: 12, left: 4, bottom: 8 }}
              >
                <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
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
                  cursor={false}
                  contentStyle={{
                    borderRadius: 8,
                    borderColor: "#E5E7EB",
                    fontSize: 12,
                  }}
                />
                <Legend
                  verticalAlign="top"
                  align="right"
                  wrapperStyle={{ fontSize: 12 }}
                  iconType="circle"
                  iconSize={6}
                  formatter={(v) => (
                    <span style={{ fontSize: 12, color: "#4B5563" }}>
                      {v === "below90"
                        ? "Below 90% (target/rolling days)"
                        : "Occupancy trend"}
                    </span>
                  )}
                />
                {/* <Line
                  type="linear"
                  dataKey="below90"
                  stroke="#EF4444"
                  strokeWidth={1}
                  dot={{ r: 2 }}
                  activeDot={{ r: 3 }}
                /> */}
                <Line
                  type="linear"
                  dataKey="occ"
                  stroke="#2BA69A"
                  strokeWidth={1.5}
                  dot={{ r: 2 }}
                  activeDot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="rounded-t-xl bg-gray-50 px-4 py-2.5 text-[12px] font-medium text-gray-700">
            Room Type Summary
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-gray-700">
              <thead className="bg-white text-left text-[13px] font-medium text-gray-600">
                <tr>
                  <th className="px-4 py-3">Room Type</th>
                  <th className="px-4 py-3">Occupancy</th>
                  <th className="px-4 py-3">Occupancy (Nights)</th>
                  <th className="px-4 py-3">Revenue Share</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {tableRows.map((r) => (
                  <tr key={r.room} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{r.room}</td>
                    <td className="px-4 py-3">{r.occ}</td>
                    <td className="px-4 py-3">{r.occupancy}</td>
                    <td className="px-4 py-3">{r.revenueShare}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer actions */}
        </div>
        <div className="flex items-center mt-5 justify-end gap-2 px-4 py-3">
          <button className="rounded-md border border-gray-300 bg-white px-4 py-4 text-xs text-gray-700 hover:bg-gray-50">
            Download PDF
          </button>
          <button className="rounded-md border border-gray-300 bg-white px-4 py-4 text-xs text-gray-700 hover:bg-gray-50">
            Schedule Report
          </button>
          <button className="rounded-md bg-[#A57865] px-4 py-4 text-xs font-medium text-white hover:opacity-90">
            Schedule Monthly
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- tiny helper ---------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col">
      <div className="mb-1 text-[12px] text-gray-500">{label}</div>
      {children}
    </div>
  );
}
