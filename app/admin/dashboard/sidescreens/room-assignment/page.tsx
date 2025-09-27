"use client";
import Image from "next/image";
import { useMemo, useState } from "react";
import {
  ROOM_TYPES,
  ALL_STATUSES,
  UNASSIGNED,
  ROOMS,
  ASSIGNED,
  type Room,
  type UnassignedReservation,
} from "./data";
import AssignRoomModal, {
  type AssignRoomOption,
} from "@/components/admin/assignroom/AssignRoomModal";
import AssignmentSuccessModal from "@/components/admin/assignroom/AssignmentSuccessModal";

/* Small UI helpers */
function Badge({ label }: { label: string }) {
  const tone = useMemo(() => {
    switch (label) {
      case "Confirmed":
      case "Clean & Ready":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "Occupied":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "Dirty":
        return "bg-amber-50 text-amber-700 border-amber-200";
      case "Maintenance":
        return "bg-slate-100 text-slate-700 border-slate-200";
      default:
        return "bg-sky-50 text-sky-700 border-sky-200";
    }
  }, [label]);

  return (
    <span
      className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-medium ${tone}`}
    >
      {label}
    </span>
  );
}

export default function Page() {
  // global filters
  const [q, setQ] = useState("");
  const [roomType, setRoomType] = useState<(typeof ROOM_TYPES)[number]>(
    ROOM_TYPES[0]
  );
  const [status, setStatus] = useState<(typeof ALL_STATUSES)[number]>(
    ALL_STATUSES[0]
  );
  const [dateRange, setDateRange] = useState("Anytime");

  // pagination
  const [p1, setP1] = useState(1);
  const [p2, setP2] = useState(1);
  const [p3, setP3] = useState(1);
  const PAGE_SIZE = 5;

  // modals
  const [assignOpen, setAssignOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [activeRes, setActiveRes] = useState<UnassignedReservation | null>(
    null
  );

  const clearAll = () => {
    setQ("");
    setRoomType(ROOM_TYPES[0]);
    setStatus(ALL_STATUSES[0]);
    setDateRange("Anytime");
  };

  const filterRooms = (list: Room[]) =>
    list.filter(
      (r) =>
        (roomType === "All Room Types" || r.roomType === roomType) &&
        (status === "All Status" || r.status === status) &&
        (q === "" ||
          r.roomNo.includes(q) ||
          r.roomType.toLowerCase().includes(q.toLowerCase()))
    );

  const filterUnassigned = (list: UnassignedReservation[]) =>
    list.filter(
      (u) =>
        (roomType === "All Room Types" || u.roomType === roomType) &&
        (q === "" ||
          u.id.includes(q) ||
          u.guest.toLowerCase().includes(q.toLowerCase()))
    );

  // computed lists
  const uFiltered = useMemo(() => filterUnassigned(UNASSIGNED), [q, roomType]);
  const aFiltered = useMemo(() => filterRooms(ROOMS), [q, roomType, status]);
  const asgFiltered = useMemo(
    () => filterRooms(ASSIGNED),
    [q, roomType, status]
  );

  // slice
  const slice = (arr: any[], page: number) =>
    arr.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // assign modal options
  const roomOptions: AssignRoomOption[] = useMemo(() => {
    if (!activeRes) return [];
    return ROOMS.filter(
      (r) => r.status === "Clean & Ready" && r.roomType === activeRes.roomType
    ).map((r) => ({
      roomNo: r.roomNo,
      roomType: r.roomType,
      status: r.status,
      subtitle: r.roomType,
    }));
  }, [activeRes]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Room Assignment</h1>
        <p className="text-gray-600 text-sm">
          Assign reservations to rooms, view availability, and manage statuses.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="px-6 py-6 border border-gray-200 shadow rounded-md bg-white">
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
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search"
              className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
            />
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {/* Filter */}
          <div>
            <div className="text-md font-medium text-gray-900">Filter</div>
            <div className="text-[11px] text-gray-500 mb-1 ">Date Range</div>
            <div className="relative  md:max-w-xs">
              <select
                value={dateRange}
                onChange={(e) => setDateRange(e.target.value)}
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                <option>Anytime</option>
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
            <div className="relative  md:max-w-xs">
              <select
                value={roomType}
                onChange={(e) =>
                  setRoomType(e.target.value as (typeof ROOM_TYPES)[number])
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                {ROOM_TYPES.map((rt) => (
                  <option key={rt}>{rt}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>

          {/* Status */}
          <div className="md:pt-6">
            <div className="text-[11px] text-gray-500 mb-1">Status</div>
            <div className="relative  md:max-w-xs">
              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value as (typeof ALL_STATUSES)[number])
                }
                className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Unassigned Reservations */}
      <h2 className="text-xl font-semibold mb-2 px-1">
        Unassigned Reservations
      </h2>
      <div className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-700 bg-gray-200">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Reservation ID</th>
                <th className="px-4 py-3 font-medium">Guest Name</th>
                <th className="px-4 py-3 font-medium">Dates</th>
                <th className="px-4 py-3 font-medium">Room Type</th>
                <th className="px-4 py-3 font-medium">Occupancy</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {slice(uFiltered, p1).map((r) => (
                <tr
                  key={r.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.id}
                  </td>
                  <td className="px-4 py-3">{r.guest}</td>
                  <td className="px-4 py-3">{r.dates}</td>
                  <td className="px-4 py-3">{r.roomType}</td>
                  <td className="px-4 py-3">{r.occupancy}</td>
                  <td className="px-4 py-3">
                    <Badge label={r.status} />
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => {
                        setActiveRes(r);
                        setAssignOpen(true);
                      }}
                      className="rounded-md bg-[#A57865] px-3 py-1.5 text-xs font-medium text-white hover:opacity-75"
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
              {uFiltered.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={7}
                  >
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {(p1 - 1) * PAGE_SIZE + 1}–
            {Math.min(p1 * PAGE_SIZE, uFiltered.length)} from {uFiltered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setP1((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p1 === 1}
            >
              ‹
            </button>
            {Array.from({
              length: Math.min(6, Math.ceil(uFiltered.length / PAGE_SIZE)),
            }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setP1(n)}
                  className={`h-7 w-7 rounded-md border text-xs ${
                    n === p1
                      ? "bg-[#A57865] text-white border-gray-200"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() =>
                setP1((p) =>
                  Math.min(Math.ceil(uFiltered.length / PAGE_SIZE), p + 1)
                )
              }
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p1 === Math.ceil(uFiltered.length / PAGE_SIZE)}
            >
              ›
            </button>
            <button
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled
            >
              …
            </button>
          </div>
        </div>
      </div>

      {/* Available Rooms */}
      <h2 className="text-xl font-semibold mb-2 px-1">Available Rooms</h2>
      <div className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-700 bg-gray-200">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Room No.</th>
                <th className="px-4 py-3 font-medium">Room Type</th>
                <th className="px-4 py-3 font-medium">Available Dates</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {slice(aFiltered, p2).map((r) => (
                <tr
                  key={`${r.roomNo}-${r.availableDates}`}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.roomNo}
                  </td>
                  <td className="px-4 py-3">{r.roomType}</td>
                  <td className="px-4 py-3">{r.availableDates}</td>
                  <td className="px-4 py-3">
                    <Badge label={r.status} />
                  </td>
                </tr>
              ))}
              {aFiltered.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={4}
                  >
                    No rooms found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {(p2 - 1) * PAGE_SIZE + 1}–
            {Math.min(p2 * PAGE_SIZE, aFiltered.length)} from {aFiltered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setP2((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p2 === 1}
            >
              ‹
            </button>
            {Array.from({
              length: Math.min(6, Math.ceil(aFiltered.length / PAGE_SIZE)),
            }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setP2(n)}
                  className={`h-7 w-7 rounded-md border text-xs ${
                    n === p2
                      ? "bg-[#A57865] text-white border-gray-200"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() =>
                setP2((p) =>
                  Math.min(Math.ceil(aFiltered.length / PAGE_SIZE), p + 1)
                )
              }
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p2 === Math.ceil(aFiltered.length / PAGE_SIZE)}
            >
              ›
            </button>
            <button
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled
            >
              …
            </button>
          </div>
        </div>
      </div>

      {/* Assigned Reservations */}
      <h2 className="text-xl font-semibold mb-2 px-1">Assigned Reservations</h2>
      <div className="rounded-md border border-gray-200 shadow-sm bg-white overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-xs text-gray-700 bg-gray-200">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Room No.</th>
                <th className="px-4 py-3 font-medium">Room Type</th>
                <th className="px-4 py-3 font-medium">Available Dates</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {slice(asgFiltered, p3).map((r) => (
                <tr
                  key={`${r.roomNo}-${r.availableDates}-asg`}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {r.roomNo}
                  </td>
                  <td className="px-4 py-3">{r.roomType}</td>
                  <td className="px-4 py-3">{r.availableDates}</td>
                  <td className="px-4 py-3">
                    <Badge label={r.status} />
                  </td>
                </tr>
              ))}
              {asgFiltered.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={4}
                  >
                    No assigned reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer / Pagination */}
        <div className="flex items-center justify-between px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {(p3 - 1) * PAGE_SIZE + 1}–
            {Math.min(p3 * PAGE_SIZE, asgFiltered.length)} from{" "}
            {asgFiltered.length}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setP3((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p3 === 1}
            >
              ‹
            </button>
            {Array.from({
              length: Math.min(6, Math.ceil(asgFiltered.length / PAGE_SIZE)),
            }).map((_, i) => {
              const n = i + 1;
              return (
                <button
                  key={n}
                  onClick={() => setP3(n)}
                  className={`h-7 w-7 rounded-md border text-xs ${
                    n === p3
                      ? "bg-[#A57865] text-white border-gray-200"
                      : "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {n}
                </button>
              );
            })}
            <button
              onClick={() =>
                setP3((p) =>
                  Math.min(Math.ceil(asgFiltered.length / PAGE_SIZE), p + 1)
                )
              }
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={p3 === Math.ceil(asgFiltered.length / PAGE_SIZE)}
            >
              ›
            </button>
            <button
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled
            >
              …
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      {activeRes && (
        <AssignRoomModal
          open={assignOpen}
          reservationId={activeRes.id}
          guestName={activeRes.guest}
          startDate={activeRes.dates.split("–")[0]?.trim() ?? ""}
          endDate={activeRes.dates.split("–")[1]?.trim() ?? ""}
          requested={`${activeRes.roomType} × 1`}
          options={roomOptions}
          onClose={() => setAssignOpen(false)}
          onConfirm={(roomNo: string | null, useAISuggest: boolean) => {
            if (!roomNo) {
              return;
            }
            setAssignOpen(false);
            setSuccessOpen(true);
          }}
        />
      )}

      {activeRes && (
        <AssignmentSuccessModal
          open={successOpen}
          guestName={activeRes.guest}
          startDate={activeRes.dates.split("–")[0]?.trim() ?? ""}
          endDate={activeRes.dates.split("–")[1]?.trim() ?? ""}
          requested={`${activeRes.roomType} × 1`}
          onClose={() => {
            setSuccessOpen(false);
            setActiveRes(null);
          }}
        />
      )}
    </div>
  );
}
