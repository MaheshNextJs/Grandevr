"use client";

import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  staffName?: string;
};

export default function DeactivateStaffConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  staffName = "John Smith",
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/30"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-md rounded-2xl bg-white shadow-xl px-6 py-8 text-center">
        {/* Close (X) */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:bg-gray-100 rounded p-1"
          aria-label="Close"
        >
          ×
        </button>

        {/* Title */}
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          Are you sure you want to deactivate {staffName}?
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          This staff member will no longer receive tasks or appear in active
          scheduling.
        </p>

        {/* Buttons */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={onClose}
            className="h-10 w-[140px] rounded-md border border-gray-300 bg-white px-4 text-sm text-gray-700 hover:bg-gray-50"
          >
            Close
          </button>
          <button
            onClick={() => {
              onConfirm(); // Call user’s confirm handler
              onClose(); // Then close the modal immediately
            }}
            className="h-10 w-[180px] rounded-md bg-[#A57865] px-4 text-sm font-medium text-white hover:opacity-90"
          >
            Deactivate Staff
          </button>
        </div>
      </div>
    </div>
  );
}
