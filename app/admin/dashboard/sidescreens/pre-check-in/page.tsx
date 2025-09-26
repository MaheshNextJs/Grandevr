"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Image from "next/image";
import {
  PRE_ROWS,
  type RoomType,
  type PreStatus,
  type PreIdStatus,
} from "./data";
import ApprovePreCheckInModal from "@/components/admin/precheckin/ApprovePreCheckInModal";
import RejectPreCheckInModal from "@/components/admin/precheckin/RejectPreCheckInModal";
import SendReminderFlow from "@/components/admin/precheckin/SendReminderFlow";
import ReviewPreCheckInModal from "@/components/admin/precheckin/ReviewPreCheckInModal";

type Row = (typeof PRE_ROWS)[number];

const BADGE = {
  completed:
    "inline-flex items-center gap-1 rounded-md bg-emerald-50 text-emerald-700 px-2 py-0.5 text-xs font-medium",
  pending:
    "inline-flex items-center gap-1 rounded-md bg-amber-50 text-amber-700 px-2 py-0.5 text-xs font-medium",
  danger:
    "inline-flex items-center gap-1 rounded-md bg-rose-50 text-rose-700 px-2 py-0.5 text-xs font-medium",
  soft: "inline-flex items-center gap-1 rounded-md bg-gray-100 text-gray-700 px-2 py-0.5 text-xs font-medium",
} as const;

const ID_PILL: Record<PreIdStatus, string> = {
  Verified: BADGE.completed,
  Pending: BADGE.pending,
  Flagged: BADGE.danger,
  "Issue Detected": BADGE.danger,
};

const ID_ICON_SRC: Record<PreIdStatus, string> = {
  Verified: "/icons/admin/verified1.png",
  Pending: "/icons/admin/pending.png",
  Flagged: "/icons/admin/flagged1.png",
  "Issue Detected": "/icons/admin/flagged1.png",
};

const STATUS_PILL: Record<PreStatus, string> = {
  Completed: BADGE.completed,
  Pending: BADGE.pending,
};

export default function Page() {
  // search + filters
  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState("All Dates");
  const [roomType, setRoomType] = useState("All Room Types");
  const [status, setStatus] = useState("All Status");
  const [source, setSource] = useState("All Sources"); // for UI parity

  // pagination (static demo)
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const rows = useMemo(() => {
    const filtered = PRE_ROWS.filter((r) => {
      const q =
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.guestName.toLowerCase().includes(query.toLowerCase());
      const rt =
        roomType === "All Room Types" || r.roomType === (roomType as RoomType);
      const st = status === "All Status" || r.status === (status as PreStatus);
      return q && rt && st;
    });
    const start = (page - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [query, roomType, status, page]);

  const total = useMemo(() => {
    return PRE_ROWS.filter((r) => {
      const q =
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.guestName.toLowerCase().includes(query.toLowerCase());
      const rt =
        roomType === "All Room Types" || r.roomType === (roomType as RoomType);
      const st = status === "All Status" || r.status === (status as PreStatus);
      return q && rt && st;
    }).length;
  }, [query, roomType, status]);

  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const clearAll = () => {
    setQuery("");
    setDateRange("All Dates");
    setRoomType("All Room Types");
    setStatus("All Status");
    setPage(1);
  };

  // // actions (demo fallbacks)
  // const onApprove = (id: string) => alert(`Approved pre-check-in for ${id}`);
  // const onReject = (id: string) => alert(`Rejected pre-check-in for ${id}`);
  // const onRemind = (id: string) => alert(`Reminder sent to ${id}`);

  const nowISO = new Date().toISOString();
  const twoDaysISO = new Date(
    Date.now() + 2 * 24 * 60 * 60 * 1000
  ).toISOString();

  // function onRemind(id: string): void | Promise<void> {
  //   throw new Error("Function not implemented.");
  // }
  // const onRemind = async (id: string) => {
  // TODO: call your API to send the reminder
  // alert(`Reminder sent to ${id}`);
  // };

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900">Pre-Check-In</h1>
      </div>

      {/* Search + Filters */}
      <div className="px-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative flex-1 max-w-xs">
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
              placeholder="Search"
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
          {/* Date Range */}
          <div>
            <div className="text-xs font-medium text-gray-500 mb-1">Filter</div>
            <div className="text-[11px] text-gray-500 mb-1">Date Range</div>
            <div className="relative">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                <option>All Dates</option>
                <option>Today</option>
                <option>This Week</option>
                <option>This Month</option>
                <option>Custom…</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
            <button
              onClick={clearAll}
              className="mt-2 inline-flex rounded-md border border-[#A57865] bg-white px-3 py-1.5 text-xs text-[#A57865] hover:bg-gray-50"
            >
              Clear all filter
            </button>
          </div>

          {/* Room Type */}
          <div className="md:pt-6">
            <div className="text-[11px] text-gray-500 mb-1">Room Type</div>
            <div className="relative">
              <select
                value={roomType}
                onChange={(e) => setRoomType(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                <option>All Room Types</option>
                <option>Deluxe</option>
                <option>Executive</option>
                <option>Suite</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="md:pt-6">
            <div className="text-[11px] text-gray-500 mb-1">Status</div>
            <div className="relative">
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                <option>All Status</option>
                <option>Pre-Check-In</option>
                <option>Completed</option>
                <option>Checked-In</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>

          {/* Source */}
          <div className="md:pt-6">
            <div className="text-[11px] text-gray-500 mb-1">Source</div>
            <div className="relative">
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                <option>Website</option>
                <option>OTA</option>
                <option>Walk-in</option>
                <option>All Sources</option>
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="px-6 pb-4">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-gray-500 text-xs">
                <th className="py-3 font-medium text-center">Reservation ID</th>
                <th className="py-3 font-medium text-center">Guest Name</th>
                <th className="py-3 font-medium text-center">Dates</th>
                <th className="py-3 font-medium text-center">Room Type</th>
                <th className="py-3 font-medium text-center">Status</th>
                <th className="py-3 font-medium text-center">
                  ID Verification
                </th>
                <th className="py-3 font-medium text-center">Preferences</th>
                <th className="py-3 font-medium text-center">Add-Ons</th>
                <th className="py-3 font-medium text-center">Signature</th>
                <th className="py-3 font-medium text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r) => (
                <tr
                  key={r.id}
                  className="border-t border-gray-100 text-gray-700"
                >
                  <td className="py-4 text-center">{r.id}</td>
                  <td className="py-4 text-center">{r.guestName}</td>
                  <td className="py-4 text-center">{r.dates}</td>
                  <td className="py-4 text-center">{r.roomType}</td>
                  <td className="py-2 text-center whitespace-nowrap">
                    <span className={STATUS_PILL[r.status]}>{r.status}</span>
                  </td>
                  <td className="py-2 text-center whitespace-nowrap">
                    <span className={ID_PILL[r.idVerification]}>
                      <span>{r.idVerification}</span>
                      <Image
                        src={ID_ICON_SRC[r.idVerification]}
                        alt={`${r.idVerification} icon`}
                        width={12}
                        height={12}
                        className="inline-block"
                      />
                    </span>
                  </td>
                  <td className="py-4 text-center">{r.preferences}</td>
                  <td className="py-4 text-center">{r.addOns}</td>
                  <td className="py-4 text-center">{r.signature}</td>

                  {/* Actions */}
                  <td className="py-4 align-middle">
                    <div className="inline-flex items-center justify-end gap-2 pr-1 whitespace-nowrap">
                      {/* View (always) */}
                      <Link
                        href={`/admin/dashboard/sidescreens/pre-check-in/${r.id}`}
                        className="w-[84px] text-center rounded-sm border border-gray-300 bg-white px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50"
                      >
                        View
                      </Link>

                      {/* One action only, based on status & verification */}

                      {r.status === "Pending" ? (
                        <SendReminderFlow
                          triggerClass="w-[84px] rounded-sm bg-[#A57865] text-white px-3 py-1.5 text-[12px] hover:opacity-95"
                          reservationId={r.id}
                          guestName={r.guestName}
                          guestEmail={r.email ?? "guest@example.com"}
                          guestPhone={r.phone ?? "—"}
                          checkInISO={nowISO}
                          checkOutISO={twoDaysISO}
                          room={`${r.roomType} × 1`}
                          guestsLabel={r.guests}
                          // onSend={() => onRemind(r.id)}
                        />
                      ) : r.idVerification === "Issue Detected" ? (
                        <ReviewPreCheckInModal
                          triggerClass="w-[84px] rounded-sm bg-[#A57865] text-white px-3 py-1.5 text-[12px] hover:opacity-95"
                          reservationId={r.id}
                          guestName={r.guestName}
                          checkInISO={nowISO}
                          checkOutISO={twoDaysISO}
                          room={`${r.roomType} × 1`}
                          guestsLabel={r.guests}
                          preferences={
                            r.preferences === "Set" ? "Vegetarian Meals" : "—"
                          }
                          addOns={r.addOns}
                          // onApproveNow={() => onApprove(r.id)}
                          onKeepFlagged={() => {}}
                        />
                      ) : r.idVerification === "Flagged" ? (
                        <RejectPreCheckInModal
                          triggerClass="w-[84px] rounded-sm bg-[#A57865] text-white px-3 py-1.5 text-[12px] hover:opacity-95"
                          reservationId={r.id}
                          guestName={r.guestName}
                          checkInISO={nowISO}
                          checkOutISO={twoDaysISO}
                          room={`${r.roomType} × 1`}
                          guestsLabel={r.guests}
                          preferences={
                            r.preferences === "Set" ? "Vegetarian Meals" : "—"
                          }
                          addOns={r.addOns}
                          signatureCaptured={r.signature === "Done"}
                          // onReject={() => onReject(r.id)}
                        />
                      ) : r.idVerification === "Verified" ? (
                        <ApprovePreCheckInModal
                          triggerClass="w-[84px] rounded-sm bg-[#A57865] text-white px-3 py-1.5 text-[12px] hover:opacity-95"
                          reservationId={r.id}
                          guestName={r.guestName}
                          checkInISO={nowISO}
                          checkOutISO={twoDaysISO}
                          room={`${r.roomType} × 1`}
                          guestsLabel={r.guests}
                          idVerified={true}
                          preferences={
                            r.preferences === "Set" ? "Vegetarian Meals" : "—"
                          }
                          addOns={r.addOns}
                          signatureCaptured={r.signature === "Done"}
                          // onApprove={() => onApprove(r.id)}
                        />
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">
            Showing {(page - 1) * pageSize + 1}–
            {Math.min(page * pageSize, total)} from {total}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={page === 1}
            >
              ‹
            </button>
            {Array.from({ length: totalPages })
              .slice(0, 6)
              .map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`h-7 w-7 rounded-md border text-xs ${
                      n === page
                        ? "bg-[#A57865] text-white border-gray-200"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={page === totalPages}
            >
              ›
            </button>
            <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
              …
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
