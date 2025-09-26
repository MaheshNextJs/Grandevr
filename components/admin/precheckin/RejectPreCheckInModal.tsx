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

  // Pre-check-in summary
  idVerified?: boolean; // default: true
  preferences?: string; // e.g., "Vegetarian Meals"
  addOns?: string; // e.g., "Deluxe King × 1"
  signatureCaptured?: boolean; // default: true

  onReject?: (payload: {
    reasons: {
      idVerificationFailed: boolean;
      mixingInvalidDocument: boolean;
      missingInvalidDocument: boolean;
      paymentIssue: boolean;
      other: boolean;
      mention: string;
    };
    allowResubmit: boolean;
    notifyGuest: boolean;
  }) => void;
};

export default function RejectPreCheckInModal({
  triggerClass = "rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50",
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
  onReject,
}: Props) {
  const [open, setOpen] = useState(false);

  // reasons
  const [idVerificationFailed, setIdVerificationFailed] = useState(false);
  const [mixingInvalidDocument, setMixingInvalidDocument] = useState(false);
  const [missingInvalidDocument, setMissingInvalidDocument] = useState(false);
  const [paymentIssue, setPaymentIssue] = useState(false);
  const [other, setOther] = useState(false);
  const [mention, setMention] = useState("");

  // action settings
  const [allowResubmit, setAllowResubmit] = useState(true);
  const [notifyGuest, setNotifyGuest] = useState(true);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const hasReason =
    idVerificationFailed ||
    mixingInvalidDocument ||
    missingInvalidDocument ||
    paymentIssue ||
    (other && mention.trim().length > 0);

  const reset = () => {
    setOpen(false);
    setIdVerificationFailed(false);
    setMixingInvalidDocument(false);
    setMissingInvalidDocument(false);
    setPaymentIssue(false);
    setOther(false);
    setMention("");
    setAllowResubmit(true);
    setNotifyGuest(true);
  };

  const submit = () => {
    onReject?.({
      reasons: {
        idVerificationFailed,
        mixingInvalidDocument,
        missingInvalidDocument,
        paymentIssue,
        other,
        mention: mention.trim(),
      },
      allowResubmit,
      notifyGuest,
    });
    reset();
  };

  return (
    <>
      {/* Trigger */}
      <button className={triggerClass} onClick={() => setOpen(true)}>
        Reject / Flag for Review
      </button>

      {!open ? null : (
        // ⬇️ SCROLLABLE OVERLAY (changed)
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={reset}
          />

          {/* Panel (not center-locked; uses top/bottom margin) */}
          <div className="relative mx-auto my-10 w-[820px] max-w-[94vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
              <h3 className="text-sm font-medium text-gray-900">
                Reject / Flag Pre-Check-In
              </h3>
              <button
                onClick={reset}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body (own scroll if long) */}
            <div className="px-5 py-4 space-y-4 text-sm max-h-[70vh] overflow-y-auto">
              {/* Reservation summary (top) */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
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
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3">
                  <SummaryRow
                    label="ID Verification"
                    value={
                      <Badge
                        ok={idVerified}
                        okText="Verified"
                        noText="Pending"
                      />
                    }
                  />
                  <SummaryRow label="Preferences" value={preferences} />
                  <SummaryRow label="Add-Ons" value={addOns} />
                  <SummaryRow
                    label="Digital Signature"
                    value={
                      <Badge
                        ok={signatureCaptured}
                        okText="Captured"
                        noText="Not Captured"
                      />
                    }
                  />
                </div>
              </section>

              {/* Select reason */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Select Reason
                </div>
                <div className="p-4 space-y-3">
                  <Check
                    label="ID Verification Failed"
                    checked={idVerificationFailed}
                    onChange={setIdVerificationFailed}
                  />
                  <Check
                    label="Mixing / Invalid Document"
                    checked={mixingInvalidDocument}
                    onChange={setMixingInvalidDocument}
                  />
                  <Check
                    label="Missing / Invalid Document"
                    checked={missingInvalidDocument}
                    onChange={setMissingInvalidDocument}
                  />
                  <Check
                    label="Payment Issue"
                    checked={paymentIssue}
                    onChange={setPaymentIssue}
                  />
                  <Check label="Other" checked={other} onChange={setOther} />

                  {/* Mention box */}
                  <div className="pt-2">
                    <div className="text-xs text-gray-500 mb-1">Mention it</div>
                    <textarea
                      rows={3}
                      value={mention}
                      onChange={(e) => setMention(e.target.value)}
                      placeholder="Enter here"
                      className="w-full rounded-lg border border-gray-300 px-3 py-2"
                    />
                    <div className="mt-1 text-[11px] text-gray-500">
                      Provide context if selecting{" "}
                      <span className="font-medium">Other</span>.
                    </div>
                  </div>
                </div>
              </section>

              {/* Action settings */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Action Settings
                </div>
                <div className="p-4 space-y-3">
                  <Check
                    label="Allow Guest to Resubmit Pre-Check-In"
                    checked={allowResubmit}
                    onChange={setAllowResubmit}
                  />
                  <Check
                    label="Notify guest by email (with reason)"
                    checked={notifyGuest}
                    onChange={setNotifyGuest}
                  />
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button
                onClick={reset}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={submit}
                disabled={!hasReason}
                className="rounded-md bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95 disabled:opacity-50"
                title={
                  !hasReason
                    ? "Select at least one reason or enter a note for 'Other'."
                    : ""
                }
              >
                Reject &amp; Notify Guest
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
    <div className="grid grid-cols-12 items-start">
      <div className="col-span-5 text-xs text-gray-500">{label}:</div>
      <div className="col-span-7 text-gray-900">{value}</div>
    </div>
  );
}

function Badge({
  ok,
  okText,
  noText,
}: {
  ok: boolean;
  okText: string;
  noText: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-md px-2 py-1 text-xs font-medium ${
        ok ? "bg-emerald-50 text-emerald-700" : "bg-amber-50 text-amber-700"
      }`}
    >
      {ok ? okText : noText} <span className="text-xs">{ok ? "✓" : "⏳"}</span>
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
