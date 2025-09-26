// app/admin/dashboard/sidescreens/pre-check-in/data.ts

export type PreIdStatus = "Verified" | "Pending" | "Flagged" | "Issue Detected";
export type PreStatus = "Completed" | "Pending";
export type RoomType = "Deluxe" | "Executive" | "Suite";

export type Row = {
  id: string;
  guestName: string;
  guests: string;
  dates: string;
  roomType: RoomType;
  status: PreStatus;
  idVerification: PreIdStatus;
  preferences: "Set" | "Not Set";
  addOns: "None" | "Breakfast" | "Pickup" | "Breakfast, Pickup";
  signature: "Done" | "None";
  phone?: string;
  email?: string;
};

// ⬇️ MOCK rows
export const PRE_ROWS: Row[] = [
  {
    id: "HT12345",
    guestName: "John Doe",
    guests: "2 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Deluxe",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "Breakfast",
    signature: "Done",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-2",
    guestName: "John Doe",
    guests: "1 Adult, 1 Child",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Executive",
    status: "Pending",
    idVerification: "Pending",
    preferences: "Not Set",
    addOns: "None",
    signature: "Done",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-3",
    guestName: "John Doe",
    guests: "3 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Flagged",
    preferences: "Set",
    addOns: "Pickup",
    signature: "Done",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-4",
    guestName: "John Doe",
    guests: "2 Adults, 1 Child",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Issue Detected",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-5",
    guestName: "John Doe",
    guests: "2 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-6",
    guestName: "John Doe",
    guests: "1 Adult",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-7",
    guestName: "John Doe",
    guests: "2 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-8",
    guestName: "John Doe",
    guests: "2 Adults, 2 Children",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-9",
    guestName: "John Doe",
    guests: "3 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
  {
    id: "HT12345-10",
    guestName: "John Doe",
    guests: "2 Adults",
    dates: "20 Sep 2025–23 Sep 2025",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
    phone: "+91 98765 43210",
    email: "john.doe@example.com",
  },
];

// helpers to reuse across pages
export function getPreRow(id: string): Row | null {
  return PRE_ROWS.find((r) => r.id === id) ?? null;
}

export function findBestPreId(id: string): string | null {
  // allow HT12345 or HT12345-2… return the latest variant that exists
  if (PRE_ROWS.some((r) => r.id === id)) return id;
  const base = id.replace(/-\d+$/, "");
  const candidates = PRE_ROWS.filter(
    (r) => r.id === base || r.id.startsWith(base + "-")
  )
    .map((r) => {
      const n = parseInt(r.id.split("-")[1] || "0", 10);
      return { id: r.id, n: Number.isFinite(n) ? n : 0 };
    })
    .sort((a, b) => a.n - b.n);
  return candidates.at(-1)?.id ?? null;
}
