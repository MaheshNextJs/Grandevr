"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Task, TaskStatus } from "../TaskViewModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
  onSave: (args: { taskId: string; status: TaskStatus; note?: string }) => void;
};

const STATUS_OPTIONS: TaskStatus[] = ["Open", "In Progress", "Resolved"];

export default function TaskUpdateModal({
  isOpen,
  onClose,
  task,
  onSave,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<TaskStatus>("Open");
  const [note, setNote] = useState("");

  // init when task changes / modal opens
  useEffect(() => {
    if (!isOpen || !task) return;
    setStatus(task.status);
    setNote("");
  }, [isOpen, task]);

  // esc / click-outside
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onDoc = (e: MouseEvent) =>
      wrapRef.current &&
      !wrapRef.current.contains(e.target as Node) &&
      onClose();
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onDoc);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onDoc);
    };
  }, [isOpen, onClose]);

  const createdDisplay = useMemo(() => {
    if (!task) return "";
    const d = new Date(task.createdAt);
    return isNaN(d.getTime())
      ? task.createdAt
      : d.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        });
  }, [task?.createdAt]);

  if (!isOpen || !task) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-black/30 p-4">
      <div
        ref={wrapRef}
        className="mt-6 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-lg bg-white shadow-xl border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-[14px] font-medium">Update Task – {task.id}</h2>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        {/* Body (scroll) */}
        <div className="p-4 md:p-5 space-y-4 overflow-y-auto">
          {/* Summary */}
          <div className="rounded-md border border-gray-200">
            <div className="grid grid-cols-1 gap-y-3 px-4 py-4">
              <Row label="Task ID" value={task.id} />
              <Row label="Source" value={task.title} valueClass="text-right" />
              <Row
                label="Priority"
                value={<Badge tone="amber">{task.priority}</Badge>}
              />
              <Row
                label="Status"
                value={<Badge tone="sky">{task.status}</Badge>}
              />
              <Row label="Assigned To" value={task.assignedTo} />
              <Row
                label="Date Created"
                value={createdDisplay}
                valueClass="text-right"
              />
            </div>
          </div>

          {/* Update Status */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3">
              <div className="text-[13px] font-medium text-gray-800 mb-2">
                Update Status
              </div>
              <div className="relative">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as TaskStatus)}
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 pr-8 text-sm"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Add note */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3">
              <div className="text-[13px] font-medium text-gray-800 mb-2">
                Add Note
              </div>
              <textarea
                rows={6}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Enter here"
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
              />
              <div className="mt-2 flex justify-end">
                <button
                  className="rounded-md border border-gray-300 bg-white px-4 py-1.5 text-sm text-gray-700 hover:bg-gray-50"
                  onClick={() => setNote((n) => n.trim())}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 px-4 py-3">
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() =>
              onSave({
                taskId: task.id,
                status,
                note: note.trim() || undefined,
              })
            }
          >
            Save Update
          </button>
        </div>
      </div>
    </div>
  );
}

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

function Badge({
  children,
  tone, // "amber" | "sky" | "emerald" | "rose"
}: {
  children: React.ReactNode;
  tone?: "amber" | "sky" | "emerald" | "rose";
}) {
  const map = {
    amber: "bg-amber-50 text-amber-700",
    sky: "bg-sky-50 text-sky-700",
    emerald: "bg-emerald-50 text-emerald-700",
    rose: "bg-rose-50 text-rose-700",
  } as const;
  return (
    <span
      className={`inline-flex rounded-md px-2 py-0.5 text-xs font-medium ${
        map[tone ?? "emerald"]
      }`}
    >
      {children}
    </span>
  );
}
