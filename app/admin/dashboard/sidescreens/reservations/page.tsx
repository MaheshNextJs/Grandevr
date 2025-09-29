// // app/admin/reservations/page.tsx
// "use client";

// import { useMemo, useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation"; // ✅ added

// type Reservation = {
//   id: string;
//   guest: string;
//   dates: string;
//   roomType: "Deluxe" | "Executive" | "Suite";
//   status: "Pre‑Check‑In" | "Completed" | "Checked‑In";
//   payment: "Paid" | "Pending";
//   source: "Website" | "OTA" | "Walk‑in";
// };

// const STATUS_STYLES: Record<
//   Reservation["status"],
//   { bg: string; text: string; dot: string }
// > = {
//   "Pre‑Check‑In": {
//     bg: "bg-amber-50",
//     text: "text-amber-700",
//     dot: "bg-amber-500",
//   },
//   Completed: {
//     bg: "bg-emerald-50",
//     text: "text-emerald-700",
//     dot: "bg-emerald-500",
//   },
//   "Checked‑In": {
//     bg: "bg-[#FEF5F2]",
//     text: "text-[#A57865]",
//     dot: "bg-[#A57865]",
//   },
// };

// const PAYMENT_STYLES: Record<
//   Reservation["payment"],
//   { bg: string; text: string }
// > = {
//   Paid: { bg: "bg-emerald-50", text: "text-emerald-700" },
//   Pending: { bg: "bg-amber-50", text: "text-amber-700" },
// };

// const MOCK: Reservation[] = Array.from({ length: 10 }).map((_, i) => {
//   const base: Reservation = {
//     id: "HT12345",
//     guest: "John Doe",
//     dates: "20–23 Sept",
//     roomType: "Suite",
//     status: "Checked‑In",
//     payment: "Pending",
//     source: "Website",
//   };
//   const row: Reservation = [
//     {
//       ...base,
//       roomType: "Deluxe" as Reservation["roomType"],
//       status: "Pre‑Check‑In" as Reservation["status"],
//       payment: "Paid" as Reservation["payment"],
//     },
//     {
//       ...base,
//       roomType: "Executive" as Reservation["roomType"],
//       status: "Completed" as Reservation["status"],
//       payment: "Pending" as Reservation["payment"],
//     },
//     base,
//   ][i % 3];
//   return { ...row, id: `${row.id}${i ? "-" + (i + 1) : ""}` };
// });

// export default function Page() {
//   const router = useRouter(); // ✅ added

//   const [query, setQuery] = useState("");
//   const [dateRange, setDateRange] = useState("All Dates");
//   const [roomType, setRoomType] = useState("All Room Types");
//   const [status, setStatus] = useState("All Status");
//   const [source, setSource] = useState("Website");

//   const data = useMemo(() => {
//     return MOCK.filter((r) => {
//       const q =
//         r.id.toLowerCase().includes(query.toLowerCase()) ||
//         r.guest.toLowerCase().includes(query.toLowerCase());
//       const rt = roomType === "All Room Types" || r.roomType === roomType;
//       const st = status === "All Status" || r.status === (status as any);
//       const so = source === "All Sources" || r.source === (source as any);
//       // dateRange is static in mock; keep it pass‑through for now
//       return q && rt && st && so;
//     });
//   }, [query, roomType, status, source]);

//   const clearAll = () => {
//     setQuery("");
//     setDateRange("All Dates");
//     setRoomType("All Room Types");
//     setStatus("All Status");
//     setSource("Website");
//   };

//   return (
//     <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
//       {/* Header */}
//       <div className="p-6 pb-4">
//         <h1 className="text-xl font-semibold text-gray-900">Reservations</h1>
//       </div>

//       {/* Search + Filters */}
//       <div className="px-6 pb-4">
//         <div className="flex items-center gap-3">
//           <div className="relative flex-1 max-w-xs">
//             <span className="absolute inset-y-0 left-3 flex items-center">
//               {/* replace with your icon */}
//               <Image
//                 src="/icons/search.png"
//                 alt="Search"
//                 width={16}
//                 height={16}
//               />
//             </span>
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search"
//               className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
//             />
//           </div>
//         </div>

//         <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-4">
//           {/* Date Range */}
//           <div>
//             <div className="text-xs font-medium text-gray-500 mb-1">Filter</div>
//             <div className="text-[11px] text-gray-500 mb-1">Date Range</div>
//             <div className="relative">
//               <select
//                 value={dateRange}
//                 onChange={(e) => setDateRange(e.target.value)}
//                 className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
//               >
//                 <option>All Dates</option>
//                 <option>Today</option>
//                 <option>This Week</option>
//                 <option>This Month</option>
//                 <option>Custom…</option>
//               </select>
//               <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                 ▾
//               </span>
//             </div>
//             <button
//               onClick={clearAll}
//               className="mt-2 inline-flex rounded-md border border-[#A57865] bg-white px-3 py-1.5 text-xs text-[#A57865] hover:bg-gray-50"
//             >
//               Clear all filter
//             </button>
//           </div>

//           {/* Room Type */}
//           <div className="md:pt-6">
//             <div className="text-[11px] text-gray-500 mb-1">Room Type</div>
//             <div className="relative">
//               <select
//                 value={roomType}
//                 onChange={(e) => setRoomType(e.target.value)}
//                 className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
//               >
//                 <option>All Room Types</option>
//                 <option>Deluxe</option>
//                 <option>Executive</option>
//                 <option>Suite</option>
//               </select>
//               <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                 ▾
//               </span>
//             </div>
//           </div>

//           {/* Status */}
//           <div className="md:pt-6">
//             <div className="text-[11px] text-gray-500 mb-1">Status</div>
//             <div className="relative">
//               <select
//                 value={status}
//                 onChange={(e) => setStatus(e.target.value)}
//                 className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
//               >
//                 <option>All Status</option>
//                 <option>Pre‑Check‑In</option>
//                 <option>Completed</option>
//                 <option>Checked‑In</option>
//               </select>
//               <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                 ▾
//               </span>
//             </div>
//           </div>

//           {/* Source */}
//           <div className="md:pt-6">
//             <div className="text-[11px] text-gray-500 mb-1">Source</div>
//             <div className="relative">
//               <select
//                 value={source}
//                 onChange={(e) => setSource(e.target.value)}
//                 className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
//               >
//                 <option>Website</option>
//                 <option>OTA</option>
//                 <option>Walk‑in</option>
//                 <option>All Sources</option>
//               </select>
//               <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                 ▾
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="px-6 pb-4">
//         <div className="overflow-x-auto">
//           <table className="w-full text-sm">
//             <thead>
//               <tr className="text-left text-gray-500 text-xs">
//                 <th className="py-3 font-medium">Reservation ID</th>
//                 <th className="py-3 font-medium">Guest Name</th>
//                 <th className="py-3 font-medium">Dates</th>
//                 <th className="py-3 font-medium">Room Type</th>
//                 <th className="py-3 font-medium">Status</th>
//                 <th className="py-3 font-medium">Payment</th>
//                 <th className="py-3 font-medium">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((r, idx) => {
//                 const statusStyle = STATUS_STYLES[r.status];
//                 const payStyle = PAYMENT_STYLES[r.payment];
//                 return (
//                   <tr
//                     key={idx}
//                     className="border-t border-gray-100 text-gray-700"
//                   >
//                     <td className="py-4">{r.id}</td>
//                     <td className="py-4">{r.guest}</td>
//                     <td className="py-4">{r.dates}</td>
//                     <td className="py-4">{r.roomType}</td>
//                     <td className="py-4">
//                       <span
//                         className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
//                       >
//                         <span
//                           className={`inline-block h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
//                         />
//                         {r.status}
//                       </span>
//                     </td>
//                     <td className="py-4">
//                       <span
//                         className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${payStyle.bg} ${payStyle.text}`}
//                       >
//                         {r.payment}
//                       </span>
//                     </td>
//                     <td className="py-4">
//                       <button
//                         type="button"
//                         onClick={() =>
//                           router.push(
//                             `/admin/dashboard/sidescreens/reservations/${r.id}`
//                           )
//                         } // ✅ navigate to ID page
//                         className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
//                         aria-label="Actions"
//                         title="Open reservation details"
//                       >
//                         {/* replace with your 3-dots icon */}
//                         <span className="text-gray-500">⋮</span>
//                       </button>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div className="mt-4 flex items-center justify-between">
//           <p className="text-xs text-gray-500">Showing 1–10 from 100</p>
//           <div className="flex items-center gap-1">
//             <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
//               ‹
//             </button>
//             {["1", "2", "3", "4", "5"].map((p) => (
//               <button
//                 key={p}
//                 className={`h-7 w-7 rounded-md border text-xs ${
//                   p === "1"
//                     ? "bg-[#A57865] text-white  "
//                     : "border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
//                 }`}
//               >
//                 {p}
//               </button>
//             ))}
//             <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
//               ›
//             </button>
//             <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
//               …
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// app/admin/reservations/page.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

/* ---------------- RowActions (inline, reusable) ---------------- */
type RowActionsProps = {
  onView?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
};

function RowActions({ onView, onEdit, onCancel }: RowActionsProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on outside click / ESC
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Actions"
      >
        <span className="text-gray-500">⋮</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-44 rounded-lg border border-gray-200 bg-white p-2 shadow-lg flex flex-col"
        >
          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* eye icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
            View
          </button>

          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* pencil icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 21l3.75-.75L21 6l-3-3L3.75 17.25 3 21z" />
              <path d="M14 4l6 6" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* x icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

/* ---------------- Page ---------------- */

type Reservation = {
  id: string;
  guest: string;
  dates: string;
  roomType: "Deluxe" | "Executive" | "Suite";
  status: "Pre‑Check‑In" | "Completed" | "Checked‑In";
  payment: "Paid" | "Pending";
  source: "Website" | "OTA" | "Walk‑in";
};

const STATUS_STYLES: Record<
  Reservation["status"],
  { bg: string; text: string; dot: string }
> = {
  "Pre‑Check‑In": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Completed: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "Checked‑In": {
    bg: "bg-[#FEF5F2]",
    text: "text-[#A57865]",
    dot: "bg-[#A57865]",
  },
};

const PAYMENT_STYLES: Record<
  Reservation["payment"],
  { bg: string; text: string }
> = {
  Paid: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Pending: { bg: "bg-amber-50", text: "text-amber-700" },
};

const MOCK: Reservation[] = Array.from({ length: 10 }).map((_, i) => {
  const base: Reservation = {
    id: "HT12345",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Checked‑In",
    payment: "Pending",
    source: "Website",
  };
  const row: Reservation = [
    {
      ...base,
      roomType: "Deluxe",
      status: "Pre‑Check‑In",
      payment: "Paid",
    },
    {
      ...base,
      roomType: "Executive",
      status: "Completed",
      payment: "Pending",
    },
    base,
  ][i % 3];
  return { ...row, id: `${row.id}${i ? "-" + (i + 1) : ""}` };
});

export default function Page() {
  const router = useRouter();

  const [query, setQuery] = useState("");
  const [dateRange, setDateRange] = useState("All Dates");
  const [roomType, setRoomType] = useState("All Room Types");
  const [status, setStatus] = useState("All Status");
  const [source, setSource] = useState("Website");

  const data = useMemo(() => {
    return MOCK.filter((r) => {
      const q =
        r.id.toLowerCase().includes(query.toLowerCase()) ||
        r.guest.toLowerCase().includes(query.toLowerCase());
      const rt = roomType === "All Room Types" || r.roomType === roomType;
      const st = status === "All Status" || r.status === (status as any);
      const so = source === "All Sources" || r.source === (source as any);
      return q && rt && st && so;
    });
  }, [query, roomType, status, source]);

  const clearAll = () => {
    setQuery("");
    setDateRange("All Dates");
    setRoomType("All Room Types");
    setStatus("All Status");
    setSource("Website");
  };

  return (
    <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
      {/* Header */}
      <div className="p-6 pb-4">
        <h1 className="text-xl font-semibold text-gray-900">Reservations</h1>
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
                <option>Pre‑Check‑In</option>
                <option>Completed</option>
                <option>Checked‑In</option>
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
                <option>Walk‑in</option>
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
              <tr className="text-left text-gray-500 text-xs">
                <th className="py-3 font-medium">Reservation ID</th>
                <th className="py-3 font-medium">Guest Name</th>
                <th className="py-3 font-medium">Dates</th>
                <th className="py-3 font-medium">Room Type</th>
                <th className="py-3 font-medium">Status</th>
                <th className="py-3 font-medium">Payment</th>
                <th className="py-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r, idx) => {
                const statusStyle = STATUS_STYLES[r.status];
                const payStyle = PAYMENT_STYLES[r.payment];
                return (
                  <tr
                    key={idx}
                    className="border-t border-gray-100 text-gray-700"
                  >
                    <td className="py-4">{r.id}</td>
                    <td className="py-4">{r.guest}</td>
                    <td className="py-4">{r.dates}</td>
                    <td className="py-4">{r.roomType}</td>
                    <td className="py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${statusStyle.bg} ${statusStyle.text}`}
                      >
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${statusStyle.dot}`}
                        />
                        {r.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <span
                        className={`inline-flex rounded-md px-2 py-1 text-xs font-medium ${payStyle.bg} ${payStyle.text}`}
                      >
                        {r.payment}
                      </span>
                    </td>
                    {/* Make cell relative + overflow-visible so menu isn't clipped */}
                    <td className="py-4 relative overflow-visible">
                      <RowActions
                        onView={() =>
                          router.push(
                            `/admin/dashboard/sidescreens/reservations/${r.id}`
                          )
                        }
                        onEdit={() =>
                          router.push(
                            `/admin/dashboard/sidescreens/reservations/${r.id}/edit`
                          )
                        }
                        onCancel={() => {
                          // plug your cancel modal/action here
                          // setCancelTarget(r.id); setCancelOpen(true);
                          console.log("Cancel", r.id);
                        }}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-xs text-gray-500">Showing 1–10 from 100</p>
          <div className="flex items-center gap-1">
            <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
              ‹
            </button>
            {["1", "2", "3", "4", "5"].map((p) => (
              <button
                key={p}
                className={`h-7 w-7 rounded-md border text-xs ${
                  p === "1"
                    ? "bg-[#A57865] text-white"
                    : "border-gray-200 shadow-sm text-gray-700 hover:bg-gray-50"
                }`}
              >
                {p}
              </button>
            ))}
            <button className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50">
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
