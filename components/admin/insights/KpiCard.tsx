"use client";

import Image from "next/image";

export default function KpiCard(props: {
  title: string;
  value: string;
  sub: string;
  deltaTone?: "up" | "down" | "warn" | "neutral";
  delta?: string;
  extraLine?: string;
  icon: string; // e.g. /icons/admin/card1.png
}) {
  const tone =
    props.deltaTone === "up"
      ? "text-emerald-600"
      : props.deltaTone === "down"
      ? "text-rose-600"
      : props.deltaTone === "warn"
      ? "text-amber-600"
      : "text-gray-500";

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="mb-3 flex items-start justify-between">
        <div className="text-xs font-medium text-gray-800">{props.title}</div>
        <Image
          src={props.icon}
          alt="Card Icon"
          width={20}
          height={20}
          className="object-contain"
        />
      </div>

      <div className="mb-0.5 text-md font-semibold text-gray-900">
        {props.value}
      </div>
      <div className="mb-2 text-[11px] text-gray-500">{props.sub}</div>

      {props.delta && (
        <div className={`text-[11px] ${tone}`}>{props.delta}</div>
      )}
      {props.extraLine && (
        <div className={`text-[11px] ${tone}`}>{props.extraLine}</div>
      )}
    </div>
  );
}
