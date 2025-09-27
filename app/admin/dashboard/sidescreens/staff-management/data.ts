// app/admin/staff/data.ts

export type StaffStatus = "Active" | "On Leave" | "Inactive";
export type StaffShift = "Morning" | "Evening" | "Night";
export type StaffRole =
  | "Front Desk"
  | "Housekeeping"
  | "Concierge"
  | "Maintenance"
  | "F&B";

export type Staff = {
  id: string;
  name: string;
  shift: StaffShift;
  role: StaffRole;
  status: StaffStatus;
  nextAssignment: string; // e.g., "Sept 20 – Check-in"
};

export const ROLES: StaffRole[] = [
  "Front Desk",
  "Housekeeping",
  "Concierge",
  "Maintenance",
  "F&B",
];

export const SHIFTS: StaffShift[] = ["Morning", "Evening", "Night"];

export const STATUSES: StaffStatus[] = ["Active", "On Leave", "Inactive"];

export const STAFF: Staff[] = Array.from({ length: 10 }).map((_, i) => {
  const base: Staff = {
    id: `STF${String(i + 1).padStart(3, "0")}`,
    name: ["Sarah Lee", "John Doe", "Jane Smith", "David Kim", "Priya N."][
      i % 5
    ],
    shift: (["Morning", "Evening", "Night"] as StaffShift[])[i % 3],
    role: (
      [
        "Front Desk",
        "Housekeeping",
        "Concierge",
        "Maintenance",
        "F&B",
      ] as StaffRole[]
    )[i % 5],
    status: (["Active", "On Leave", "Inactive"] as StaffStatus[])[
      i % 3 === 0 ? 0 : i % 3 === 1 ? 1 : 0 // bias to Active
    ],
    nextAssignment:
      i % 4 === 0
        ? "None"
        : ["Sept 20 – Check‑in", "Sept 21 – Check‑out"][i % 2],
  };

  return base;
});
