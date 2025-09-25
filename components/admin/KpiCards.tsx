"use client";
import Image from "next/image";
import type { Kpi } from "@/app/admin/dashboard/data/mock";
import { kpis } from "@/app/admin/dashboard/data/mock";

function Arrow({ dir = "up" }: { dir?: "up" | "down" }) {
  // small inline arrow matching the screenshot vibe
  return (
    <svg
      viewBox="0 0 20 20"
      className={`h-3 w-3 inline-block ${
        dir === "up" ? "rotate-0" : "rotate-180"
      }`}
      aria-hidden
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 15V5" />
      <path d="M6 9l4-4 4 4" />
    </svg>
  );
}

function WarningChip() {
  return (
    <span className="inline-flex items-center gap-1 text-xs text-amber-700">
      {/* warning icon */}
      <svg
        viewBox="0 0 20 20"
        className="h-4 w-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path d="M10 3l8 14H2L10 3z" />
        <path d="M10 8v4M10 14h.01" />
      </svg>
      Action Needed
    </span>
  );
}

function CardFooter(k: Kpi) {
  // Footer variants per card
  if ("footerNote" in k) {
    return <div className="text-xs text-neutral-500">{k.footerNote}</div>;
  }

  // delta or status
  if (k.delta) {
    const color = k.delta.dir === "up" ? "text-emerald-600" : "text-red-600";
    return (
      <div className="text-xs">
        <div className="text-neutral-400">{k.footerLabel}</div>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`${color} font-medium inline-flex items-center gap-1`}
          >
            {k.delta.value} <Arrow dir={k.delta.dir} />
          </span>
          <span className="text-neutral-500">{k.delta.note}</span>
        </div>
      </div>
    );
  }
  // pending pre-check-ins → status chip
  return (
    <div className="text-xs">
      <div className="text-neutral-400">{(k as any).footerLabel}</div>
      <div className="mt-1">
        <WarningChip />
      </div>
    </div>
  );
}

export default function KpiCards() {
  return (
    <section className="space-y-4">
      {/* Title + subtitle */}
      <div>
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <p className="text-[12px] text-neutral-500">
          Overview of hotel performance and key insights
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((k) => (
          <div
            key={k.label}
            className="rounded-md border border-neutral-200 bg-white p-4 shadow-sm"
          >
            {/* top row: label + tiny icon on right */}
            <div className="flex items-start justify-between">
              <div className="text-xs text-neutral-500 font-medium">
                {k.label}
              </div>
              {"icon" in k && k.icon ? (
                <Image src={k.icon} alt="" width={20} height={20} />
              ) : null}
            </div>

            {/* big value */}
            <div className="text-2xl font-semibold mt-1">{k.value}</div>

            {/* footer line */}
            <div className="mt-3">
              <CardFooter {...k} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
