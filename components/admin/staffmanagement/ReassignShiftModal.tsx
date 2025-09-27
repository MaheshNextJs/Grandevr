"use client";

import { useEffect, useState } from "react";

export type ShiftName = "Morning" | "Evening" | "Night";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (args: { shift: ShiftName; date: string; notes: string }) => void;
};

const shiftTime = (s: ShiftName) =>
  s === "Morning"
    ? "7 AM – 3 PM"
    : s === "Evening"
    ? "3 PM – 11 PM"
    : "11 PM – 7 AM";

export default function ReassignShiftModal({ isOpen, onClose, onSave }: Props) {
  const [selected, setSelected] = useState<ShiftName>("Morning");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-lg">
        {/* Close (X) */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
        >
          ×
        </button>

        {/* Header */}
        <div className="px-5 py-4 font-medium">Reject / Flag Pre-Check-In</div>

        {/* Body */}
        <div className="space-y-6 p-5 border border-gray-300 mx-4 mt-4 rounded-md shadow-sm">
          {/* Current Shift */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Current Assigned Shift</p>
            <div className="rounded border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm text-emerald-700">
              Morning Shift <br />
              <span className="text-xs text-gray-500">7:00 AM – 3:00 PM</span>
            </div>
          </div>

          {/* Select New Shift */}
          <div className="space-y-1">
            <p className="text-xs text-gray-500">Select New Shift</p>
            {(["Morning", "Evening", "Night"] as ShiftName[]).map((s) => (
              <button
                key={s}
                onClick={() => setSelected(s)}
                className={`w-full rounded border px-4 py-2 text-left text-sm ${
                  selected === s
                    ? "border-[#A57865] bg-[#FDF7F6] text-[#A57865]"
                    : "border-gray-100 shadow-sm bg-white hover:bg-gray-100"
                }`}
              >
                <span className="font-medium">{s}</span>
                <div className="text-xs text-gray-500">{shiftTime(s)}</div>
              </button>
            ))}
          </div>

          {/* Date */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Effective From</p>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <p className="text-xs text-gray-500 mb-1">Optional Notes</p>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full rounded border border-gray-300 px-3 py-2 text-sm"
              placeholder="e.g., covering for another shift, guest load expected"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-[12px] text-white hover:opacity-90"
            onClick={() => onSave({ shift: selected, date, notes })}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
