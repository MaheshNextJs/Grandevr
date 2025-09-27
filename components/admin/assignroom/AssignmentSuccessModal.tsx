"use client";

type SuccessProps = {
  open: boolean;
  guestName: string;
  startDate: string;
  endDate: string;
  requested: string;
  note?: string; // e.g., "Guest Preferences Matched: King Bed, Non‑Smoking"
  onClose: () => void;
};

export default function AssignmentSuccessModal({
  open,
  guestName,
  startDate,
  endDate,
  requested,
  note = "Guest Preferences Matched: King Bed, Non‑Smoking",
  onClose,
}: SuccessProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 p-4">
      <div className="w-full max-w-lg rounded-md bg-white p-6 text-center shadow-xl">
        {/* Check icon */}
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500/15">
          <svg viewBox="0 0 24 24" className="h-7 w-7 text-emerald-600">
            <path
              fill="currentColor"
              d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
            />
          </svg>
        </div>

        <h3 className="mb-4 text-lg font-semibold">
          Room Assigned Automatically
        </h3>

        <div className="mx-auto mb-3 w-full max-w-md rounded-md border border-gray-200 text-left">
          <div className="grid grid-cols-2 gap-6 px-4 py-4 text-sm">
            <div className="space-y-2">
              <div className="text-[11px] text-gray-500">Name</div>
              <div className="font-medium text-gray-900">{guestName}</div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] text-gray-500">Dates</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                {startDate} <span className="text-gray-400">→</span> {endDate}
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-[11px] text-gray-500">Requested</div>
              <div className="font-medium text-gray-900">{requested}</div>
            </div>
          </div>
        </div>

        {note && <p className="mb-5 text-xs text-gray-500">{note}</p>}

        <button
          onClick={onClose}
          className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Close
        </button>
      </div>
    </div>
  );
}
