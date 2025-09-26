// Central mock data + helpers

export type ReservationDetail = {
  id: string; // e.g., HT12345 or HT12345-2
  guest: { name: string; phone: string; email: string };
  booking: {
    checkIn: string; // ISO string
    checkOut: string; // ISO string
    roomType: "Deluxe Room" | "Executive" | "Suite";
    guests: string; // "2 Adults"
    addOns: string; // "Breakfast, Airport Pickup"
    source: "Website" | "OTA" | "Walk‑in";
    paymentStatus: { label: "Paid" | "Pending"; amountUSD?: number };
  };
  // We keep a simple single status that the list maps to pills
  status: "Completed" | "Pre‑Check‑In" | "Checked‑In";
};

const base: Omit<ReservationDetail, "id" | "status"> = {
  guest: {
    name: "John Doe",
    phone: "+91 9876543210",
    email: "john@example.com",
  },
  booking: {
    checkIn: "2025-09-20",
    checkOut: "2025-09-23",
    roomType: "Deluxe Room",
    guests: "2 Adults",
    addOns: "Breakfast, Airport Pickup",
    source: "Website",
    paymentStatus: { label: "Paid", amountUSD: 820 },
  },
};

export const RESERVATIONS: ReservationDetail[] = [
  {
    id: "HT12345",
    ...base,
    status: "Pre‑Check‑In",
    booking: {
      ...base.booking,
      paymentStatus: { label: "Paid", amountUSD: 820 },
    },
  },
  {
    id: "HT12345-2",
    ...base,
    status: "Completed",
    booking: {
      ...base.booking,
      roomType: "Executive",
      paymentStatus: { label: "Pending" },
    },
  },
  {
    id: "HT12345-3",
    ...base,
    status: "Checked‑In",
    booking: {
      ...base.booking,
      roomType: "Suite",
      paymentStatus: { label: "Pending" },
    },
  },
  {
    id: "HT12345-4",
    ...base,
    status: "Completed",
    booking: {
      ...base.booking,
      paymentStatus: { label: "Paid", amountUSD: 820 },
    },
  },
  {
    id: "HT12345-5",
    ...base,
    status: "Pre‑Check‑In",
    booking: { ...base.booking, paymentStatus: { label: "Pending" } },
  },
  {
    id: "HT12345-6",
    ...base,
    status: "Checked‑In",
    booking: {
      ...base.booking,
      roomType: "Executive",
      paymentStatus: { label: "Paid", amountUSD: 700 },
    },
  },
  {
    id: "HT12345-7",
    ...base,
    status: "Completed",
    booking: { ...base.booking, paymentStatus: { label: "Pending" } },
  },
  {
    id: "HT12345-8",
    ...base,
    status: "Pre‑Check‑In",
    booking: {
      ...base.booking,
      roomType: "Suite",
      paymentStatus: { label: "Paid", amountUSD: 980 },
    },
  },
  {
    id: "HT12345-9",
    ...base,
    status: "Checked‑In",
    booking: { ...base.booking, paymentStatus: { label: "Pending" } },
  },
  {
    id: "HT12345-10",
    ...base,
    status: "Completed",
    booking: {
      ...base.booking,
      paymentStatus: { label: "Paid", amountUSD: 820 },
    },
  },
];

export function getReservation(id: string) {
  return RESERVATIONS.find((r) => r.id === id) || null;
}

export function findBestMatchId(id: string): string | null {
  // exact match first
  if (RESERVATIONS.some((r) => r.id === id)) return id;

  const baseId = id.split("-")[0];
  const candidates = RESERVATIONS.filter(
    (r) => r.id === baseId || r.id.startsWith(`${baseId}-`)
  );
  if (!candidates.length) return null;

  // choose highest numeric suffix (base counts as 0)
  const best = candidates
    .map((r) => {
      const parts = r.id.split("-");
      const n = parts[1] ? Number(parts[1]) : 0;
      return { id: r.id, n: Number.isFinite(n) ? n : 0 };
    })
    .sort((a, b) => b.n - a.n)[0];

  return best.id;
}
