"use client";

import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
};

export default function TaskReassignedSuccessModal({
  isOpen,
  onClose,
  taskId,
}: Props) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30"
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-lg bg-white px-6 pt-10 pb-6 shadow-lg">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
        >
          ×
        </button>

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

        <h2 className="text-center text-[16px] font-semibold mb-4">
          Task Reassigned Successfully
        </h2>

        <div className="mx-auto mb-5 w-full max-w-md rounded-md border border-gray-200 px-4 py-3 text-center text-[12px] text-gray-600">
          Task ID: {taskId ?? "—"}
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-md bg-[#A57865] px-6 py-2 text-sm text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
