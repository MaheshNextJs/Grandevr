"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState } from "react";
import { INSIGHTS } from "../data";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Cell,
} from "recharts";

export default function InsightDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // Parse id like "ins-12" -> 11 (zero-based index)
  const match = params.id.match(/^ins-(\d+)$/);
  const index = match ? Math.max(0, parseInt(match[1], 10) - 1) : -1;

  // Pull the base row from the INSIGHTS table list
  const row = index >= 0 && index < INSIGHTS.length ? INSIGHTS[index] : null;

  // Build a presentational detail object from the row (fallbacks if not found)
  const detail = useMemo(
    () =>
      row
        ? {
            title: row.summary,
            confidence: 85,
            category: row.category,
            dateDetected: "2025-09-20",
            breakdown: [
              { source: "OTA (Expedia)", value: 55, color: "#DC2626" },
              { source: "Website", value: 78, color: "#2BA69A" },
              { source: "Walk-in", value: 62, color: "#DC2626" },
            ],
            table: [
              {
                source: "OTA (Expedia)",
                bookings: 120,
                cancellations: 18,
                rate: "15%",
              },
              { source: "Website", bookings: 80, cancellations: 4, rate: "5%" },
              { source: "Walk-in", bookings: 40, cancellations: 2, rate: "3%" },
            ],
            suggestion: `${row.suggestion} ` + "Confidence: High (85%).",
          }
        : {
            title: "Insight not found.",
            confidence: 0,
            category: "—",
            dateDetected: "—",
            breakdown: [] as Array<{
              source: string;
              value: number;
              color: string;
            }>,
            table: [] as Array<{
              source: string;
              bookings: number;
              cancellations: number;
              rate: string;
            }>,
            suggestion: "This insight could not be located.",
          },
    [row]
  );

  const dateStr = useMemo(() => {
    const d = new Date(detail.dateDetected);
    return isNaN(d.getTime())
      ? detail.dateDetected
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "2-digit",
          year: "numeric",
        });
  }, [detail.dateDetected]);

  const [exporting, setExporting] = useState(false);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1 text-[12px] text-gray-500">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <Link href="/admin/insights" className="hover:underline">
          Insights
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700">Insight Detail</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">Insight Detail</h1>

      {/* AI Insight banner */}
      <div className="rounded-xl border border-[#E7D8D1] bg-[#F6EEEA]">
        <div className="flex items-start gap-2 px-4 py-3">
          <Image
            src="/icons/admin/critical.png"
            alt="AI"
            width={16}
            height={16}
            className="mt-0.5"
          />
          <div className="text-[13px] text-gray-800">
            <div className="font-medium">AI Insight</div>
            <p className="mt-1">{detail.title}</p>
          </div>
        </div>
      </div>

      {/* Meta grid */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-1 gap-6 px-6 py-5 md:grid-cols-3">
          <KV label="Confidence" value={`${detail.confidence}%`} />
          <KV label="Category" value={detail.category} />
          <KV label="Date Detected" value={dateStr} />
        </div>
      </div>

      {/* Bar chart card */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-[13px] font-medium text-gray-800">
          Cancellations by Source
        </h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={detail.breakdown}
              margin={{ top: 8, right: 12, left: 8, bottom: 16 }}
              barSize={40}
            >
              <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
              <XAxis
                dataKey="source"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
              />
              <YAxis
                domain={[0, 100]}
                ticks={[0, 25, 50, 75, 100]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#E5E7EB" }}
                tickLine={false}
                label={{
                  value: "Percentage",
                  angle: -90,
                  position: "insideLeft",
                  offset: 10,
                  style: { fill: "#6B7280", fontSize: 12 },
                }}
              />
              <Tooltip
                cursor={false} // no gray overlay on hover
                formatter={(v: any) => `${v}%`}
                contentStyle={{
                  borderRadius: 8,
                  borderColor: "#E5E7EB",
                  fontSize: 12,
                }}
              />
              <Bar
                dataKey="value"
                radius={[4, 4, 0, 0]}
                isAnimationActive={false}
              >
                {detail.breakdown.map((b, i) => (
                  <Cell key={i} fill={b.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Table + suggestion */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="rounded-t-xl bg-gray-50 px-4 py-2.5 text-[13px] font-medium text-gray-700">
          Source Breakdown
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-gray-700">
            <thead className="bg-white text-left text-[13px] font-medium text-gray-600">
              <tr>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Bookings</th>
                <th className="px-4 py-3">Cancellations</th>
                <th className="px-4 py-3">Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {detail.table.map((r, i) => (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{r.source}</td>
                  <td className="px-4 py-3">{r.bookings}</td>
                  <td className="px-4 py-3">{r.cancellations}</td>
                  <td className="px-4 py-3">{r.rate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* AI Suggestion box */}
        <div className="m-4 rounded-md border border-[#E7D8D1] bg-[#F6EEEA]">
          <div className="flex items-start gap-2 px-4 py-3">
            <Image
              src="/icons/admin/critical.png"
              alt="AI"
              width={16}
              height={16}
              className="mt-0.5"
            />
            <div className="flex-1">
              <div className="text-[13px] font-medium text-gray-800">
                AI Suggestion
              </div>
              <p className="mt-1 text-[13px] text-gray-700">
                {detail.suggestion}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-2">
        <button className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50">
          Dismiss Insight
        </button>
        <button
          onClick={() => {
            setExporting(true);
            setTimeout(() => setExporting(false), 900); // mock
          }}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
        >
          {exporting ? "Exporting…" : "Export Insight"}
        </button>
        <button className="rounded-md bg-[#A57865] px-4 py-2 text-sm text-[12px] text-white hover:opacity-90">
          Take Action
        </button>
      </div>
    </div>
  );
}

/* Small KV helper */
function KV({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col">
      <div className="mb-1 text-[11px] text-gray-500">{label}</div>
      <div className="text-[13px] text-gray-900">{value}</div>
    </div>
  );
}
