"use client";

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

export default function StartTaskModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70]">
      {/* overlay */}
      <div className="absolute inset-0 " onClick={onClose} aria-hidden="true" />
      {/* panel */}
      <div
        role="dialog"
        aria-modal="true"
        className="absolute inset-0 m-auto h-[90vh] w-[min(900px,95vw)] rounded-sm bg-white shadow-xl"
      >
        {/* header */}
        <div className="sticky top-0 z-10 flex items-center justify-between rounded-sm bg-white px-5 py-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Start Task – {task.id}
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
        <div className="px-5">
          <p className="mb-3 text-sm text-gray-800">
            You have marked this task as{" "}
            <span className="font-medium">“In&nbsp;Progress”</span>.
          </p>

          <div className="rounded border border-gray-200">
            <dl className="grid grid-cols-[160px_1fr] gap-y-4 px-4 py-3 text-xs text-gray-700">
              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Task ID</dt>
                <dd className="text-right">{task.id}</dd>
              </div>

              <div className="contents border-b border-gray-100 last:border-0 py-2">
                <dt className="text-gray-500">Description</dt>
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

              <div className="contents">
                <dt className="text-gray-500">Assigned By</dt>
                <dd className="text-right">Admin (John Manager)</dd>
              </div>
            </dl>
            <div className="px-4 pb-3 text-center text-[11px] text-gray-500">
              Task is now{" "}
              <span className="font-medium text-amber-700">In Progress</span>.
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="sticky bottom-0 z-10 flex items-center justify-end bg-white px-5 py-3">
          <button
            onClick={onClose}
            className="rounded bg-[#A57865] px-4 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
