// app/admin/reservations/room-assignment/data.ts
// Centralized types and mock data for the Room Assignment screen

export type ResStatus = "Confirmed" | "Pending" | "Cancelled";
export type RoomStatus = "Clean & Ready" | "Occupied" | "Dirty" | "Maintenance";

export type UnassignedReservation = {
  id: string;
  guest: string;
  dates: string; // e.g., "20-21 Sept"
  roomType: string; // e.g., "Deluxe"
  occupancy: string; // e.g., "2 Adults"
  status: ResStatus;
};

export type Room = {
  roomNo: string;
  roomType: string;
  availableDates: string; // e.g., "Sept 20-21"
  status: RoomStatus;
};

// Dropdown options
export const ROOM_TYPES = [
  "All Room Types",
  "Deluxe",
  "Executive",
  "Suite",
] as const;
export const ALL_STATUSES = [
  "All Status",
  "Clean & Ready",
  "Occupied",
  "Dirty",
  "Maintenance",
] as const;

// ----------------------
// Mock Data
// ----------------------
export const UNASSIGNED: UnassignedReservation[] = [
  {
    id: "HT10028",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Deluxe",
    occupancy: "2 Adults",
    status: "Confirmed",
  },
  {
    id: "HT10029",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Executive",
    occupancy: "1 Adult",
    status: "Confirmed",
  },
  {
    id: "HT10030",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Suite",
    occupancy: "2 Adults",
    status: "Confirmed",
  },
  {
    id: "HT10031",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Suite",
    occupancy: "2 Adults",
    status: "Confirmed",
  },
  {
    id: "HT10032",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Suite",
    occupancy: "2 Adults",
    status: "Confirmed",
  },
  {
    id: "HT10033",
    guest: "John Doe",
    dates: "20-21 Sept",
    roomType: "Deluxe",
    occupancy: "2 Adults",
    status: "Confirmed",
  },
];

export const ROOMS: Room[] = [
  {
    roomNo: "101",
    roomType: "Deluxe",
    availableDates: "Sept 19-20",
    status: "Clean & Ready",
  },
  {
    roomNo: "121",
    roomType: "Executive",
    availableDates: "Sept 20-22",
    status: "Clean & Ready",
  },
  {
    roomNo: "201",
    roomType: "Suite",
    availableDates: "Sept 20-21",
    status: "Occupied",
  },
  {
    roomNo: "202",
    roomType: "Suite",
    availableDates: "Sept 20-22",
    status: "Clean & Ready",
  },
  {
    roomNo: "303",
    roomType: "Suite",
    availableDates: "Sept 20-21",
    status: "Dirty",
  },
  {
    roomNo: "304",
    roomType: "Deluxe",
    availableDates: "Sept 20-21",
    status: "Clean & Ready",
  },
];

export const ASSIGNED: Room[] = [
  {
    roomNo: "101",
    roomType: "Deluxe",
    availableDates: "Sept 20-21",
    status: "Clean & Ready",
  },
  {
    roomNo: "121",
    roomType: "Executive",
    availableDates: "Sept 20-21",
    status: "Clean & Ready",
  },
  {
    roomNo: "201",
    roomType: "Suite",
    availableDates: "Sept 20-21",
    status: "Occupied",
  },
  {
    roomNo: "202",
    roomType: "Suite",
    availableDates: "Sept 20-21",
    status: "Clean & Ready",
  },
  {
    roomNo: "303",
    roomType: "Suite",
    availableDates: "Sept 20-21",
    status: "Dirty",
  },
  {
    roomNo: "305",
    roomType: "Deluxe",
    availableDates: "Sept 20-21",
    status: "Clean & Ready",
  },
];
