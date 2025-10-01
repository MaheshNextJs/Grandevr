// // "use client";

// // import { useState } from "react";
// // import type { Task } from "@/app/staff/dashboard/sidescreens/mytask/data";

// // function Badge({
// //   tone,
// //   children,
// // }: {
// //   tone: "rose" | "amber" | "emerald" | "zinc" | "sky";
// //   children: React.ReactNode;
// // }) {
// //   const map = {
// //     rose: "bg-rose-50 text-rose-700",
// //     amber: "bg-amber-50 text-amber-700",
// //     emerald: "bg-emerald-50 text-emerald-700",
// //     zinc: "bg-zinc-50 text-zinc-600",
// //     sky: "bg-sky-50 text-sky-700",
// //   } as const;
// //   return (
// //     <span
// //       className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[tone]}`}
// //     >
// //       {children}
// //     </span>
// //   );
// // }

// // export default function TaskDetailModal({
// //   task,
// //   onClose,
// // }: {
// //   task: Task;
// //   onClose: () => void;
// // }) {
// //   const [updStatus, setUpdStatus] = useState(
// //     Array.isArray(task.status) ? task.status[0] : task.status
// //   );
// //   const [note, setNote] = useState("");

// //   return (
// //     <div className="fixed inset-0 z-50">
// //       {/* overlay */}
// //       <div
// //         className="absolute inset-0 bg-black/40"
// //         onClick={onClose}
// //         aria-hidden="true"
// //       />
// //       {/* panel */}
// //       <div
// //         role="dialog"
// //         aria-modal="true"
// //         className="absolute inset-0 m-auto h-[90vh] w-[min(900px,95vw)] rounded-sm bg-white shadow-xl"
// //       >
// //         {/* header (sticky) */}
// //         <div className="sticky top-0 z-10 flex items-center justify-between rounded-sm bg-white px-5 py-4">
// //           <h3 className="text-sm font-semibold text-gray-900">
// //             Task Detail – {task.id}
// //           </h3>
// //           <button
// //             onClick={onClose}
// //             aria-label="Close"
// //             className="rounded p-1 text-gray-400 hover:bg-gray-50"
// //           >
// //             ✕
// //           </button>
// //         </div>

// //         {/* body (scrollable) */}
// //         <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
// //           {/* top info grid */}
// //           {/* top info grid (labels left, values right) */}
// //           <div className="rounded border border-gray-200">
// //             <dl className="grid grid-cols-[160px_1fr] gap-y-4 px-4 py-3 text-xs text-gray-700">
// //               {/* Row */}
// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Task ID</dt>
// //                 <dd className="text-right">{task.id}</dd>
// //               </div>

// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Assigned Duty</dt>
// //                 <dd className="text-right">Clean Room 101</dd>
// //               </div>

// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Source</dt>
// //                 <dd className="text-right">{task.source}</dd>
// //               </div>

// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Priority</dt>
// //                 <dd className="flex justify-end">
// //                   {task.priority === "High" && <Badge tone="rose">High</Badge>}
// //                   {task.priority === "Medium" && (
// //                     <Badge tone="amber">Medium</Badge>
// //                   )}
// //                   {task.priority === "Low" && <Badge tone="sky">Low</Badge>}
// //                 </dd>
// //               </div>

// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Status</dt>
// //                 <dd className="flex justify-end">
// //                   {Array.isArray(task.status) ? (
// //                     <div className="flex gap-2">
// //                       <Badge tone="amber">In Progress</Badge>
// //                     </div>
// //                   ) : task.status === "Completed" ? (
// //                     <Badge tone="emerald">Completed</Badge>
// //                   ) : task.status === "Active" ? (
// //                     <Badge tone="emerald">Active</Badge>
// //                   ) : task.status === "Open" ? (
// //                     <Badge tone="zinc">Open</Badge>
// //                   ) : (
// //                     <Badge tone="amber">In Progress</Badge>
// //                   )}
// //                 </dd>
// //               </div>

// //               <div className="contents border-b border-gray-100 last:border-0 py-2">
// //                 <dt className="text-gray-500">Assigned By</dt>
// //                 <dd className="text-right">Admin (John Manager)</dd>
// //               </div>

// //               <div className="contents py-2">
// //                 <dt className="text-gray-500">Date Assigned</dt>
// //                 <dd className="text-right">Sept 21, 2025</dd>
// //               </div>
// //             </dl>
// //           </div>

// //           {/* Description */}
// //           <div className="rounded border border-gray-200">
// //             <div className=" px-4 py-2 text-[14px] text-gray-700">
// //               Description
// //             </div>
// //             <div className="px-4 py-3 text-xs text-gray-700">
// //               Room was not cleaned properly when I checked in. Housekeeping was
// //               slow to respond.
// //             </div>

// //             <div className="px-4 py-2 text-xs font-medium text-gray-700">
// //               Notes History:
// //             </div>
// //             <div className="space-y-4 px-4 py-5  text-[11px] text-gray-700">
// //               <p>[Sept 27, 10:00 AM] Assigned by Admin</p>
// //               <p>Sept 21 – Supervisor: Investigating housekeeping logs</p>
// //             </div>
// //           </div>

// //           {/* Update Status & Add Note */}
// //           <div className="rounded border border-gray-200">
// //             <div className=" px-4 py-2 text-xs font-medium text-gray-700">
// //               Update Status
// //             </div>
// //             <div className="px-4 py-3">
// //               <div className="relative w-full">
// //                 <select
// //                   value={updStatus}
// //                   onChange={(e) => setUpdStatus(e.target.value as any)}
// //                   className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-xs text-gray-700"
// //                 >
// //                   <option>Open</option>
// //                   <option>In Progress</option>
// //                   <option>Resolved</option>
// //                   <option>Completed</option>
// //                 </select>
// //                 <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
// //                   ▾
// //                 </span>
// //               </div>

// //               <div className="mt-4">
// //                 <div className="mb-1 text-xs font-medium text-gray-700">
// //                   Add Note
// //                 </div>
// //                 <textarea
// //                   value={note}
// //                   onChange={(e) => setNote(e.target.value)}
// //                   placeholder="Enter here"
// //                   className="h-28 w-full rounded-md border border-gray-300 p-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-gray-100"
// //                 />
// //               </div>
// //             </div>
// //           </div>
// //         </div>

// //         {/* footer (sticky) */}
// //         <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-white px-5 py-3">
// //           <button
// //             onClick={onClose}
// //             className="rounded border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
// //           >
// //             Close
// //           </button>
// //           <button
// //             onClick={() => {
// //               // TODO: save updStatus + note
// //               onClose();
// //             }}
// //             className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// "use client";

// import { useState } from "react";
// import type { Task } from "@/app/staff/dashboard/sidescreens/mytask/data";

// function Badge({
//   tone,
//   children,
// }: {
//   tone: "rose" | "amber" | "emerald" | "zinc" | "sky";
//   children: React.ReactNode;
// }) {
//   const map = {
//     rose: "bg-rose-50 text-rose-700",
//     amber: "bg-amber-50 text-amber-700",
//     emerald: "bg-emerald-50 text-emerald-700",
//     zinc: "bg-zinc-50 text-zinc-600",
//     sky: "bg-sky-50 text-sky-700",
//   } as const;
//   return (
//     <span
//       className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[tone]}`}
//     >
//       {children}
//     </span>
//   );
// }

// export default function TaskDetailModal({
//   task,
//   onClose,
//   onSaved, // call this to show the success modal outside
// }: {
//   task: Task;
//   onClose: () => void;
//   onSaved?: (payload: { status: string; note: string }) => void;
// }) {
//   const [updStatus, setUpdStatus] = useState(
//     Array.isArray(task.status) ? task.status[0] : task.status
//   );
//   const [note, setNote] = useState("");

//   return (
//     <div className="fixed inset-0 z-50">
//       {/* overlay */}
//       <div
//         className="absolute inset-0 bg-black/40"
//         onClick={onClose}
//         aria-hidden="true"
//       />
//       {/* panel */}
//       <div
//         role="dialog"
//         aria-modal="true"
//         className="absolute inset-0 m-auto h-[90vh] w-[min(900px,95vw)] rounded-sm bg-white shadow-xl"
//       >
//         {/* header (sticky) */}
//         <div className="sticky top-0 z-10 flex items-center justify-between rounded-sm bg-white px-5 py-4">
//           <h3 className="text-sm font-semibold text-gray-900">
//             Task Detail – {task.id}
//           </h3>
//           <button
//             onClick={onClose}
//             aria-label="Close"
//             className="rounded p-1 text-gray-400 hover:bg-gray-50"
//           >
//             ✕
//           </button>
//         </div>

//         {/* body (scrollable) */}
//         <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
//           {/* top info grid */}
//           <div className="rounded border border-gray-200">
//             <dl className="grid grid-cols-[160px_1fr] gap-y-4 px-4 py-3 text-xs text-gray-700">
//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Task ID</dt>
//                 <dd className="text-right">{task.id}</dd>
//               </div>

//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Assigned Duty</dt>
//                 <dd className="text-right">Clean Room 101</dd>
//               </div>

//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Source</dt>
//                 <dd className="text-right">{task.source}</dd>
//               </div>

//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Priority</dt>
//                 <dd className="flex justify-end">
//                   {task.priority === "High" && <Badge tone="rose">High</Badge>}
//                   {task.priority === "Medium" && (
//                     <Badge tone="amber">Medium</Badge>
//                   )}
//                   {task.priority === "Low" && <Badge tone="sky">Low</Badge>}
//                 </dd>
//               </div>

//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Status</dt>
//                 <dd className="flex justify-end">
//                   {Array.isArray(task.status) ? (
//                     <div className="flex gap-2">
//                       <Badge tone="amber">In Progress</Badge>
//                     </div>
//                   ) : task.status === "Completed" ? (
//                     <Badge tone="emerald">Completed</Badge>
//                   ) : task.status === "Active" ? (
//                     <Badge tone="emerald">Active</Badge>
//                   ) : task.status === "Open" ? (
//                     <Badge tone="zinc">Open</Badge>
//                   ) : (
//                     <Badge tone="amber">In Progress</Badge>
//                   )}
//                 </dd>
//               </div>

//               <div className="contents border-b border-gray-100 last:border-0 py-2">
//                 <dt className="text-gray-500">Assigned By</dt>
//                 <dd className="text-right">Admin (John Manager)</dd>
//               </div>

//               <div className="contents py-2">
//                 <dt className="text-gray-500">Date Assigned</dt>
//                 <dd className="text-right">Sept 21, 2025</dd>
//               </div>
//             </dl>
//           </div>

//           {/* Description */}
//           <div className="rounded border border-gray-200">
//             <div className=" px-4 py-2 text-[14px] text-gray-700">
//               Description
//             </div>
//             <div className="px-4 py-3 text-xs text-gray-700">
//               Room was not cleaned properly when I checked in. Housekeeping was
//               slow to respond.
//             </div>

//             <div className="px-4 py-2 text-xs font-medium text-gray-700">
//               Notes History:
//             </div>
//             <div className="space-y-4 px-4 py-5  text-[11px] text-gray-700">
//               <p>[Sept 27, 10:00 AM] Assigned by Admin</p>
//               <p>Sept 21 – Supervisor: Investigating housekeeping logs</p>
//             </div>
//           </div>

//           {/* Update Status & Add Note */}
//           <div className="rounded border border-gray-200">
//             <div className=" px-4 py-2 text-xs font-medium text-gray-700">
//               Update Status
//             </div>
//             <div className="px-4 py-3">
//               <div className="relative w-full">
//                 <select
//                   value={updStatus}
//                   onChange={(e) => setUpdStatus(e.target.value as any)}
//                   className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-xs text-gray-700"
//                 >
//                   <option>Open</option>
//                   <option>In Progress</option>
//                   <option>Resolved</option>
//                   <option>Completed</option>
//                 </select>
//                 <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
//                   ▾
//                 </span>
//               </div>

//               <div className="mt-4">
//                 <div className="mb-1 text-xs font-medium text-gray-700">
//                   Add Note
//                 </div>
//                 <textarea
//                   value={note}
//                   onChange={(e) => setNote(e.target.value)}
//                   placeholder="Enter here"
//                   className="h-28 w-full rounded-md border border-gray-300 p-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-gray-100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* footer (sticky) */}
//         <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-white px-5 py-3">
//           <button
//             onClick={onClose}
//             className="rounded border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
//           >
//             Close
//           </button>
//           {/* <button
//             onClick={() => {
//               // persist if needed, then signal success
//               onSaved?.({ status: String(updStatus), note });
//             }}
//             className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
//           >
//             Save
//           </button> */}
//           <button
//             onClick={() => {
//               onSaved?.({ status: String(updStatus), note });
//             }}
//             className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
//           >
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState } from "react";
import type { Task } from "@/app/staff/dashboard/sidescreens/mytask/data";

function Badge({
  tone,
  children,
}: {
  tone: "rose" | "amber" | "emerald" | "zinc" | "sky";
  children: React.ReactNode;
}) {
  const map = {
    rose: "bg-rose-50 text-rose-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    zinc: "bg-zinc-50 text-zinc-600",
    sky: "bg-sky-50 text-sky-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export default function TaskDetailModal({
  task,
  onClose,
  onSaved, // optional: informs parent something was saved
  onCloseAll, // optional: closes "all modals" if you still have a wrapper
}: {
  task: Task;
  onClose: () => void;
  onSaved?: (payload: { status: string; note: string }) => void;
  onCloseAll?: () => void;
}) {
  const [updStatus, setUpdStatus] = useState(
    Array.isArray(task.status) ? task.status[0] : task.status
  );
  const [note, setNote] = useState("");

  // When true, we hide the Update section + Save button (read-only "success" state)
  const [readonly, setReadonly] = useState(false);

  const handleClose = () => {
    // If parent provided a way to close everything, use it; else just close this modal
    (onCloseAll ?? onClose)();
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={handleClose}
        aria-hidden="true"
      />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 m-auto h-[90vh] w-[min(900px,95vw)] rounded-sm bg-white shadow-xl"
      >
        {/* header (sticky) */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-sm bg-white px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Task Detail – {task.id}
          </h3>
          <button
            onClick={handleClose}
            aria-label="Close"
            className="rounded p-1 text-gray-400 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>

        {/* body (scrollable) */}
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
          {/* top info grid */}
          <div className="rounded border border-gray-200">
            <dl className="grid grid-cols-[160px_1fr] gap-y-4 px-4 py-3 text-xs text-gray-700">
              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Task ID</dt>
                <dd className="text-right">{task.id}</dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Assigned Duty</dt>
                <dd className="text-right">Clean Room 101</dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Source</dt>
                <dd className="text-right">{task.source}</dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Priority</dt>
                <dd className="flex justify-end">
                  {task.priority === "High" && <Badge tone="rose">High</Badge>}
                  {task.priority === "Medium" && (
                    <Badge tone="amber">Medium</Badge>
                  )}
                  {task.priority === "Low" && <Badge tone="sky">Low</Badge>}
                </dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Status</dt>
                <dd className="flex justify-end">
                  {Array.isArray(task.status) ? (
                    <div className="flex gap-2">
                      <Badge tone="amber">In Progress</Badge>
                    </div>
                  ) : task.status === "Completed" ? (
                    <Badge tone="emerald">Completed</Badge>
                  ) : task.status === "Active" ? (
                    <Badge tone="emerald">Active</Badge>
                  ) : task.status === "Open" ? (
                    <Badge tone="zinc">Open</Badge>
                  ) : (
                    <Badge tone="amber">In Progress</Badge>
                  )}
                </dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Assigned By</dt>
                <dd className="text-right">Admin (John Manager)</dd>
              </div>

              <div className="contents py-2">
                <dt className="text-gray-500">Date Assigned</dt>
                <dd className="text-right">Sept 21, 2025</dd>
              </div>
            </dl>
          </div>

          {/* Description */}
          <div className="rounded border border-gray-200">
            <div className=" px-4 py-2 text-[14px] text-gray-700">
              Description
            </div>
            <div className="px-4 py-3 text-xs text-gray-700">
              Room was not cleaned properly when I checked in. Housekeeping was
              slow to respond.
            </div>

            <div className="px-4 py-2 text-xs font-medium text-gray-700">
              Notes History:
            </div>
            <div className="space-y-4 px-4 py-5  text-[11px] text-gray-700">
              <p>[Sept 27, 10:00 AM] Assigned by Admin</p>
              <p>Sept 21 – Supervisor: Investigating housekeeping logs</p>
            </div>
          </div>

          {/* Update Status & Add Note (HIDDEN in read-only mode) */}
          {!readonly && (
            <div className="rounded border border-gray-200">
              <div className=" px-4 py-2 text-xs font-medium text-gray-700">
                Update Status
              </div>
              <div className="px-4 py-3">
                <div className="relative w-full">
                  <select
                    value={updStatus}
                    onChange={(e) => setUpdStatus(e.target.value as any)}
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-xs text-gray-700"
                  >
                    <option>Open</option>
                    <option>In Progress</option>
                    <option>Resolved</option>
                    <option>Completed</option>
                  </select>
                  <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                    ▾
                  </span>
                </div>

                <div className="mt-4">
                  <div className="mb-1 text-xs font-medium text-gray-700">
                    Add Note
                  </div>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Enter here"
                    className="h-28 w-full rounded-md border border-gray-300 p-3 text-xs text-gray-800 outline-none focus:ring-2 focus:ring-gray-100"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* footer (sticky) */}

        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-white px-5 py-3">
          <button
            onClick={handleClose}
            className={`rounded px-4 py-2 text-xs font-medium ${
              readonly
                ? "bg-[#A57865] text-white hover:opacity-95 active:opacity-90"
                : "border border-gray-200 bg-white text-gray-700 hover:bg-gray-50"
            }`}
          >
            Close
          </button>

          {!readonly && (
            <button
              onClick={() => {
                onSaved?.({ status: String(updStatus), note });
                setReadonly(true); // switch to read-only view
              }}
              className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
