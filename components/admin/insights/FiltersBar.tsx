"use client";

import { ChangeEvent } from "react";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;

  datePreset: string;
  onDatePresetChange: (v: string) => void;

  prettyRange: string; // already formatted (read-only field)
  onClear: () => void;
};

export default function FiltersBar({
  query,
  onQueryChange,
  datePreset,
  onDatePresetChange,
  prettyRange,
  onClear,
}: Props) {
  return (
    <>
      {/* Search bar */}
      <div className="mb-5">
        <div className="relative max-w-md">
          <input
            value={query}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              onQueryChange(e.target.value)
            }
            className="w-full rounded-lg border border-gray-300 bg-white pl-9 pr-3 py-2 text-sm outline-none focus:border-gray-400"
            placeholder="Search"
          />
          <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg
              viewBox="0 0 24 24"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path d="M20 20l-3.5-3.5" />
            </svg>
          </span>
        </div>
      </div>

      {/* Filters row (narrow widths as requested) */}
      <div className="mb-6 flex flex-wrap items-end gap-3">
        {/* Date Preset */}
        <div className="w-[160px]">
          <div className="mb-1 text-[12px] text-gray-500">Filter</div>
          <div className="relative">
            <select
              value={datePreset}
              onChange={(e) => onDatePresetChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
            >
              <option value="all">all</option>
              <option value="this-week">This week</option>
              <option value="last-week">Last week</option>
              <option value="this-month">This month</option>
              <option value="last-month">Last month</option>
              <option value="custom">Custom</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>
        </div>

        {/* Date Range */}
        <div className="w-[200px]">
          <div className="mb-1 text-[12px] text-gray-500">Date Range</div>
          <div className="relative">
            <input
              readOnly
              value={prettyRange}
              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-3 py-2 text-sm outline-none focus:border-gray-400"
            />
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" />
                <path d="M16 2v4M8 2v4M3 10h18" />
              </svg>
            </span>
          </div>
        </div>

        {/* Clear filter */}
        <div className="ml-auto">
          <button
            onClick={onClear}
            className="h-9 rounded-md border border-[#A57865] bg-white px-3 text-sm text-[#A57865] hover:bg-gray-50"
          >
            Clear all filter
          </button>
        </div>
      </div>
    </>
  );
}
