"use client";

import Link from "next/link";
import { findBestMatchId, getReservation } from "../../data";
import { use, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

const ADD_ONS = [
  { key: "breakfast", label: "Breakfast ($20/day)", price: 20, perNight: true },
  { key: "pickup", label: "Airport Pickup ($40)", price: 40, perNight: false },
  { key: "late", label: "Late Checkout ($50)", price: 50, perNight: false },
] as const;

type AddonKey = (typeof ADD_ONS)[number]["key"];

export default function EditReservation({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const resolvedId = useMemo(() => findBestMatchId(id), [id]);
  if (!resolvedId) {
    return <div className="text-sm text-gray-600">Reservation not found.</div>;
  }
  const res = getReservation(resolvedId)!;
  const router = useRouter();

  // --- Seed form state from reservation ---
  const [checkIn, setCheckIn] = useState(res.booking.checkIn);
  const [checkOut, setCheckOut] = useState(res.booking.checkOut);
  const [roomType, setRoomType] = useState(res.booking.roomType);
  const [numRooms, setNumRooms] = useState(1);
  const [numAdults, setNumAdults] = useState(2);
  const [numChildren, setNumChildren] = useState(1);
  const [notes, setNotes] = useState("");

  // add-ons
  const [addons, setAddons] = useState<Record<AddonKey, boolean>>({
    breakfast: true,
    pickup: true,
    late: false,
  });

  // override options
  const [overrideAvailability, setOverrideAvailability] = useState(false);
  const [overrideWaiveDiff, setOverrideWaiveDiff] = useState(false);

  // helpers
  const nights = useMemo(() => {
    const d1 = new Date(checkIn);
    const d2 = new Date(checkOut);
    const ms = d2.getTime() - d1.getTime();
    const n = Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
    return n;
  }, [checkIn, checkOut]);

  // simple room pricing mock per night
  const roomRate = useMemo(() => {
    if (roomType === "Executive") return 260;
    if (roomType === "Suite") return 320;
    return 240; // Deluxe Room
  }, [roomType]);

  const roomSubtotal = roomRate * nights * numRooms;

  const addonsSubtotal = useMemo(() => {
    let total = 0;
    for (const a of ADD_ONS) {
      if (addons[a.key]) {
        total += a.perNight ? a.price * nights * numRooms : a.price;
      }
    }
    return total;
  }, [addons, nights, numRooms]);

  const grandTotal = roomSubtotal + addonsSubtotal;
  const paidAlready = res.booking.paymentStatus.amountUSD ?? 0;
  const balanceDue = Math.max(0, grandTotal - paidAlready);

  const fmtUSD = (n: number) =>
    n.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    });

  const fmtDateLong = (iso: string) =>
    new Date(iso).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });

  const onToggleAddon = (k: AddonKey) =>
    setAddons((s) => ({ ...s, [k]: !s[k] }));

  const checkAvailability = () => {
    // mock check
    alert(
      `Checked availability for ${nights} night(s) • ${roomType} • ${numRooms} room(s).`
    );
  };

  const onCancel = () => {
    router.push(`/admin/dashboard/sidescreens/reservations/${resolvedId}`);
  };

  const onSave = () => {
    // pretend we persisted; navigate back to details
    router.push(`/admin/dashboard/sidescreens/reservations/${resolvedId}`);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
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
        › <span className="text-gray-700">Edit Reservation</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">
        Edit Reservation – {resolvedId}
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

          <div className="md:col-span-1">
            <div className="text-gray-500 text-xs mb-1">Payment Status</div>
            <span
              className={`inline-flex items-center gap-2 rounded-md px-2.5 py-1 text-xs font-medium ${
                res.booking.paymentStatus.label === "Paid"
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-amber-50 text-amber-700"
              }`}
            >
              {res.booking.paymentStatus.label}{" "}
              {res.booking.paymentStatus.amountUSD
                ? `(${fmtUSD(res.booking.paymentStatus.amountUSD)})`
                : null}
            </span>
          </div>

          <div>
            <div className="text-gray-500 text-xs mb-1">Source</div>
            <div className="text-gray-900">{res.booking.source}</div>
          </div>
        </div>
      </section>

      {/* Dates */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Dates
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Check‑In Date</div>
            <input
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            />
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Check‑Out Date</div>
            <input
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            />
          </div>
          <div className="flex items-end">
            <button
              onClick={checkAvailability}
              className="rounded-lg bg-[#A57865] text-white px-4 py-2 text-sm hover:opacity-75"
            >
              Check Availability
            </button>
          </div>
          <div className="md:col-span-3 text-xs text-gray-500">
            {fmtDateLong(checkIn)} → {fmtDateLong(checkOut)} • {nights} night(s)
          </div>
        </div>
      </section>

      {/* Room & Guests */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Room & Guests
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
          <div>
            <div className="text-gray-500 text-xs mb-1">Room Type</div>
            <select
              value={roomType}
              onChange={(e) => setRoomType(e.target.value as any)}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              <option>Deluxe Room</option>
              <option>Executive</option>
              <option>Suite</option>
            </select>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">No. of Rooms</div>
            <select
              value={numRooms}
              onChange={(e) => setNumRooms(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">No. of Guests</div>
            <select
              value={numAdults}
              onChange={(e) => setNumAdults(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n} Adult{n > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="text-gray-500 text-xs mb-1">Children</div>
            <select
              value={numChildren}
              onChange={(e) => setNumChildren(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
            >
              {[0, 1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n} Children
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Add‑Ons */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Add‑Ons
        </div>
        <div className="p-6 space-y-3 text-sm">
          {ADD_ONS.map((a) => (
            <label key={a.key} className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={addons[a.key]}
                onChange={() => onToggleAddon(a.key)}
                className="h-4 w-4 rounded border-gray-300 accent-[#A57865]"
              />
              <span className="text-gray-800">{a.label}</span>
            </label>
          ))}
        </div>
      </section>

      {/* Notes */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Notes
        </div>
        <div className="p-6 text-sm">
          <div className="text-gray-500 text-xs mb-1">Special Requests</div>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            placeholder="Any Request"
            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2"
          />
        </div>
      </section>

      {/* Pricing Adjustment */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Pricing Adjustment
        </div>
        <div className="p-6 text-sm space-y-3">
          <div className="flex items-center justify-between">
            <div className="text-gray-600">
              Room ({numRooms} × {nights} night{nights > 1 ? "s" : ""} @{" "}
              {fmtUSD(roomRate)})
            </div>
            <div className="text-gray-900">{fmtUSD(roomSubtotal)}</div>
          </div>
          {ADD_ONS.map((a) =>
            addons[a.key] ? (
              <div key={a.key} className="flex items-center justify-between">
                <div className="text-gray-600">
                  {a.label.replace(/\s\(.+\)$/, "")}
                  {a.perNight ? ` (${numRooms} × ${nights})` : ""}
                </div>
                <div className="text-gray-900">
                  {fmtUSD(a.perNight ? a.price * nights * numRooms : a.price)}
                </div>
              </div>
            ) : null
          )}

          <div className="border-t border-gray-100 pt-3 flex items-center justify-between">
            <div className="text-gray-600">Total</div>
            <div className="text-gray-900">{fmtUSD(grandTotal)}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-gray-600">Paid</div>
            <div className="text-gray-900">{fmtUSD(paidAlready)}</div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-[#E02424] font-medium">Balance Due</div>
            <div className="text-[#E02424] font-medium">
              {fmtUSD(balanceDue)}
            </div>
          </div>

          <div>
            <button
              className="mt-2 rounded-lg bg-[#A57865] text-white px-4 py-2 text-sm  hover:opacity-75"
              onClick={() => alert("Collect payment flow goes here.")}
            >
              Collect Payment
            </button>
          </div>
        </div>
      </section>

      {/* Admin Override Options */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <div className="p-4 border-b border-gray-100 text-sm font-medium text-gray-900">
          Admin Override Options
        </div>
        <div className="p-6 space-y-3 text-sm">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={overrideAvailability}
              onChange={(e) => setOverrideAvailability(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 accent-[#A57865]"
            />
            <span>
              Override availability (force booking even if room not available)
            </span>
          </label>
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={overrideWaiveDiff}
              onChange={(e) => setOverrideWaiveDiff(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            <span>Waive payment difference (e.g., VIP guest)</span>
          </label>
        </div>
      </section>

      {/* Footer actions */}
      <div className="flex items-center justify-end gap-3">
        <button
          onClick={onCancel}
          className="rounded-lg border border-[#A57865] bg-white px-4 py-2 text-sm text-[#A57865] hover:bg-[#A57865] hover:text-white"
        >
          Cancel
        </button>
        <button
          onClick={onSave}
          className="rounded-lg bg-[#A57865] text-white px-4 py-2 text-sm hover:opacity-75"
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
