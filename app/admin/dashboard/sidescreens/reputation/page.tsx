"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  REVIEWS,
  SOURCES,
  type Review,
  sentimentTone,
  computeStats,
} from "./data";
import Link from "next/link";

/* ---------- Tiny UI helpers ---------- */
function StarRating({ value }: { value: number }) {
  return (
    <div className="inline-flex gap-1" aria-label={`${value} star rating`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const filled = i < value;
        return (
          <svg
            key={i}
            viewBox="0 0 20 20"
            className={`h-4 w-4 ${filled ? "fill-amber-400" : "fill-gray-200"}`}
          >
            <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
          </svg>
        );
      })}
    </div>
  );
}

function StatCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 shadow-sm bg-white p-4">
      <div>
        <div className="text-xs text-gray-500 mb-1">{title}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
      <Image
        src={icon}
        alt={title}
        width={20}
        height={20}
        className="opacity-80 pb-5"
      />
    </div>
  );
}

/* ---------- Page ---------- */
export default function Page() {
  // filters
  const [query, setQuery] = useState("");
  const [source, setSource] = useState<(typeof SOURCES)[number]>("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  const clearAll = () => {
    setQuery("");
    setSource("All");
    setFromDate("");
    setToDate("");
  };

  // filter + sort
  const filtered = useMemo(() => {
    return REVIEWS.filter((r) => {
      if (source !== "All" && r.source !== source) return false;
      if (query) {
        const hay = `${r.guest} ${r.comment}`.toLowerCase();
        if (!hay.includes(query.toLowerCase())) return false;
      }
      if (fromDate && new Date(r.date) < new Date(fromDate)) return false;
      if (toDate && new Date(r.date) > new Date(toDate)) return false;
      return true;
    }).sort((a, b) => +new Date(b.date) - +new Date(a.date));
  }, [query, source, fromDate, toDate]);

  const stats = useMemo(() => computeStats(filtered), [filtered]);

  // pagination
  const pageSize = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const start = (page - 1) * pageSize;
  const pageRows = filtered.slice(start, start + pageSize);

  // reset page when filters change
  useMemo(() => setPage(1), [query, source, fromDate, toDate]);

  // simple pager buttons (1..totalPages, clamp to 6 buttons)
  const pageNumbers = useMemo(() => {
    const maxButtons = 6;
    const first = Math.max(1, Math.min(page - 2, totalPages - maxButtons + 1));
    const last = Math.min(totalPages, first + maxButtons - 1);
    return Array.from({ length: last - first + 1 }, (_, i) => first + i);
  }, [page, totalPages]);

  return (
    <div className="rounded-2xl border bg-white p-6 md:p-8">
      <nav className="text-[12px] text-gray-500 flex items-center space-x-1">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Staff Management</span>
      </nav>

      <h1 className="text-2xl font-semibold mb-2">Reputation</h1>

      {/* Filter card (your staff-style block, adapted) */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Image
                  src="/icons/search.png"
                  alt="Search"
                  width={16}
                  height={16}
                />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search reviews"
                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3">
            {/* Source + Clear */}
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Filter
              </div>
              <div className="text-[11px] text-gray-500 mb-1">Source</div>
              <div className=" max-w-xs">
                <select
                  value={source}
                  onChange={(e) => setSource(e.target.value as any)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                >
                  {SOURCES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
              <button
                onClick={clearAll}
                className="mt-4  inline-flex rounded-md border border-[#A57865] bg-white px-3 py-1.5 text-xs text-[#A57865] hover:bg-red-100"
              >
                Clear all filter
              </button>
            </div>

            {/* From */}
            <div className="md:pt-6">
              <div className="relative max-w-xs">
                <div className="text-[11px] text-gray-500 mb-1">From</div>
                <input
                  type="date"
                  value={fromDate}
                  onChange={(e) => setFromDate(e.target.value)}
                  className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm"
                />
              </div>
            </div>

            {/* To */}
            <div className="md:pt-6">
              <div className="text-[11px] text-gray-500 mb-1">To</div>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm"
              />
            </div>

            <div className="md:pt-6" />
          </div>
        </div>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 mb-6">
        <StatCard
          title="Positive Reviews"
          value={`${stats.positivePct}%`}
          icon="/icons/admin/card1.png"
        />
        <StatCard
          title="Neutral Reviews"
          value={`${stats.neutralPct}%`}
          icon="/icons/admin/card2.png"
        />
        <StatCard
          title="Negative Reviews"
          value={`${stats.negativePct}%`}
          icon="/icons/admin/card3.png"
        />
        <StatCard
          title="Average Rating"
          value={`${stats.avg.toFixed(1)} / 5`}
          icon="/icons/admin/card4.png"
        />
      </div>

      {/* Table */}
      {/* Table */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="px-6 pb-4">
          {/* Scrollable table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  <th className="py-3 font-medium text-center">Date</th>
                  <th className="py-3 font-medium text-center">Guest</th>
                  <th className="py-3 font-medium text-center">Source</th>
                  <th className="py-3 font-medium text-center">Rating</th>
                  <th className="py-3 font-medium text-center">Sentiment</th>
                  <th className="py-3 font-medium text-center">Status</th>
                  <th className="py-3 font-medium text-center">Sentiment</th>
                  <th className="py-3 font-medium text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {pageRows.map((r: Review) => {
                  const tone = sentimentTone[r.sentiment];
                  return (
                    <tr
                      key={r.id}
                      className="border-t border-gray-100 text-gray-700"
                    >
                      <td className="py-4 text-center">
                        {new Date(r.date).toLocaleDateString(undefined, {
                          month: "short",
                          day: "2-digit",
                        })}
                      </td>
                      <td className="py-4 text-center">{r.guest}</td>
                      <td className="py-4 text-center">{r.source}</td>
                      <td className="py-4 text-center">
                        <StarRating value={r.rating} />
                      </td>
                      <td className="py-4 text-center">
                        <span
                          className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium ${tone.badge}`}
                        >
                          {r.sentiment}
                        </span>
                      </td>
                      <td className="py-4 text-center">
                        {r.status ? (
                          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                            {r.status}
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="py-4 text-gray-600">
                        <span className="line-clamp-1">"{r.comment}"</span>
                      </td>
                      <td className="py-4">
                        <div className="flex items-center gap-2">
                          {/* View */}
                          <button
                            onClick={() => console.log("View", r.id)}
                            className="h-8 w-[72px] px-3 rounded-md border border-gray-200 bg-white text-xs text-gray-700 hover:bg-gray-50"
                          >
                            View
                          </button>

                          {/* Track for Escalated, otherwise Respond */}
                          {r.status === "Escalated" ? (
                            <button
                              onClick={() => console.log("Track", r.id)}
                              className="h-8 w-[72px] rounded-md bg-[#A57865] text-white text-xs hover:opacity-90"
                            >
                              Track
                            </button>
                          ) : (
                            <button
                              onClick={() => console.log("Respond", r.id)}
                              className="h-8 w-[72px] rounded-md bg-[#A57865] text-white text-xs hover:opacity-90"
                            >
                              Respond
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {pageRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-12 text-center text-sm text-gray-500"
                    >
                      No reviews match your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Footer */}
          <div className="mt-4 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Showing {filtered.length === 0 ? 0 : start + 1}–
              {Math.min(filtered.length, start + pageSize)} from{" "}
              {filtered.length}
            </p>

            <div className="flex items-center gap-1">
              {/* Prev button */}
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
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
                    n === page
                      ? "bg-[#A57865] text-white"
                      : "border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              ))}

              {/* Next button */}
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
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
    </div>
  );
}
