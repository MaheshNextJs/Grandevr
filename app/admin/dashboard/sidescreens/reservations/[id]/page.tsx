"use client";
import { redirect, notFound } from "next/navigation";
import Link from "next/link";
import { findBestMatchId, getReservation } from "../data";
import { useRouter } from "next/navigation";
import { use } from "react";
import CancelReservationFlow from "@/components/admin/reservations/CancelReservationFlow";

export default function ReservationDetails({
  params,
}: {
  params: Promise<{ id: string }>; // ⬅️ params is a Promise now
}) {
  const { id } = use(params); // ⬅️ unwrap
  const best = findBestMatchId(id);
  if (!best) return notFound();
  if (best !== id) {
    redirect(`/admin/dashboard/sidescreens/reservations/${best}`);
  }
  const router = useRouter();
  const res = getReservation(best)!;

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  const paid = res.booking.paymentStatus.label === "Paid";

  return (
    <div className="space-y-4">
      <nav className="text-xs text-gray-500">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>{" "}
        ›{" "}
        <Link
          href="/admin/dashboard/sidescreens/reservations"
          className="hover:underline"
        >
          Reservations
        </Link>{" "}
        › <span className="text-gray-700">Reservation Details</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">
        Reservation Details – {res.id}
      </h1>

      {/* Guest Information */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Guest Information
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Name</div>
            <div className="text-gray-900">{res.guest.name}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Phone</div>
            <div className="text-gray-900">{res.guest.phone}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Email</div>
            <div className="text-gray-900">{res.guest.email}</div>
          </div>
        </div>
      </section>

      {/* Booking Information */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Booking Information
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-6 text-sm">
          <div className="md:col-span-1">
            <div className="text-gray-500 text-xs mb-1">Dates</div>
            <div className="text-gray-900 flex items-center gap-2">
              {fmt(res.booking.checkIn)}{" "}
              <span className="text-gray-400">→</span>{" "}
              {fmt(res.booking.checkOut)}
            </div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Room Type</div>
            <div className="text-gray-900">{res.booking.roomType}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Guests</div>
            <div className="text-gray-900">{res.booking.guests}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Add‑Ons</div>
            <div className="text-gray-900">{res.booking.addOns}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Source</div>
            <div className="text-gray-900">{res.booking.source}</div>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Payment Status</div>
            <span
              className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium ${
                paid
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {res.booking.paymentStatus.label}
              {paid && res.booking.paymentStatus.amountUSD
                ? ` ($${res.booking.paymentStatus.amountUSD})`
                : null}
            </span>
          </div>
        </div>
      </section>

      {/* Pre‑Check‑In */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Pre‑Check‑In
        </div>
        <div className="p-6 text-sm">
          <div className="text-gray-500 text-xs mb-1">Status</div>
          <span
            className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium ${
              res.status === "Completed"
                ? "bg-emerald-50 text-emerald-700"
                : res.status === "Pre‑Check‑In"
                ? "bg-amber-50 text-amber-700"
                : "bg-sky-50 text-sky-700"
            }`}
          >
            {res.status}
          </span>
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-wrap justify-end gap-3 pt-2 px-10">
        <button
          onClick={() =>
            router.push(
              `/admin/dashboard/sidescreens/reservations/${best}/edit`
            )
          }
          className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
        >
          Modify Reservation
        </button>
        {/* <button className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50">
          Cancel Reservation
        </button> */}
        <CancelReservationFlow
          triggerClass="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50"
          reservationId={res.id}
          guestName={res.guest.name}
          roomType={res.booking.roomType}
          checkInISO={res.booking.checkIn}
          checkOutISO={res.booking.checkOut}
          paidAmount={res.booking.paymentStatus.amountUSD ?? 0}
          penaltyAmount={120}
        />
        <button className="rounded-sm border border-gray-300 bg-white px-4 py-2 text-[12px] text-gray-700 hover:bg-gray-50">
          Assign Room
        </button>
        <button className="rounded-sm bg-[#A57865] text-white px-4 py-2 text-[12px] hover:opacity-95">
          Send Email to Guest
        </button>
      </div>
    </div>
  );
}
