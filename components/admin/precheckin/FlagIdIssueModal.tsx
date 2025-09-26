"use client";

import { useState } from "react";

type Props = {
  triggerClass?: string;

  reservationId: string;
  guestName: string;
  checkInISO: string;
  checkOutISO: string;
  room: string; // e.g., "Deluxe King × 1"
  guestsLabel: string; // e.g., "2 Adults"

  // Status summary
  preferences?: string;
  addOns?: string;
  signatureCaptured?: boolean; // default true

  // Callbacks
  onKeepFlagged?: (payload: {
    reason: string;
    notes: string;
    allowResubmit: boolean;
    notifyGuest: boolean;
  }) => void;
  onApproveNow?: (payload: {
    reason: string;
    notes: string;
    notifyGuest: boolean;
  }) => void;
};

export default function FlagIdIssueModal({
  triggerClass = "rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95",
  reservationId,
  guestName,
  checkInISO,
  checkOutISO,
  room,
  guestsLabel,
  preferences = "—",
  addOns = "None",
  signatureCaptured = true,
  onKeepFlagged,
  onApproveNow,
}: Props) {
  const [open, setOpen] = useState(false);

  const [reason, setReason] = useState("ID Verification Failed");
  const [notes, setNotes] = useState("Guest uploaded passport, name mismatch.");
  const [allowResubmit, setAllowResubmit] = useState(true);
  const [notifyGuest, setNotifyGuest] = useState(true);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const close = () => setOpen(false);

  const keepFlagged = () => {
    onKeepFlagged?.({
      reason,
      notes: notes.trim(),
      allowResubmit,
      notifyGuest,
    });
    close();
  };

  const approveNow = () => {
    onApproveNow?.({ reason, notes: notes.trim(), notifyGuest });
    close();
  };

  return (
    <>
      {/* Trigger (same button as Approve) */}
      <button className={triggerClass} onClick={() => setOpen(true)}>
        Approve Pre-Check-In
      </button>

      {!open ? null : (
        // scrollable overlay
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={close}
          />

          {/* Panel */}
          <div className="relative mx-auto my-10 w-[820px] max-w-[94vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Reject / Flag Pre-Check-In
              </h3>
              <button
                onClick={close}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body (scrolls if long) */}
            <div className="px-5 py-4 space-y-4 text-sm max-h-[70vh] overflow-y-auto">
              {/* Reservation Summary (top) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  <Row label="Reservation ID" value={reservationId} />
                  <Row label="Name" value={guestName} />
                  <Row
                    label="Dates"
                    value={
                      <div className="flex items-center gap-2">
                        {fmt(checkInISO)}{" "}
                        <span className="text-gray-400">→</span>{" "}
                        {fmt(checkOutISO)}
                      </div>
                    }
                  />
                  <Row label="Room" value={room} />
                  <Row label="Guests" value={guestsLabel} />
                </div>
              </section>

              {/* Status summary */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  <Row
                    label="ID Verification"
                    value={
                      <span className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-2 py-1 text-xs font-medium text-rose-700">
                        Issue Detected <span>⚠️</span>
                      </span>
                    }
                  />
                  <Row label="Preferences" value={preferences} />
                  <Row label="Add-Ons" value={addOns} />
                  <Row
                    label="Digital Signature"
                    value={
                      <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700">
                        Captured <span>✓</span>
                      </span>
                    }
                  />
                </div>
              </section>

              {/* Reason */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reason
                </div>
                <div className="p-4">
                  <div className="relative w-full max-w-md">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                    >
                      <option>ID Verification Failed</option>
                      <option>Name / Document Mismatch</option>
                      <option>Document Expired</option>
                      <option>Suspicious / Tampered Document</option>
                      <option>Other</option>
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                      ▾
                    </span>
                  </div>
                </div>
              </section>

              {/* Notes */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Notes
                </div>
                <div className="p-4">
                  <textarea
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    placeholder="Write the reason/details sent to the guest"
                  />
                </div>
              </section>

              {/* Options */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Options
                </div>
                <div className="p-4 space-y-3">
                  <Check
                    label="Allow Guest to Resubmit Pre-Check-In"
                    checked={allowResubmit}
                    onChange={setAllowResubmit}
                  />
                  <Check
                    label="Notify Guest by Email (with reason)"
                    checked={notifyGuest}
                    onChange={setNotifyGuest}
                  />
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button
                onClick={close}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={keepFlagged}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Keep Flagged
              </button>
              <button
                onClick={approveNow}
                className="rounded-md bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
              >
                Approve Now
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 items-start">
      <div className="col-span-5 text-xs text-gray-500">{label}:</div>
      <div className="col-span-7 text-gray-900">{value}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2">
      <input
        type="checkbox"
        className="h-4 w-4 accent-[#A57865] rounded border-gray-300"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="text-gray-800">{label}</span>
    </label>
  );
}
