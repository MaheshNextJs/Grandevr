// "use client";

// import { useState } from "react";
// import Image from "next/image";

// const SCHEDULE = [
//   {
//     date: "Mon Sept 27",
//     shift: "Morning",
//     time: "7 AM – 3 PM",
//     duties: "Rooms 101–105, Lobby Check",
//   },
//   {
//     date: "Tue Sept 28",
//     shift: "Morning",
//     time: "7 AM – 3 PM",
//     duties: "Rooms 101–105, Lobby Check",
//   },
//   {
//     date: "Wed Sept 29",
//     shift: "Morning",
//     time: "7 AM – 3 PM",
//     duties: "Rooms 101–105, Lobby Check",
//   },
//   {
//     date: "Thu Sept 30",
//     shift: "Off Duty",
//   },
//   {
//     date: "Fri Oct 1",
//     shift: "Morning",
//     time: "7 AM – 3 PM",
//     duties: "Rooms 101–105, Lobby Check",
//   },
// ];

// export default function MySchedulePage() {
//   const [tab, setTab] = useState<"Week" | "Day">("Week");

//   return (
//     <div className="space-y-6">
//       {/* Breadcrumb + Title */}
//       <div className="text-xs text-gray-500">Dashboard ▸ My Schedule</div>
//       <h1 className="text-lg font-semibold text-gray-900">My Schedule</h1>

//       {/* Tabs */}
//       <div className="rounded-md border border-gray-200 bg-white p-3">
//         <div className="flex gap-2">
//           {["Week", "Day"].map((label) => (
//             <button
//               key={label}
//               onClick={() => setTab(label as "Week" | "Day")}
//               className={`rounded px-4 py-1.5 text-sm font-medium ${
//                 tab === label
//                   ? "bg-[#FDF6F3] text-[#A57865]"
//                   : "bg-white text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Weekly Schedule */}
//       <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4">
//         {SCHEDULE.map((item) => (
//           <div
//             key={item.date}
//             className="flex flex-col border-b border-gray-200 last:border-b-0 pb-4 mb-2"
//           >
//             {/* <div className="flex items-stretch"> */}
//             {/* <div className="flex items-stretch min-h-[80px]"> */}
//             <div className="flex items-center min-h-[80px]">
//               {/* Left: Icon + Date with full-height vertical border */}
//               <div className="w-[140px] pr-4 border-r border-gray-200 flex items-start">
//                 <Image
//                   src="/icons/staff/cal2.png"
//                   alt="Calendar icon"
//                   width={20}
//                   height={20}
//                   className="mt-0.5"
//                 />
//                 <div className="ml-2 font-medium text-sm text-gray-900">
//                   {item.date}
//                 </div>
//               </div>

//               {/* Right: Shift details */}
//               <div className="pl-5 flex-1 text-sm pt-1 text-gray-900">
//                 {item.shift === "Off Duty" ? (
//                   <div className="text-gray-500 text-[13px]">Off Duty</div>
//                 ) : (
//                   <div className="space-y-1  text-gray-700">
//                     <div className="text-[13px]">
//                       <span className="font-semibold text-gray-800">
//                         Shift:{" "}
//                       </span>
//                       {item.shift}
//                     </div>
//                     <div className="text-[13px]">
//                       <span className="font-semibold text-gray-800">
//                         Time:{" "}
//                       </span>
//                       {item.time}
//                     </div>
//                     <div className="text-[13px]">
//                       <span className="font-semibold text-gray-800">
//                         Duties:{" "}
//                       </span>
//                       {item.duties}
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// app/staff/dashboard/sidescreens/myschedule/page.tsx
"use client";

import { useState } from "react";
import Image from "next/image";

type Item = {
  id: string; // ✅ added
  date: string;
  shift: "Morning" | "Off Duty";
  time?: string;
  duties?: string;
};

const SCHEDULE: Item[] = [
  {
    id: "1",
    date: "Mon Sept 27",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
  {
    id: "2",
    date: "Tue Sept 28",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
  {
    id: "3",
    date: "Wed Sept 29",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
  { id: "4", date: "Thu Sept 30", shift: "Off Duty" },
  {
    id: "5",
    date: "Fri Oct 1",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
  { id: "6", date: "Thu Sept 30", shift: "Off Duty" },
  {
    id: "7",
    date: "Fri Oct 1",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
  {
    id: "8",
    date: "Fri Oct 1",
    shift: "Morning",
    time: "7 AM – 3 PM",
    duties: "Rooms 101–105, Lobby Check",
  },
];

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-[13px] text-gray-700">
      <span className="font-semibold text-gray-800">{label}: </span>
      {value}
    </div>
  );
}

export default function MySchedulePage() {
  const [tab, setTab] = useState<"Week" | "Day">("Week");

  return (
    <div className="space-y-6">
      {/* Breadcrumb + Title */}
      <div className="text-xs text-gray-500">Dashboard ▸ My Schedule</div>
      <h1 className="text-lg font-semibold text-gray-900">My Schedule</h1>

      {/* Tabs */}
      <div className="rounded-md border border-gray-200 bg-white p-3">
        <div className="flex gap-2">
          {(["Week", "Day"] as const).map((label) => (
            <button
              key={label}
              onClick={() => setTab(label)}
              className={`rounded px-4 py-1.5 text-sm font-medium transition ${
                tab === label
                  ? "bg-[#FDF6F3] text-[#A57865]"
                  : "bg-white text-gray-700 hover:bg-gray-50"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      {tab === "Week" ? (
        /* ----------------------- WEEK VIEW (list) ----------------------- */
        <div className="space-y-4 rounded-md border border-gray-200 bg-white p-4">
          {SCHEDULE.map((item) => (
            <div
              key={`week-${item.id}`}
              className="flex flex-col border-b border-gray-200 last:border-b-0 pb-4 mb-2"
            >
              {/* Row: make divider full height and keep right side vertically centered */}
              <div className="flex items-stretch min-h-[88px]">
                {/* Left: Icon + Date with vertical divider */}
                <div className="w-[160px] pr-4 border-r border-gray-200 flex items-center">
                  <Image
                    src="/icons/staff/cal2.png"
                    alt="Calendar icon"
                    width={20}
                    height={20}
                  />
                  <div className="ml-2 font-medium text-sm text-gray-900">
                    {item.date}
                  </div>
                </div>

                {/* Right: details (centered vertically) */}
                <div className="pl-5 flex-1 text-sm text-gray-900 flex flex-col justify-center">
                  {item.shift === "Off Duty" ? (
                    <div className="text-gray-500 text-[13px]">Off Duty</div>
                  ) : (
                    <div className="space-y-1">
                      <InfoRow label="Shift" value={item.shift} />
                      <InfoRow label="Time" value={item.time!} />
                      <InfoRow label="Duties" value={item.duties!} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* ------------------------ DAY VIEW (grid) ------------------------ */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {SCHEDULE.map((item) => (
            <div
              key={`card-${item.id}`}
              className="rounded-md border border-gray-200 bg-white p-4 hover:shadow-sm transition"
            >
              {/* Card header: icon + date */}
              <div className="flex items-center gap-2">
                <Image
                  src="/icons/staff/cal2.png"
                  alt="Calendar icon"
                  width={20}
                  height={20}
                />
                <div className="text-[13px] font-semibold text-gray-800">
                  {item.date}
                </div>
              </div>

              {/* Thin divider like your screenshot */}
              <div className="mt-3 border-t border-gray-200" />

              {/* Card body */}
              <div className="mt-3 min-h-[90px] flex flex-col justify-start">
                {item.shift === "Off Duty" ? (
                  <div className="text-[13px] text-gray-500">Off Duty</div>
                ) : (
                  <div className="space-y-2">
                    <InfoRow label="Shift" value={item.shift} />
                    <InfoRow label="Time" value={item.time!} />
                    <InfoRow label="Duties" value={item.duties!} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
