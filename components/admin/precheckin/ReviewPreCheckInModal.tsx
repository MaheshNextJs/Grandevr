"use client";

import { useState } from "react";
import Image from "next/image";
import { getPreRow } from "@/app/admin/dashboard/sidescreens/pre-check-in/data";

type Props = {
  triggerClass?: string;

  reservationId: string;
  guestName: string;
  checkInISO: string;
  checkOutISO: string;
  room: string; // e.g., "Deluxe King × 1"
  guestsLabel: string; // e.g., "2 Adults"

  // optional static text overrides
  preferences?: string; // e.g., "Vegetarian Meals"
  addOns?: string; // e.g., "Deluxe King × 1"

  onApproveNow?: () => void;
  onKeepFlagged?: () => void;
};

export default function ReviewPreCheckInModal({
  triggerClass = "rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50",
  reservationId,
  guestName,
  checkInISO,
  checkOutISO,
  room,
  guestsLabel,
  preferences = "—",
  addOns = "None",
  onApproveNow,
  onKeepFlagged,
}: Props) {
  const [open, setOpen] = useState(false);

  // dropdown + notes
  const [reason, setReason] = useState("ID Verification Failed");
  const [notes, setNotes] = useState("Guest uploaded passport, name mismatch.");

  // options
  const [allowResubmit, setAllowResubmit] = useState(true);
  const [notifyGuest, setNotifyGuest] = useState(true);

  const pre = getPreRow(reservationId);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const resetClose = () => setOpen(false);

  const handleKeepFlagged = () => {
    onKeepFlagged?.();
    setOpen(false);
  };

  const handleApproveNow = () => {
    onApproveNow?.();
    setOpen(false);
  };

  // icon helpers
  const idIcon =
    pre?.idVerification === "Verified"
      ? "/icons/admin/verified1.png"
      : pre?.idVerification === "Pending"
      ? "/icons/admin/pending.png"
      : "/icons/admin/flagged1.png";

  const sigCaptured = pre?.signature === "Done";
  const sigIcon = sigCaptured
    ? "/icons/admin/verified1.png"
    : "/icons/admin/pending.png";

  return (
    <>
      {/* Trigger */}
      <button className={triggerClass} onClick={() => setOpen(true)}>
        Review
      </button>

      {!open ? null : (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={resetClose}
          />

          {/* Panel */}
          <div className="relative mx-auto my-10 w-[820px] max-w-[94vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Review Pre-check-in
              </h3>
              <button
                onClick={resetClose}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-5 py-4 space-y-4 text-sm max-h-[70vh] overflow-y-auto">
              {/* Reservation summary (top) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 space-y-3">
                  <SummaryRow label="Reservation ID" value={reservationId} />
                  <SummaryRow label="Name" value={guestName} />
                  <SummaryRow
                    label="Dates"
                    value={
                      <div className="flex items-center gap-2">
                        {fmt(checkInISO)}{" "}
                        <span className="text-gray-400">→</span>{" "}
                        {fmt(checkOutISO)}
                      </div>
                    }
                  />
                  <SummaryRow label="Room" value={room} />
                  <SummaryRow label="Guests" value={guestsLabel} />
                </div>
              </section>

              {/* Pre-check-in summary (statuses) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 space-y-3">
                  <SummaryRow
                    label="ID Verification"
                    value={
                      <Badge
                        tone={
                          pre?.idVerification === "Verified"
                            ? "ok"
                            : pre?.idVerification === "Pending"
                            ? "warn"
                            : "err"
                        }
                      >
                        {pre?.idVerification ?? "Unknown"}
                        <Image
                          src={idIcon}
                          alt="id status"
                          width={12}
                          height={12}
                        />
                      </Badge>
                    }
                  />
                  <SummaryRow
                    label="Preferences"
                    value={pre?.preferences === "Set" ? preferences : "Not Set"}
                  />
                  <SummaryRow label="Add-Ons" value={pre?.addOns ?? addOns} />
                  <SummaryRow
                    label="Digital Signature"
                    value={
                      <Badge tone={sigCaptured ? "ok" : "warn"}>
                        {sigCaptured ? "Captured" : "Not Captured"}
                        <Image
                          src={sigIcon}
                          alt="signature"
                          width={12}
                          height={12}
                        />
                      </Badge>
                    }
                  />
                </div>
              </section>

              {/* Reason (dropdown) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reason
                </div>
                <div className="p-4">
                  <div className="relative w-full">
                    <select
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                    >
                      <option>ID Verification Failed</option>
                      <option>Missing / Invalid Document</option>
                      <option>Mixing / Invalid Document</option>
                      <option>Payment Issue</option>
                      <option>Other</option>
                    </select>
                    <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
                      ▾
                    </span>
                  </div>

                  {/* Notes */}
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-1">Notes</div>
                    <textarea
                      rows={4}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
                      placeholder="Add internal notes"
                    />
                  </div>
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
                onClick={resetClose}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleKeepFlagged}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Keep Flagged
              </button>
              <button
                onClick={handleApproveNow}
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

/* ——— small shared bits ——— */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-gray-900 text-right ml-4 min-w-0">
        <div className="whitespace-normal break-words">{value}</div>
      </div>
    </div>
  );
}

function Badge({
  tone,
  children,
}: {
  tone: "ok" | "warn" | "err";
  children: React.ReactNode;
}) {
  const cls =
    tone === "ok"
      ? "bg-emerald-50 text-emerald-700"
      : tone === "warn"
      ? "bg-amber-50 text-amber-700"
      : "bg-rose-50 text-rose-700";
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
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
