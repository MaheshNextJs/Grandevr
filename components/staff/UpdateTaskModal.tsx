"use client";

import { useState, useMemo } from "react";
import type { Task } from "@/app/staff/dashboard/sidescreens/mytask/data";

/* ---------- Allowed statuses (typed union) ---------- */
const STATUSES = [
  "Open",
  "In Progress",
  "Resolved",
  "Completed",
  "Active",
] as const;
type Status = (typeof STATUSES)[number];

function isStatus(v: string): v is Status {
  return (STATUSES as readonly string[]).includes(v);
}

/* ---------- UI helpers ---------- */
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

/* ---------- Modal ---------- */
export default function UpdateTaskModal({
  task,
  onClose,
  onSave,
}: {
  task: Task;
  onClose: () => void;
  onSave?: (payload: { status: Status; note: string }) => void;
}) {
  const initialStatus = useMemo<Status>(() => {
    const raw = Array.isArray(task.status)
      ? task.status[0]
      : task.status ?? "Open";
    // fall back safely if incoming value is not in our union
    return isStatus(raw) ? raw : "Open";
  }, [task.status]);

  const [status, setStatus] = useState<Status>(initialStatus);
  const [note, setNote] = useState("");

  return (
    <div className="fixed inset-0 z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 m-auto h-[90vh] w-[min(900px,95vw)] rounded-sm bg-white shadow-xl"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-sm bg-white px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Task Detail – {task.id}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="rounded p-1 text-gray-400 hover:bg-gray-50"
          >
            ✕
          </button>
        </div>

        {/* body */}
        <div className="max-h-[70vh] overflow-y-auto px-5 py-4 space-y-4">
          {/* top info grid */}
          <div className="rounded border border-gray-200">
            <dl className="grid grid-cols-[160px_1fr] gap-y-4 px-4 py-3 text-xs text-gray-700">
              <div className="contents border-b border-gray-100 py-2">
                <dt className="text-gray-500">Task ID</dt>
                <dd className="text-right">{task.id}</dd>
              </div>

              <div className="contents border-b border-gray-100 py-2">
                <dt className="text-gray-500">Assigned Duty</dt>
                <dd className="text-right">Check AC – Room 210</dd>
              </div>

              <div className="contents border-b border-gray-100 py-2">
                <dt className="text-gray-500">Source</dt>
                <dd className="text-right">{task.source}</dd>
              </div>

              <div className="contents border-b border-gray-100 py-2">
                <dt className="text-gray-500">Priority</dt>
                <dd className="flex justify-end">
                  {task.priority === "High" && <Badge tone="rose">High</Badge>}
                  {task.priority === "Medium" && (
                    <Badge tone="amber">Medium</Badge>
                  )}
                  {task.priority === "Low" && <Badge tone="sky">Low</Badge>}
                </dd>
              </div>

              <div className="contents py-2">
                <dt className="text-gray-500">Status</dt>
                <dd className="flex justify-end">
                  {status === "Completed" ? (
                    <Badge tone="emerald">Completed</Badge>
                  ) : status === "Open" ? (
                    <Badge tone="zinc">Open</Badge>
                  ) : status === "Resolved" ? (
                    <Badge tone="emerald">Resolved</Badge>
                  ) : (
                    <Badge tone="amber">In Progress</Badge>
                  )}
                </dd>
              </div>
            </dl>
          </div>

          {/* Update Status */}
          <div className="rounded border border-gray-200">
            <div className="px-4 py-2 text-xs font-medium text-gray-700">
              Update Status
            </div>
            <div className="px-4 py-3">
              <div className="relative w-full">
                <select
                  value={status}
                  onChange={(e) => {
                    const v = e.target.value;
                    if (isStatus(v)) setStatus(v);
                  }}
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-xs text-gray-700"
                >
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
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
        </div>

        {/* footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end gap-2 bg-white px-5 py-3">
          <button
            onClick={onClose}
            className="rounded border border-gray-200 bg-white px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onSave?.({ status, note });
              onClose();
            }}
            className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
}
