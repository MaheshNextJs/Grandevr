"use client";

import { getPreRow } from "@/app/admin/dashboard/sidescreens/pre-check-in/data";
import { useMemo, useState } from "react";

type Props = {
  triggerClass?: string;

  reservationId: string;
  guestName: string;
  checkInISO: string;
  checkOutISO: string;
  room: string; // e.g., "Deluxe King × 1"
  guestsLabel: string; // e.g., "2 Adults"

  // Pre-check-in summary
  idVerified?: boolean; // default: true
  preferences?: string; // e.g., "Vegetarian Meals"
  addOns?: string; // e.g., "Deluxe King × 1"
  signatureCaptured?: boolean; // default: true

  onApprove?: () => void; // optional callback after success
};

export default function ApprovePreCheckInModal({
  triggerClass = "rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95",
  reservationId,
  guestName,
  checkInISO,
  checkOutISO,
  room,
  guestsLabel,
  idVerified = true,
  preferences = "—",
  addOns = "None",
  signatureCaptured = true,
  onApprove,
}: Props) {
  const [open, setOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const pre = getPreRow(reservationId);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const onConfirm = () => {
    // TODO: call API to approve + notify guest
    setOpen(false); // close main approve modal
    setSuccessOpen(true); // show success modal
    onApprove?.();
  };

  return (
    <>
      {/* Trigger */}
      <button className={triggerClass} onClick={() => setOpen(true)}>
        Approve
      </button>

      {/* Approve modal */}
      {!open ? null : (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setOpen(false)}
          />
          {/* Modal */}
          {/* <div className="absolute left-1/2 top-1/2 w-[720px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl ring-1 ring-black/5"> */}
          <div className="absolute left-1/2 top-1/2 w-[720px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl ring-1 ring-black/5 flex flex-col max-h-[90vh]">
            {/* Header */}
            {/* <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100"> */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100 shrink-0">
              <h3 className="text-sm font-medium text-gray-900">
                Approve Pre-Check-In
              </h3>
              <button
                onClick={() => setOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            {/* <div className="px-5 py-4 space-y-4 text-sm"> */}
            <div className="px-5 py-4 space-y-4 text-sm overflow-y-auto grow">
              {/* Reservation summary (top) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                {/* was: grid grid-cols-1 md:grid-cols-2 ... */}
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
                      <span
                        className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ${
                          pre?.idVerification === "Verified"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {pre?.idVerification}
                        {pre?.idVerification === "Verified" ? (
                          <img
                            src="/icons/admin/verified1.png"
                            alt="Verified"
                            width={12}
                            height={12}
                          />
                        ) : pre?.idVerification === "Pending" ? (
                          <img
                            src="/icons/admin/pending.png"
                            alt="Pending"
                            width={12}
                            height={12}
                          />
                        ) : (
                          <img
                            src="/icons/admin/flagged1.png"
                            alt="Issue"
                            width={12}
                            height={12}
                          />
                        )}
                      </span>
                    }
                  />

                  {/* <SummaryRow label="Preferences" value={preferences} /> */}
                  <SummaryRow
                    label="Preferences"
                    value={
                      pre?.preferences === "Set"
                        ? "Vegetarian Meals"
                        : "Not Set"
                    }
                  />
                  {/* <SummaryRow label="Add-Ons" value={addOns} /> */}
                  <SummaryRow label="Add-Ons" value={pre?.addOns ?? "None"} />

                  <SummaryRow
                    label="Digital Signature"
                    value={
                      <span
                        className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ${
                          pre?.signature === "Done"
                            ? "bg-emerald-50 text-emerald-700"
                            : "bg-amber-50 text-amber-700"
                        }`}
                      >
                        {pre?.signature === "Done"
                          ? "Captured"
                          : "Not Captured"}
                        {pre?.signature === "Done" ? (
                          <img
                            src="/icons/admin/verified1.png"
                            alt="Captured"
                            width={12}
                            height={12}
                          />
                        ) : (
                          <img
                            src="/icons/admin/pending.png"
                            alt="Pending"
                            width={12}
                            height={12}
                          />
                        )}
                      </span>
                    }
                  />
                </div>
              </section>

              {/* Approving will */}
              <section className="rounded-lg">
                <div className="px-1 py-2 text-sm font-medium text-gray-900">
                  Approving will:
                </div>
                <ul className="pl-6 space-y-1 text-gray-700 text-sm list-disc">
                  <li>Lock Pre-Check-In data</li>
                  <li>Notify guest via email</li>
                  <li>Notify guest via SMS</li>
                </ul>
              </section>
            </div>

            {/* Footer */}
            {/* <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3"> */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3 shrink-0">
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="rounded-md bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
              >
                Approve &amp; Notify Guest
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success modal */}
      {!successOpen ? null : (
        <div className="fixed inset-0 z-[100]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={() => setSuccessOpen(false)}
          />
          {/* Panel */}
          <div className="absolute left-1/2 top-1/2 w-[420px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl ring-1 ring-black/5 text-center">
            {/* Header (just close icon) */}
            <div className="flex items-center justify-end px-5 py-3 border-b border-gray-100">
              <button
                onClick={() => setSuccessOpen(false)}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-6 space-y-3">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xl">
                ✓
              </div>
              <h4 className="text-base font-semibold text-gray-900">
                Pre-Check-In Updated
              </h4>

              <div className="text-sm text-gray-700">
                <div>
                  Reservation ID:{" "}
                  <span className="font-medium">{reservationId}</span>
                </div>
                <div>
                  Current Status:{" "}
                  <span className="font-medium text-emerald-700">Approved</span>
                </div>
              </div>

              <p className="text-xs text-gray-500">Guest has been notified</p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <button
                onClick={() => setSuccessOpen(false)}
                className="rounded-md bg-[#A57865] text-white px-6 py-2 text-[12px] hover:opacity-95"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

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
        {/* allow wrapping for long content on the right */}
        <div className="whitespace-normal break-words">{value}</div>
      </div>
    </div>
  );
}
