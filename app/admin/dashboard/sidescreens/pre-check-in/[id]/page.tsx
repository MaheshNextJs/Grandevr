"use client";

import Link from "next/link";
import Image from "next/image";
import { use } from "react";
import { findBestPreId, getPreRow, type PreIdStatus } from "../data";
import SendReminderFlow from "@/components/admin/precheckin/SendReminderFlow";
import RejectPreCheckInModal from "@/components/admin/precheckin/RejectPreCheckInModal";
import ApprovePreCheckInModal from "@/components/admin/precheckin/ApprovePreCheckInModal";

const ID_ICON_SRC: Record<PreIdStatus, string> = {
  Verified: "/icons/admin/verified1.png",
  Pending: "/icons/admin/flagged1.png",
  Flagged: "/icons/admin/flagged1.png",
  "Issue Detected": "/icons/admin/flagged1.png",
};

export default function PreCheckInDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const best = findBestPreId(id);
  if (!best) {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-600">
        Reservation not found.
      </div>
    );
  }
  const pre = getPreRow(best)!;
  // Preferences icon + tone (green when Set, red when Not Set)
  const prefOk = pre.preferences === "Set";
  const prefIconSrc = prefOk
    ? "/icons/admin/verified1.png"
    : "/icons/admin/flagged1.png";
  const prefIconBg = prefOk ? "bg-emerald-100" : "bg-rose-100";
  const prefTone = prefOk ? "text-emerald-700" : "text-rose-700";

  //   const sigOk = pre.signature === "Done";
  //   const sigIconSrc = sigOk
  //     ? "/icons/admin/verified1.png"
  //     : "/icons/admin/flagged1.png";
  //   const sigIconBg = sigOk ? "bg-emerald-100" : "bg-rose-100";
  //   const sigTone = sigOk ? "text-emerald-700" : "text-rose-700";

  // Normalize and map signature status
  const sigRaw = (pre.signature ?? "").toString().toLowerCase(); // "done" | "none" | "not signed"
  const sigOk = sigRaw === "done"; // Done => verified, everything else => flagged
  const sigLabel = sigOk ? "Captured" : "Not Captured";
  const sigIconSrc = sigOk
    ? "/icons/admin/verified1.png"
    : "/icons/admin/flagged1.png";
  const sigIconBg = sigOk ? "bg-emerald-100" : "bg-rose-100";
  const sigTone = sigOk ? "text-emerald-700" : "text-rose-700";

  // tones for ID Verification line
  const idTone =
    pre.idVerification === "Verified"
      ? "text-emerald-700"
      : pre.idVerification === "Pending"
      ? "text-amber-700"
      : "text-rose-700";

  const idIconBg =
    pre.idVerification === "Verified"
      ? "bg-emerald-100"
      : pre.idVerification === "Pending"
      ? "bg-amber-100"
      : "bg-rose-100";

  // simple placeholders for ISO dates/contact (since PRE_ROWS doesn't include them)
  const checkInISO = new Date().toISOString();
  const checkOutISO = new Date(
    Date.now() + 2 * 24 * 60 * 60 * 1000
  ).toISOString();
  const guestsLabel = "—";
  const guestEmail = "guest@example.com";
  const guestPhone = "—";

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="text-xs text-gray-500">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        ›{" "}
        <Link
          href="/admin/dashboard/sidescreens/pre-check-in"
          className="hover:underline"
        >
          Pre-Check-In
        </Link>{" "}
        › <span className="text-gray-700">Pre-Check-In Details</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">
        Pre-Check-In – Reservation {pre.id}
      </h1>

      {/* Guest Information */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Guest Information
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Name</div>
            <div className="text-gray-900">{pre.guestName}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Phone</div>
            <div className="text-gray-900">{pre.phone}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Email</div>
            <div className="text-gray-900">{pre.email}</div>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Booking Information
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Dates</div>
            <div className="text-gray-900 flex items-center gap-2">
              {pre.dates}
            </div>
          </div>

          <div>
            <div className="text-gray-500 text-xs mb-1">Room Type</div>
            <div className="text-gray-900">{pre.roomType}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Guests</div>
            <div className="text-gray-900">{pre.guests}</div>
          </div>
        </div>
      </section>

      {/* Pre-Check-In Steps */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Pre-Check-In Steps
        </div>
        <div className="p-2 md:p-4">
          {/* ID Verification (data-driven) */}
          <div className="flex items-start gap-3 p-4 border-b border-gray-100">
            <span
              className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${idIconBg}`}
            >
              <Image
                src={ID_ICON_SRC[pre.idVerification]}
                alt={`${pre.idVerification} icon`}
                width={12}
                height={12}
              />
            </span>
            <div className="text-sm">
              <div className="font-medium text-gray-900">ID Verification</div>
              <div className="text-gray-500 text-xs">
                Passport Uploaded,{" "}
                <span className={idTone}>{pre.idVerification}</span>
              </div>
            </div>
          </div>

          {/* Preferences */}
          {/* <div className="flex items-start gap-3 p-4 border-b border-gray-100">
            <span
              className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${idIconBg}`}
            >
              <Image
                src={ID_ICON_SRC[pre.idVerification]}
                alt={`${pre.idVerification} icon`}
                width={12}
                height={12}
              />
            </span>
            <div className="text-sm">
              <div className="font-medium text-gray-900">Preferences</div>
              <div className="text-gray-500 text-xs">
                {pre.preferences === "Set"
                  ? "King Bed, Vegetarian Meals"
                  : "Not Set"}
              </div>
            </div>
          </div> */}
          {/* Preferences (data-driven) */}
          <div className="flex items-start gap-3 p-4 border-b border-gray-100">
            <span
              className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${prefIconBg}`}
            >
              <Image
                src={prefIconSrc}
                alt={prefOk ? "Preferences set" : "Preferences not set"}
                width={12}
                height={12}
              />
            </span>
            <div className="text-sm">
              <div className="font-medium text-gray-900">Preferences</div>
              <div className="text-gray-500 text-xs">
                <span className={prefTone}>{prefOk ? "Set" : "Not Set"}</span>
              </div>
            </div>
          </div>

          {/* Digital Signature */}
          <div className="flex items-start gap-3 p-4">
            <span
              className={`mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full ${sigIconBg}`}
            >
              <Image
                src={sigIconSrc}
                alt={sigOk ? "Signature captured" : "Signature missing"}
                width={12}
                height={12}
              />
            </span>
            <div className="text-sm">
              <div className="font-medium text-gray-900">Digital Signature</div>
              <div className={`text-xs ${sigTone}`}>{sigLabel}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Status */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Status
        </div>
        <div className="p-6">
          {pre.idVerification === "Verified" ? (
            <span className="inline-flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700">
              ✓ Completed
            </span>
          ) : pre.idVerification === "Pending" ? (
            <span className="inline-flex items-center gap-2 rounded-md bg-[#FFF5E5] px-3 py-1.5 text-xs font-medium text-[#FF9800]">
              <Image
                src="/icons/admin/pending.png"
                alt="Attention required"
                width={12}
                height={12}
                className="inline-block"
              />
              Attention Required
            </span>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-md bg-rose-50 px-3 py-1.5 text-xs font-medium text-rose-700">
              <Image
                src="/icons/admin/flagged1.png"
                alt="Flagged"
                width={12}
                height={12}
                className="inline-block"
              />
              Attention Required
            </span>
          )}
        </div>
      </section>

      {/* ⬇️ Footer Actions (restored) */}

      <div className="flex items-center justify-end gap-3">
        {pre.idVerification === "Pending" ? (
          <SendReminderFlow
            triggerClass="rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
            reservationId={pre.id}
            guestName={pre.guestName}
            guestEmail={guestEmail}
            guestPhone={guestPhone}
            checkInISO={checkInISO}
            checkOutISO={checkOutISO}
            room={`${pre.roomType} × 1`}
            guestsLabel={guestsLabel}
            onSend={async () => {}}
          />
        ) : pre.idVerification === "Verified" && pre.signature === "Done" ? (
          <ApprovePreCheckInModal
            reservationId={pre.id}
            guestName={pre.guestName}
            checkInISO={checkInISO}
            checkOutISO={checkOutISO}
            room={`${pre.roomType} × 1`}
            guestsLabel={pre.guests}
            idVerified={true}
            preferences={pre.preferences === "Set" ? "Vegetarian Meals" : "—"}
            addOns={pre.addOns}
            signatureCaptured={true}
            onApprove={() => {}}
          />
        ) : (
          <RejectPreCheckInModal
            triggerClass="rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
            reservationId={pre.id}
            guestName={pre.guestName}
            checkInISO={checkInISO}
            checkOutISO={checkOutISO}
            room={`${pre.roomType} × 1`}
            guestsLabel={pre.guests}
            preferences={pre.preferences === "Set" ? "Vegetarian Meals" : "—"}
            addOns={pre.addOns}
            signatureCaptured={pre.signature === "Done"}
            onReject={() => {}}
          />
        )}
      </div>

      {/* <div className="flex items-center justify-end gap-3">
        <SendReminderFlow
          triggerClass="rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
          reservationId={pre.id}
          guestName={pre.guests}
          guestEmail={guestEmail}
          guestPhone={guestPhone}
          checkInISO={checkInISO}
          checkOutISO={checkOutISO}
          room={`${pre.roomType} × 1`}
          guestsLabel={guestsLabel}
          onSend={async () => {}}
        />

        <RejectPreCheckInModal
          triggerClass="rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95"
          reservationId={pre.id}
          guestName={pre.guestName}
          checkInISO={checkInISO}
          checkOutISO={checkOutISO}
          room={`${pre.roomType} × 1`}
          guestsLabel={pre.guests}
          // idVerified={pre.idVerification === "Verified"}
          preferences={pre.preferences === "Set" ? "Vegetarian Meals" : "—"}
          addOns={pre.addOns}
          signatureCaptured={pre.signature === "Done"}
          onReject={() => {}}
        />

        <ApprovePreCheckInModal
          reservationId={pre.id}
          guestName={pre.guestName}
          checkInISO={checkInISO}
          checkOutISO={checkOutISO}
          room={`${pre.roomType} × 1`}
          guestsLabel={pre.guests}
          idVerified={pre.idVerification === "Verified"}
          preferences={pre.preferences === "Set" ? "Vegetarian Meals" : "—"}
          addOns={pre.addOns}
          signatureCaptured={pre.signature === "Done"}
          onApprove={() => {}}
        />
      </div> */}
    </div>
  );
}
