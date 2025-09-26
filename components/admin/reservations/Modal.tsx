"use client";

import { ReactNode, useEffect } from "react";

export default function Modal({
  open,
  onClose,
  title,
  children,
  footer,
}: {
  open: boolean;
  onClose: () => void;
  title?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />
      <div className="relative w-[560px] max-w-[92vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5 animate-in fade-in zoom-in-95">
        {/* header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition"
            aria-label="Close"
            title="Close"
          >
            ×
          </button>
        </div>

        {/* body */}
        <div className="px-5 py-4 text-sm text-gray-800">{children}</div>

        {/* footer */}
        {footer ? (
          <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
