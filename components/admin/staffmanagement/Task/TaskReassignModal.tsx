"use client";

import { useEffect, useRef, useState } from "react";

export type ReassignPayload = {
  assignee: string;
  priority: "High" | "Medium" | "Low";
  notes?: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (payload: ReassignPayload) => void;

  taskId?: string;
  currentAssignee?: string;
  currentPriority?: "High" | "Medium" | "Low";
};

const ASSIGNEES = [
  "Front Desk Manager",
  "Housekeeping Supervisor",
  "Maintenance Team",
  "Concierge Lead",
];

export default function TaskReassignModal({
  isOpen,
  onClose,
  onConfirm,
  taskId = "—",
  currentAssignee = "—",
  currentPriority = "Low",
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [assignee, setAssignee] = useState(ASSIGNEES[0]);
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">(
    currentPriority
  );
  const [notes, setNotes] = useState("");

  // open/close reset
  useEffect(() => {
    if (!isOpen) return;
    setAssignee(ASSIGNEES[0]);
    setPriority(currentPriority);
    setNotes("");
  }, [isOpen, currentPriority]);

  // esc / outside
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

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/30 p-4"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={wrapRef}
        className="mt-6 w-full max-w-3xl max-h-[90vh] flex flex-col rounded-lg bg-white shadow-xl border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b">
          <h2 className="text-[14px] font-medium">
            Reassign Escalated Review – [Guest Name / Task ID]
          </h2>
          <button
            aria-label="Close"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-4">
          {/* Summary card */}
          <div className="rounded-md border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 px-4 py-4">
              <Row label="Task ID" value={taskId} />
              <Row
                label="Current Assignee"
                value={currentAssignee}
                valueClass="text-right"
              />
            </div>
          </div>

          {/* Reassign to */}
          <Section title="Reassign To">
            <div className="relative">
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
              >
                {ASSIGNEES.map((a) => (
                  <option key={a}>{a}</option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                ▾
              </span>
            </div>
          </Section>

          {/* Priority */}
          <Section title="Priority">
            <div className="space-y-3">
              {(["High", "Medium", "Low"] as const).map((p) => (
                <label
                  key={p}
                  className="flex items-center gap-2 text-sm text-gray-700"
                >
                  <input
                    type="radio"
                    className="h-4 w-4 accent-[#A57865]"
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
          </Section>

          {/* Notes */}
          <Section title="Optional Notes">
            <textarea
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Please check housekeeping logs for Sept 20"
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
            />
          </Section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-4 py-3">
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() =>
              onConfirm({
                assignee,
                priority,
                notes: notes.trim() || undefined,
              })
            }
          >
            Confirm Reassignment
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
