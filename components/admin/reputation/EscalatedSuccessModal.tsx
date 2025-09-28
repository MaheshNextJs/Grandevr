"use client";

type Props = {
  open: boolean;
  onClose: () => void;
  assignee?: string;
  priority?: "High" | "Medium" | "Low";
};

export default function EscalatedSuccessModal({
  open,
  onClose,
  assignee,
  priority,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative w-[min(420px,92vw)] rounded-xl bg-white p-6 shadow-xl">
        <button
          onClick={onClose}
          className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
        >
          ×
        </button>

        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h4 className="mb-3 text-center text-base font-semibold text-gray-900">
          Review Escalated Successfully
        </h4>

        <div className="mb-5 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <div className="mb-1">
            <span className="font-medium">Assigned To:</span> {assignee || "—"}
          </div>
          <div className="">
            <span className="font-medium">Priority:</span> {priority || "—"}
          </div>
          <div className="mt-3 text-center text-gray-500">
            Task created in Staff Management.
          </div>
        </div>

        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
