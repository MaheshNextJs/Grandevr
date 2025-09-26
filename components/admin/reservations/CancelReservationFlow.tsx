"use client";

import { useMemo, useState } from "react";
import Modal from "./Modal";

type RefundChoice = "refund" | "credit" | "none";

export default function CancelReservationFlow({
  triggerClass = "rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50",
  reservationId,
  guestName,
  roomType,
  checkInISO,
  checkOutISO,
  paidAmount = 820, // mock from details; pass real from server if you have
  penaltyAmount = 120, // policy penalty
  onDone,
}: {
  triggerClass?: string;
  reservationId: string;
  guestName: string;
  roomType: string;
  checkInISO: string;
  checkOutISO: string;
  paidAmount?: number;
  penaltyAmount?: number;
  onDone?: () => void; // optional callback after success
}) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // step 1 state
  const [notifyGuest, setNotifyGuest] = useState(false);
  const [applyPolicy, setApplyPolicy] = useState(false);

  // step 2 state
  const [refundOption, setRefundOption] = useState<RefundChoice>("refund");

  // computed
  const refundAfterPenalty = Math.max(
    0,
    paidAmount - (applyPolicy ? penaltyAmount : 0)
  );
  const period = useMemo(() => {
    const fmt = (s: string) =>
      new Date(s).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
      });
    return `${fmt(checkInISO)} – ${fmt(checkOutISO)}`;
  }, [checkInISO, checkOutISO]);

  const reset = () => {
    setOpen(false);
    setStep(1);
    setNotifyGuest(false);
    setApplyPolicy(false);
    setRefundOption("refund");
  };

  const processCancellation = () => {
    // TODO: call API here if needed
    setStep(3);
  };

  return (
    <>
      {/* Trigger button */}
      <button
        className={triggerClass}
        onClick={() => {
          setOpen(true);
          setStep(1);
        }}
      >
        Cancel Reservation
      </button>

      {/* STEP 1: Are you sure? */}
      <Modal
        open={open && step === 1}
        onClose={reset}
        title={`Cancel Reservation – ${reservationId}`}
        footer={
          <>
            <button
              onClick={reset}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button
              onClick={() => setStep(2)}
              className="rounded-md bg-[#A57865] text-white px-4 py-2 text-sm hover:opacity-95 disabled:opacity-60"
            >
              Next
            </button>
          </>
        }
      >
        <div className="space-y-3">
          <div className="flex items-start gap-2 text-sm">
            <span className="mt-0.5">⚠️</span>
            <div>
              <div className="font-medium">Are you sure?</div>
              <div className="text-gray-600">
                Reservation: <span className="font-medium">{guestName}</span> |{" "}
                {period} | {roomType}
              </div>
            </div>
          </div>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#A57865] rounded border-gray-300"
              checked={notifyGuest}
              onChange={() => setNotifyGuest((v) => !v)}
            />
            <span className="text-gray-800">Notify Guest by Email</span>
          </label>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="h-4 w-4 accent-[#A57865] rounded border-gray-300"
              checked={applyPolicy}
              onChange={() => setApplyPolicy((v) => !v)}
            />
            <span className="text-gray-800">Apply Policy</span>
          </label>
        </div>
      </Modal>

      {/* STEP 2: Refund Options */}
      <Modal
        open={open && step === 2}
        onClose={reset}
        title="Refund Options"
        footer={
          <>
            <button
              onClick={() => setStep(1)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
            <button
              onClick={processCancellation}
              className="rounded-md bg-[#A57865] text-white px-4 py-2 text-sm hover:opacity-95"
            >
              Process Cancellation
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="text-gray-700 text-sm">
            <div className="font-medium">
              Policy Applied: Refund{" "}
              {refundAfterPenalty.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
              {applyPolicy
                ? ` (after ${penaltyAmount.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                    maximumFractionDigits: 0,
                  })} penalty)`
                : ""}
            </div>
          </div>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="refund"
              className="h-4 w-4 accent-[#A57865]"
              checked={refundOption === "refund"}
              onChange={() => setRefundOption("refund")}
            />
            <span>
              Refund{" "}
              {refundAfterPenalty.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                maximumFractionDigits: 0,
              })}
            </span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="refund"
              className="h-4 w-4 accent-[#A57865]"
              checked={refundOption === "credit"}
              onChange={() => setRefundOption("credit")}
            />
            <span>Issue Hotel Credit</span>
          </label>

          <label className="flex items-center gap-3">
            <input
              type="radio"
              name="refund"
              className="h-4 w-4 accent-[#A57865]"
              checked={refundOption === "none"}
              onChange={() => setRefundOption("none")}
            />
            <span>No Refund (Override)</span>
          </label>
        </div>
      </Modal>

      {/* STEP 3: Success */}
      <Modal
        open={open && step === 3}
        onClose={() => {
          reset();
          onDone?.();
        }}
        title="Reservation Cancelled successfully."
        footer={
          <button
            onClick={() => {
              reset();
              onDone?.();
            }}
            className="rounded-md bg-[#A57865] text-white px-4 py-2 text-sm hover:opacity-95"
          >
            Okay
          </button>
        }
      >
        <div className="flex flex-col items-center gap-3 py-2">
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
            <span className="text-emerald-600 text-xl">✓</span>
          </div>
          <div className="text-sm text-gray-700 text-center">
            Refund:{" "}
            {refundOption === "refund"
              ? `${refundAfterPenalty.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  maximumFractionDigits: 0,
                })} → Card ending 4321`
              : refundOption === "credit"
              ? "Hotel credit issued"
              : "No refund (override)"}
            {notifyGuest ? ". Guest notified by email." : ""}
          </div>
        </div>
      </Modal>
    </>
  );
}
