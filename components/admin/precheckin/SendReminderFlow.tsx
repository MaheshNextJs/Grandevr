"use client";

import { useMemo, useState } from "react";

type Props = {
  triggerClass?: string;

  reservationId: string;
  guestName: string;
  guestEmail?: string;
  guestPhone?: string;

  checkInISO: string;
  checkOutISO: string;
  room: string; // e.g., "Deluxe King × 1"
  guestsLabel: string; // e.g., "2 Adults"

  onSend?: (payload: {
    sendEmail: boolean;
    sendSMS: boolean;
  }) => Promise<void> | void;
};

export default function SendReminderFlow({
  triggerClass = "rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50",
  reservationId,
  guestName,
  guestEmail,
  guestPhone,
  checkInISO,
  checkOutISO,
  room,
  guestsLabel,
  onSend,
}: Props) {
  const [open, setOpen] = useState(false);
  const [sentOpen, setSentOpen] = useState(false);

  const [sendEmail, setSendEmail] = useState(false);
  const [sendSMS, setSendSMS] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSend = useMemo(() => {
    // allow sending only if at least one channel is selected
    // and if SMS is chosen ensure we have a phone
    if (!sendEmail && !sendSMS) return false;
    if (sendSMS && !guestPhone) return false;
    return true;
  }, [sendEmail, sendSMS, guestPhone]);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const resetAll = () => {
    setOpen(false);
    setSentOpen(false);
    setSendEmail(false);
    setSendSMS(false);
    setLoading(false);
  };

  const handleSend = async () => {
    if (!canSend) return;
    try {
      setLoading(true);
      await onSend?.({ sendEmail, sendSMS });
      // close first modal, open success
      setOpen(false);
      setSentOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Trigger button */}
      <button className={triggerClass} onClick={() => setOpen(true)}>
        Send Reminder
      </button>

      {/* STEP 1: Compose modal */}
      {!open ? null : (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={resetAll}
          />
          {/* Panel */}
          <div className="relative mx-auto my-10 w-[900px] max-w-[96vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-base font-medium text-gray-900">
                Send Pre-Check-In Reminder
              </h3>
              <button
                onClick={resetAll}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body (scroll if long) */}
            <div className="px-6 py-5 space-y-5 text-sm max-h-[70vh] overflow-y-auto">
              {/* Summary card */}
              <section className="rounded-lg border border-gray-200">
                <div className="px-4 py-3 border-b border-gray-100 text-sm font-medium text-gray-900">
                  Reservation Summary
                </div>
                <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-3">
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

              {/* Channels */}
              <section>
                <div className="text-sm font-medium text-gray-900 mb-3">
                  Do you want to send a reminder email/SMS for completing
                  Pre-Check-In?
                </div>
                <div className="space-y-3">
                  <Checkbox
                    label="Send Email"
                    checked={sendEmail}
                    onChange={setSendEmail}
                  />
                  <Checkbox
                    label={`Send SMS (if phone available)`}
                    checked={sendSMS}
                    onChange={setSendSMS}
                  />
                  {sendSMS && !guestPhone && (
                    <div className="text-xs text-amber-600">
                      No phone number available for this guest.
                    </div>
                  )}
                </div>
              </section>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
              <button
                onClick={resetAll}
                className="rounded-md border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                disabled={!canSend || loading}
                className="rounded-md bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95 disabled:opacity-50"
              >
                {loading ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* STEP 2: Success modal */}
      {!sentOpen ? null : (
        <div className="fixed inset-0 z-[100] flex items-start justify-center overflow-y-auto">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-[1px]"
            onClick={resetAll}
          />
          {/* Panel */}
          <div className="relative mx-auto my-10 w-[560px] max-w-[94vw] rounded-xl bg-white shadow-xl ring-1 ring-black/5">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <div />
              <button
                onClick={resetAll}
                className="h-8 w-8 inline-flex items-center justify-center rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                aria-label="Close"
                title="Close"
              >
                ×
              </button>
            </div>

            {/* Body */}
            <div className="px-8 py-6 text-center space-y-4">
              <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 text-xl">
                ✓
              </div>
              <h4 className="text-base font-semibold text-gray-900">
                Reminder Sent
              </h4>
              <p className="text-sm text-gray-600">
                A Pre-Check-In reminder has been sent to:&nbsp;
                {sendEmail && guestEmail ? (
                  <>
                    Email: <span className="font-medium">{guestEmail}</span>
                  </>
                ) : null}
                {sendEmail && sendSMS && guestPhone && guestEmail
                  ? " · "
                  : null}
                {sendSMS && guestPhone ? (
                  <>
                    SMS: <span className="font-medium">{guestPhone}</span>
                  </>
                ) : null}
                {(!sendEmail || !guestEmail) && (!sendSMS || !guestPhone)
                  ? "Selected channels."
                  : null}
              </p>
            </div>

            {/* Footer */}
            <div className="px-6 pb-6 flex justify-center">
              <button
                onClick={resetAll}
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

/* ---------- small helpers ---------- */

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 items-start">
      <div className="col-span-5 text-xs text-gray-500">{label}</div>
      <div className="col-span-7 text-gray-900">{value}</div>
    </div>
  );
}

function Checkbox({
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
