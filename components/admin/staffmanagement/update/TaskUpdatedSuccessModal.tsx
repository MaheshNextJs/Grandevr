"use client";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskId?: string;
};

export default function TaskUpdatedSuccessModal({
  isOpen,
  onClose,
  taskId,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/30 p-4">
      <div className="relative w-full max-w-md rounded-lg bg-white shadow-lg px-6 pt-10 pb-6">
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

        <h2 className="text-center text-lg font-medium mb-4">
          Task Updated Successfully
        </h2>

        <div className="mx-auto mb-6 w-full max-w-md rounded-md border border-gray-200 px-4 py-3 text-center text-sm text-gray-700">
          <div>Task ID: {taskId ?? "—"}</div>
          <div className="mt-1">Status: Updated</div>
        </div>

        <div className="mx-auto grid grid-cols-1 gap-3 max-w-[10rem]">
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm text-white hover:opacity-90"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
