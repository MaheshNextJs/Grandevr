// Types for table rows
export type InsightRow = {
  date: string; // e.g., "Sept 21"
  category: string; // e.g., "Reservations"
  summary: string; // e.g., "High cancellation rate (12%) from OTA bookings."
  suggestion: string; // e.g., "Offer flexible check-in incentives."
  action: string; // e.g., "View Detail" | "Reassign" | "Create Offer"
};

// Base few rows (match screenshot feel)
const base: InsightRow[] = [
  {
    date: "Sept 21",
    category: "Reservations",
    summary: "High cancellation rate (12%) from OTA bookings.",
    suggestion: "Offer flexible check-in incentives.",
    action: "View Detail",
  },
  {
    date: "Sept 20",
    category: "Reputation",
    summary: "3 critical reviews flagged this week.",
    suggestion: "Escalate to staff & respond quickly.",
    action: "View Detail",
  },
  {
    date: "Sept 20",
    category: "Staff",
    summary: "Evening shifts understaffed on Sept 28 (forecasted).",
    suggestion: "Add 2 staff to cover.",
    action: "Reassign",
  },
  {
    date: "Sept 20",
    category: "Staff",
    summary: "35% of guests upgraded to deluxe rooms at check-in.",
    suggestion: "Bundle upgrades with breakfast.",
    action: "Create Offer",
  },
];

// Fill the rest to simulate ~100 rows (like screenshot footer)
const repeats: InsightRow[] = Array.from({ length: 96 }, (_, i) => ({
  date: "Sept 20",
  category: i % 2 === 0 ? "John Doe" : "Reservations",
  summary: "High cancellation rate (12%) from OTA bookings.",
  suggestion: "Offer flexible check-in incentives.",
  action: "View Detail",
}));

export const INSIGHTS: InsightRow[] = [...base, ...repeats];
