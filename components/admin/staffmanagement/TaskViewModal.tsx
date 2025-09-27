"use client";

import { useEffect, useMemo, useRef, useState } from "react";

export type TaskPriority = "High" | "Medium" | "Low";
export type TaskStatus = "Open" | "In Progress" | "Resolved";

export type Task = {
  id: string;
  title: string;
  source: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string;
  createdBy: string;
  createdAt: string; // ISO or display date
  description: string;
  notes: { when: string; text: string }[];
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onAddNote?: (taskId: string, note: string) => void;
  onReassign?: (taskId: string) => void;
  onResolve?: (taskId: string) => void;
};

export default function TaskViewModal({
  isOpen,
  onClose,
  task,
  onAddNote,
  onReassign,
  onResolve,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [note, setNote] = useState("");
  const [resolvedOpen, setResolvedOpen] = useState(false);
  const [resolvedTaskId, setResolvedTaskId] = useState<string | undefined>();
  // close on ESC and click outside
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onMouse = (e: MouseEvent) =>
      wrapRef.current &&
      !wrapRef.current.contains(e.target as Node) &&
      onClose();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onMouse);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onMouse);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setNote("");
  }, [isOpen]);

  // call hooks unconditionally; guard inside
  const createdDisplay = useMemo(() => {
    if (!task) return "";
    const maybe = new Date(task.createdAt);
    return isNaN(maybe.getTime())
      ? task.createdAt
      : maybe.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  }, [task?.createdAt]);

  // early return AFTER hooks
  if (!isOpen || !task) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-start justify-center bg-black/30 p-4"
    >
      <div
        ref={wrapRef}
        className="mt-6 w-full max-w-4xl max-h-[90vh] flex flex-col rounded-lg bg-white shadow-xl border border-gray-200"
      >
        {/* Header */}
        {/* <div className="flex items-center justify-between px-5 py-3 border-b"> */}
        <div className="flex items-center justify-between px-5 py-3  flex-none">
          <h2 className="text-[14px] font-medium">
            Escalated Review ({task.id})
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div
          className="p-4 md:p-5 space-y-4 overflow-y-auto"
          style={{ WebkitOverflowScrolling: "touch" }} // smooth on iOS
        >
          {/* Top summary card */}
          <div className="rounded-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-1 gap-y-4 px-4 py-4">
              <Row label="Task ID" value={task.id} />
              <Row
                label="Source"
                value={task.title}
                valueClass="text-right text-gray-900"
              />
              <Row
                label="Priority"
                value={<PriorityBadge v={task.priority} />}
              />
              <Row label="Status" value={<StatusBadge v={task.status} />} />
            </div>
          </div>
          <div className="grid grid-cols-1 border border-gray-200 shadow-sm rounded-md md:grid-cols-1 gap-y-4 px-4 py-4">
            <Row label="Assigned To" value={task.assignedTo} />
            <Row
              label="Created By"
              value={task.createdBy}
              valueClass="text-right"
            />
            <Row
              label="Date Created"
              value={createdDisplay}
              valueClass="text-right"
            />
          </div>
          {/* Description */}
          <Section title="Description">
            <p className="text-[13px] text-gray-700">{task.description}</p>
          </Section>

          {/* Notes */}
          <Section title="Notes">
            <div className="space-y-3">
              {task.notes.length === 0 ? (
                <p className="text-[13px] text-gray-500">No notes yet.</p>
              ) : (
                task.notes.map((n, idx) => (
                  <div key={idx} className="text-[13px] text-gray-700">
                    <span className="text-gray-500">{n.when} – </span>
                    {n.text}
                  </div>
                ))
              )}

              <div className="pt-2">
                <div className="text-[12px] text-gray-600 mb-2">Add Note</div>
                <textarea
                  rows={5}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Enter here"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
                />
                <div className="mt-2 flex justify-end">
                  <button
                    onClick={() => {
                      if (!note.trim()) return;
                      onAddNote?.(task.id, note.trim());
                      setNote("");
                    }}
                    className="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </Section>
        </div>

        {/* Footer */}
        {/* <div className="flex items-center justify-end gap-2 border-t px-4 py-3"> */}
        <div className="flex items-center justify-end gap-2 px-4 py-3 flex-none">
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => onReassign?.(task.id)}
          >
            Reassign Task
          </button>
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() => onResolve?.(task.id)}
          >
            Mark Resolved
          </button>
        </div>
      </div>
    </div>
  );
}

/* ------- Small UI helpers ------- */

function Row({
  label,
  value,
  valueClass = "",
}: {
  label: string;
  value: React.ReactNode;
  valueClass?: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="text-[11px] text-gray-500">{label}</div>
      <div className={`text-[13px] text-gray-900 ${valueClass}`}>{value}</div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-md border border-gray-200">
      <div className="px-4 py-3">
        <div className="text-[13px] font-medium text-gray-800 mb-2">
          {title}
        </div>
        {children}
      </div>
    </div>
  );
}

function PriorityBadge({ v }: { v: TaskPriority }) {
  const map: Record<TaskPriority, string> = {
    High: "bg-rose-50 text-rose-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${map[v]}`}
    >
      {v}
    </span>
  );
}

function StatusBadge({ v }: { v: TaskStatus }) {
  const map: Record<TaskStatus, string> = {
    Open: "bg-amber-50 text-amber-700",
    "In Progress": "bg-sky-50 text-sky-700",
    Resolved: "bg-emerald-50 text-emerald-700",
  };
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${map[v]}`}
    >
      {v}
    </span>
  );
}
