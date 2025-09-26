// app/admin/dashboard/sidescreens/pre-check-in/data.ts

export type PreIdStatus = "Verified" | "Pending" | "Flagged" | "Issue Detected";
export type PreStatus = "Completed" | "Pending";
export type RoomType = "Deluxe" | "Executive" | "Suite";

export type Row = {
  id: string; // HT12345, HT12345-2, ...
  guest: string; // John Doe
  dates: string; // 20–23 Sept
  roomType: RoomType;
  status: PreStatus; // main status in table
  idVerification: PreIdStatus;
  preferences: "Set" | "Not Set";
  addOns: "None" | "Breakfast" | "Pickup" | "Breakfast, Pickup";
  signature: "Done" | "None";
};

// ⬇️ paste your MOCK rows here unchanged (renamed to PRE_ROWS)
export const PRE_ROWS: Row[] = [
  {
    id: "HT12345",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Deluxe",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "Breakfast",
    signature: "Done",
  },
  {
    id: "HT12345-2",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Executive",
    status: "Pending",
    idVerification: "Pending",
    preferences: "Not Set",
    addOns: "None",
    signature: "Done",
  },
  {
    id: "HT12345-3",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Flagged",
    preferences: "Set",
    addOns: "Pickup",
    signature: "Done",
  },
  {
    id: "HT12345-4",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Issue Detected",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-5",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-6",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-7",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-8",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-9",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
  },
  {
    id: "HT12345-10",
    guest: "John Doe",
    dates: "20–23 Sept",
    roomType: "Suite",
    status: "Completed",
    idVerification: "Verified",
    preferences: "Set",
    addOns: "None",
    signature: "None",
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
