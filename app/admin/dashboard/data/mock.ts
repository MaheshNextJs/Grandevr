// app/admin/dashboard/data/mock.ts

// ----- KPI types + data -----
export type Kpi =
  | {
      label: string;
      value: string;
      icon?: string;
      footerLabel: string; // e.g. "Today", "This Month", "Guests"
      delta?: { value: string; dir: "up" | "down"; note: string };
    }
  | {
      label: string;
      value: string;
      icon?: string;
      footerNote: string; // e.g. "Based on 1,245 reviews"
    };

export const kpis: Kpi[] = [
  {
    label: "Occupancy",
    value: "82%",
    icon: "/icons/admin/card1.png",
    footerLabel: "Today",
    delta: { value: "10%", dir: "up", note: "vs last week" },
  },
  {
    label: "Revenue",
    value: "82%",
    icon: "/icons/admin/card2.png",
    footerLabel: "This Month",
    delta: { value: "10%", dir: "up", note: "vs last month" },
  },
  {
    label: "Pending Pre-Check-Ins",
    value: "82%",
    icon: "/icons/admin/card3.png",
    footerLabel: "Guests",
  },
  {
    label: "Guest Satisfaction",
    value: "4.6 / 5",
    icon: "/icons/admin/card4.png",
    footerNote: "Based on 1,245 reviews",
  },
];

export const insights = [
  {
    title: "Pending Pre-Check-In",
    desc: "23 guests have not completed Pre-Check-In today.",
    tone: "alert",
    action: "Review Pre-Check-Ins",
  },
  {
    title: "Reputation Alert",
    desc: "5 new negative reviews detected in the last 24 hours.",
    tone: "warn",
    action: "View Reputation",
  },
  {
    title: "Staffing Recommendation",
    desc: "Upcoming weekend occupancy at 95%. Additional front desk staff may be required.",
    tone: "info",
    action: "Manage Staff Schedule",
  },
];

// ----- Chart & insights mock data -----
export const occupancy = [
  { date: "Sep 01", occupancy: 22 },
  { date: "Sep 02", occupancy: 35 },
  { date: "Sep 03", occupancy: 65 },
  { date: "Sep 04", occupancy: 48 },
  { date: "Sep 05", occupancy: 72 },
  { date: "Sep 06", occupancy: 58 },
  { date: "Sep 07", occupancy: 60 },
];

export const bookingSources = [
  { name: "Direct Website", value: 120 },
  { name: "OTAs", value: 240 },
  { name: "Corporate", value: 180 },
  { name: "Walk-ins", value: 160 },
];

export const revenueByRoomType = [
  { name: "Deluxe", value: 120000 },
  { name: "Executive", value: 175000 },
  { name: "Suite", value: 145000 },
];
