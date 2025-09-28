"use client";
import { useEffect, useState } from "react";

type Assignee =
  | "Front Desk Manager"
  | "Housekeeping Supervisor"
  | "General Manager"
  | "Maintenance Lead";
type Priority = "High" | "Medium" | "Low";

type Props = {
  open: boolean;
  onClose: () => void;
  onEscalate: (data: {
    assignee: Assignee;
    priority: Priority;
    notes: string;
  }) => void;
  summary?: string;
  guestName?: string;
};

export default function EscalateReviewModal({
  open,
  onClose,
  onEscalate,
  summary,
  guestName,
}: Props) {
  const [assignee, setAssignee] = useState<Assignee>("Front Desk Manager");
  const [priority, setPriority] = useState<Priority>("Low");
  const [notes, setNotes] = useState("");

  // reset when opened
  useEffect(() => {
    if (open) {
      setAssignee("Front Desk Manager");
      setPriority("Low");
      setNotes("");
    }
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-60 w-[min(720px,94vw)] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-[15px] font-semibold text-gray-900">
            Escalate Review{guestName ? ` — ${guestName}` : ""}
          </h3>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded-md text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="space-y-6 px-5 py-5">
          {/* Review Summary */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-800">
              Review Summary
            </div>
            <div className="px-4 py-3">
              <textarea
                className="w-full resize-none rounded-md border border-gray-200 p-3 text-sm"
                rows={2}
                readOnly
                value={
                  summary ||
                  `“The room was not cleaned properly when I checked in. Housekeeping was slow to respond.”`
                }
              />
            </div>
          </div>

          {/* Assign To */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-800">
              Assign To
            </div>
            <div className="px-4 py-3">
              <div className="relative">
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-7 py-2 text-sm
             appearance-none focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value as Assignee)}
                >
                  <option>Front Desk Manager</option>
                  <option>Housekeeping Supervisor</option>
                  <option>General Manager</option>
                  <option>Maintenance Lead</option>
                </select>
                <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-500">
                  ▾
                </span>
              </div>
            </div>
          </div>

          {/* Priority */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-800">
              Priority
            </div>
            <div className="px-4 py-3 space-y-3">
              {(["High", "Medium", "Low"] as Priority[]).map((p) => (
                <label key={p} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name="priority"
                    className="h-4 w-4"
                    checked={priority === p}
                    onChange={() => setPriority(p)}
                  />
                  {p}
                </label>
              ))}
            </div>
          </div>

          {/* Internal Notes */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3 text-sm font-medium text-gray-800">
              Internal Notes
            </div>
            <div className="px-4 py-3">
              <textarea
                className="w-full rounded-md border border-gray-200 p-3 text-sm"
                rows={4}
                placeholder="Please check housekeeping logs for Sept 20"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2  px-5 py-4">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onEscalate({ assignee, priority, notes })}
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Escalate
          </button>
        </div>
      </div>
    </div>
  );
}
