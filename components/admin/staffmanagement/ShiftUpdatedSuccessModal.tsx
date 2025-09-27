"use client";

import { useEffect } from "react";
import type { ShiftName } from "./ReassignShiftModal";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onViewSchedule?: () => void;
  staffName?: string;
  shift: ShiftName;
  effectiveDate?: string; // ISO date string
};

const shiftTime = (s: ShiftName) =>
  s === "Morning"
    ? "7 AM – 3 PM"
    : s === "Evening"
    ? "3 PM – 11 PM"
    : "11 PM – 7 AM";

export default function ShiftUpdatedSuccessModal({
  isOpen,
  onClose,
  onViewSchedule,
  staffName = "Staff Member",
  shift,
  effectiveDate,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const eff =
    effectiveDate &&
    new Date(effectiveDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg px-6 pt-10 pb-6">
        {/* Close (X) */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
        >
          ×
        </button>

        {/* Check icon */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-7 w-7 text-emerald-600"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h2 className="text-center text-lg font-medium mb-4">
          Shift Updated Successfully
        </h2>

        <div className="mx-auto mb-4 w-full max-w-md rounded-md border border-gray-200 px-4 py-3 text-center text-sm text-gray-700">
          {staffName} is now assigned to: <strong>{shift} Shift</strong> (
          {shiftTime(shift)})
          <div className="mt-2 text-xs text-gray-500">
            Effective From: {eff ?? "—"}
          </div>
        </div>

        <p className="text-center text-sm text-gray-500 mb-6">
          Notification sent to staff.
        </p>

        {/* Equal width buttons */}
        <div className="mx-auto grid grid-cols-2 gap-3 max-w-xs">
          <button
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Close
          </button>
          <button
            className="rounded-md bg-[#A57865] px-3 py-2 text-[12px] text-white hover:opacity-90"
            onClick={onViewSchedule ?? onClose}
          >
            View Staff Schedule
          </button>
        </div>
      </div>
    </div>
  );
}
