"use client";
import { useEffect, useRef, useState } from "react";

type Props = {
  onView?: () => void;
  onEdit?: () => void;
  onCancel?: () => void;
};

export default function RowActions({ onView, onEdit, onCancel }: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  // close on outside click / ESC
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDocClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={wrapRef} className="relative inline-flex">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 hover:bg-gray-50"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Actions"
      >
        <span className="text-gray-500">⋮</span>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-40 rounded-lg border border-gray-200 bg-white p-2 shadow-lg"
        >
          <button
            onClick={() => {
              onView?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* eye icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
              <circle cx="12" cy="12" r="3.5" />
            </svg>
            View
          </button>

          <button
            onClick={() => {
              onEdit?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* edit/pencil icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 21l3.75-.75L21 6l-3-3L3.75 17.25 3 21z" />
              <path d="M14 4l6 6" />
            </svg>
            Edit
          </button>

          <button
            onClick={() => {
              onCancel?.();
              setOpen(false);
            }}
            className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            role="menuitem"
          >
            {/* x icon */}
            <svg
              className="h-5 w-5 text-gray-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}
