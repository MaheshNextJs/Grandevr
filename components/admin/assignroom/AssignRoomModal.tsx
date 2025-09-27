"use client";
import { useMemo, useState } from "react";

export type AssignRoomOption = {
  roomNo: string;
  roomType: string;
  status: string;
  subtitle?: string; // e.g., "Deluxe King"
};

export type AssignRoomModalProps = {
  open: boolean;
  reservationId: string;
  guestName: string;
  startDate: string;
  endDate: string;
  requested: string; // e.g., "Deluxe King × 1"
  options: AssignRoomOption[];
  onClose: () => void;
  onConfirm: (roomNo: string | null, useAISuggest: boolean) => void;
};

export default function AssignRoomModal({
  open,
  reservationId,
  guestName,
  startDate,
  endDate,
  requested,
  options,
  onClose,
  onConfirm,
}: AssignRoomModalProps) {
  const [selected, setSelected] = useState<string | null>(
    options[0]?.roomNo ?? null
  );
  const [useAI, setUseAI] = useState(true);

  // reset when reopened
  useMemo(() => {
    if (open) {
      setSelected(options[0]?.roomNo ?? null);
      setUseAI(true);
    }
  }, [open, options]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center bg-black/60 p-4">
      <div className="mt-10 w-full max-w-3xl rounded-md bg-white shadow-xl">
        {/* header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="text-[15px] font-semibold">
            Assign Room – {reservationId}
          </h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* summary */}
        <div className="px-5 py-4">
          <div className="rounded-md border border-gray-200">
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
        </div>

        {/* options */}
        <div className="px-5 pb-4">
          <div className="rounded-md border border-gray-200">
            <div className="border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-medium">
              Assign Room
            </div>

            <div className="divide-y">
              {options.map((opt) => (
                <label
                  key={opt.roomNo}
                  className="flex cursor-pointer items-center justify-between gap-3 px-4 py-3"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      className="h-4 w-4 accent-[#A57865]"
                      name="assign-room"
                      checked={selected === opt.roomNo}
                      onChange={() => setSelected(opt.roomNo)}
                    />
                    <div>
                      <div className="font-medium text-gray-900">
                        Room {opt.roomNo}
                      </div>
                      <div className="text-xs text-gray-500">
                        {opt.subtitle ?? opt.roomType}
                      </div>
                    </div>
                  </div>
                  <span className="inline-flex items-center rounded-md border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    {opt.status}
                  </span>
                </label>
              ))}
            </div>

            <label className="flex items-center gap-2 px-4 py-3 text-sm">
              <input
                type="checkbox"
                className="h-4 w-4 accent-[#A57865]"
                checked={useAI}
                onChange={(e) => setUseAI(e.target.checked)}
              />
              <span>Let AI Suggest Best Match</span>
            </label>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected, useAI)}
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Confirm Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
