"use client";

import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function StaffDeactivatedSuccessModal({
  isOpen,
  onClose,
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
      role="dialog"
      aria-modal="true"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative w-full max-w-sm rounded-2xl bg-white shadow-xl px-6 pt-10 pb-8 text-center">
        {/* Close (X) */}
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute right-3 top-3 rounded p-1 text-gray-500 hover:bg-gray-100"
        >
          ×
        </button>

        {/* Green check */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
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

        {/* Title & subtitle */}
        <h2 className="text-[18px] md:text-[20px] font-semibold text-gray-900">
          Deactivated Successfully
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Notification sent to staff.
        </p>

        {/* Close button (outlined brand) */}
        <div className="mt-7">
          <button
            onClick={onClose}
            className="h-10 min-w-[140px] rounded-md border border-[#A57865] bg-white px-4 text-sm font-medium text-[#A57865] hover:bg-[#A57865]/5"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
