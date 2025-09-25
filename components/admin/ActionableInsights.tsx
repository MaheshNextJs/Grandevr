"use client";
import { insights } from "@/app/admin/dashboard/data/mock";
import Image from "next/image";

const toneStyles: Record<
  string,
  {
    container: string;
    iconSrc: string;
    linkClass: string;
  }
> = {
  alert: {
    container: "border border-red-200 bg-red-50 text-red-800",
    iconSrc: "/icons/err-red.png",
    linkClass: "text-red-600 hover:underline",
  },
  warn: {
    container: "border border-amber-200 bg-amber-50 text-amber-800",
    iconSrc: "/icons/err-orange.png",
    linkClass: "text-amber-600 hover:underline",
  },
  info: {
    container: "border border-sky-200 bg-sky-50 text-sky-800",
    iconSrc: "/icons/err-round.png",
    linkClass: "text-sky-600 hover:underline",
  },
  neutral: {
    container: "border border-neutral-200 bg-neutral-50 text-neutral-800",
    iconSrc: "/error.png",
    linkClass: "text-neutral-600 hover:underline",
  },
};

export default function ActionableInsights() {
  return (
    <div className="rounded-xl bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div className="text-base font-semibold text-neutral-800">
          Actionable Insights
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-1 text-xs text-neutral-700">
          <Image src="/icons/all.png" alt="Filter" width={16} height={16} />
          All
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

      <div className="space-y-3">
        {insights.map((insight) => {
          const tone = toneStyles[insight.tone] ?? toneStyles["neutral"];
          return (
            <div
              key={insight.title}
              className={`flex items-start justify-between rounded-md p-4 ${tone.container}`}
            >
              <div className="flex items-start gap-3">
                <img src={tone.iconSrc} alt="icon" className="w-5 h-5 mt-1" />
                <div>
                  <div className=" text-[#263238] text-sm">{insight.title}</div>
                  <div className="text-[12px] mt-1 text-[#949494] opacity-90">
                    {insight.desc}
                  </div>
                </div>
              </div>

              {insight.action && (
                <a href="#" className={`text-sm font-medium ${tone.linkClass}`}>
                  {insight.action}
                </a>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center mt-4">
        <a
          href="#"
          className="text-sm text-amber-700 hover:underline underline font-medium"
        >
          View all Insights
        </a>
      </div>
    </div>
  );
}
