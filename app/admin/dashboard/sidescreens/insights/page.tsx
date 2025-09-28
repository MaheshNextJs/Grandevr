"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import KpiCard from "@/components/admin/insights/KpiCard";
import FiltersBar from "@/components/admin/insights/FiltersBar";
import { INSIGHTS, type InsightRow } from "./data";
import OccupancyTrendsChart from "@/components/admin/insights/OccupancyTrendsChart";
import StaffUtilizationCard from "@/components/admin/insights/StaffUtilizationCard";
import GuestReputationCard from "@/components/admin/insights/GuestReputationCard";

// Type for date range (for future real datepicker wiring)
type Range = { start: string; end: string };

export default function Page() {
  const [query, setQuery] = useState("");
  const [datePreset, setDatePreset] = useState("all");
  const [range, setRange] = useState<Range>({
    start: "2025-09-20",
    end: "2025-09-28",
  });

  // -------- KPI cards are static placeholders for now --------
  const prettyRange = useMemo(() => {
    const fmt = (v: string) =>
      new Date(v)
        .toLocaleDateString("en-US", { month: "short", day: "2-digit" })
        .toLowerCase();
    return `${fmt(range.start)} – ${fmt(range.end)}`;
  }, [range]);

  const clearAll = () => {
    setQuery("");
    setDatePreset("all");
    setRange({ start: "2025-09-20", end: "2025-09-28" });
    setPage(1);
  };

  // -------- Table filtering + pagination --------
  const pageSize = 10;
  const [page, setPage] = useState(1);

  const filtered: InsightRow[] = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return INSIGHTS;
    return INSIGHTS.filter((r) =>
      [r.date, r.category, r.summary, r.suggestion].some((v) =>
        v.toLowerCase().includes(q)
      )
    );
  }, [query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const start = (safePage - 1) * pageSize;
  const paginated = filtered.slice(start, start + pageSize);
  const [loadingPDF, setLoadingPDF] = useState(false);

  // simple 1..5 window (can be made dynamic)
  const pageNumbers = Array.from(
    { length: Math.min(totalPages, 5) },
    (_, i) => i + 1
  );

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-gray-500">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700">Insights</span>
      </nav>

      <h1 className="text-2xl font-semibold text-gray-900">Insights</h1>

      {/* Top container */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 md:p-6">
        {/* Filters */}
        <FiltersBar
          query={query}
          onQueryChange={(v) => {
            setQuery(v);
            setPage(1);
          }}
          datePreset={datePreset}
          onDatePresetChange={setDatePreset}
          prettyRange={prettyRange}
          onClear={clearAll}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <KpiCard
            title="Occupancy Trend"
            value="82%"
            sub="avg this week"
            delta="+10% vs last week"
            deltaTone="up"
            icon="/icons/admin/card1.png"
          />
          <KpiCard
            title="Revenue Impact"
            value="$12,400"
            sub="upsell revenue"
            delta="+10% from last week"
            deltaTone="up"
            icon="/icons/admin/card2.png"
          />
          <KpiCard
            title="Guest Experience"
            value="68%"
            sub="positive reviews"
            extraLine="4 critical escalations"
            deltaTone="warn"
            icon="/icons/admin/card3.png"
          />
          <KpiCard
            title="Staff Performance"
            value="95%"
            sub="shift completion"
            extraLine="Target 95%"
            deltaTone="neutral"
            icon="/icons/admin/card4.png"
          />
        </div>

        {/* Insights Table */}
        <div className="mt-8 overflow-x-auto rounded-xl border border-gray-200">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-gray-50 text-left text-[13px] font-medium text-gray-600">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Insight Summary</th>
                <th className="px-4 py-3">Actionable Suggestion</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginated.map((item, idx) => (
                <tr key={`${item.date}-${idx}`} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{item.date}</td>
                  <td className="px-4 py-3">{item.category}</td>
                  <td className="px-4 py-3">{item.summary}</td>
                  <td className="px-4 py-3">{item.suggestion}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="rounded-md bg-[#A57865] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                      onClick={() => console.log("Action:", item.action)}
                    >
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}

              {paginated.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-sm text-gray-500"
                  >
                    No insights match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination (matches your reference) */}
          <div className="mt-4 flex items-center justify-between px-4 py-3">
            <p className="text-xs text-gray-500">
              Showing {filtered.length === 0 ? 0 : start + 1}–
              {Math.min(filtered.length, start + pageSize)} from{" "}
              {filtered.length}
            </p>

            <div className="flex items-center gap-1">
              {/* Prev */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                ‹
              </button>

              {/* Page numbers */}
              {pageNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setPage(n)}
                  className={`h-7 w-7 rounded-md border text-xs ${
                    n === safePage
                      ? "bg-[#A57865] text-white"
                      : "border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}

              {/* Next */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50 disabled:opacity-40"
              >
                ›
              </button>

              {/* Ellipsis */}
              {totalPages > 6 && (
                <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
                  …
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <OccupancyTrendsChart />
      <StaffUtilizationCard
        onViewSchedule={() => console.log("view schedule")}
        onReassign={() => console.log("reassign shifts")}
      />
      <GuestReputationCard />
      <div className="mt-5 flex justify-end gap-2">
        {/* <button className="rounded-md border border-gray-300 bg-white px-4 py-3 text-xs text-gray-700 hover:bg-gray-50">
          View Historical Insights
        </button> */}
        <Link
          href="/admin/dashboard/sidescreens/insights/ins-1"
          className="rounded-md border border-gray-300 bg-white px-4 py-3 text-xs text-gray-700 hover:bg-gray-50"
        >
          View Historical Insights
        </Link>
        <button
          className="rounded-md bg-[#A57865] px-4 py-3 text-xs font-medium text-white hover:opacity-90"
          disabled={loadingPDF}
        >
          {loadingPDF ? "Exporting..." : "Export Insights PDF"}
        </button>
      </div>
    </div>
  );
}
