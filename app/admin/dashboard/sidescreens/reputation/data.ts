// --- types ---
export type Sentiment = "Positive" | "Neutral" | "Negative";

// Add a richer status union (matches your UI logic)
export type ReviewStatus =
  | "Responded"
  | "Escalated"
  | "Pending"
  | "Critical"
  | "";

// Keep the Review type name the same so imports don’t break
export type Review = {
  id: string;
  date: string; // ISO (e.g., "2025-09-21")
  guest: string;
  source: string; // e.g., "Google"
  rating: 1 | 2 | 3 | 4 | 5;
  sentiment: Sentiment;
  status?: ReviewStatus; // optional chip
  comment: string;
};

// Source options for the filter dropdown
export const SOURCES = ["All", "Google", "TripAdvisor", "Booking.com"] as const;

// Badge styles for sentiment
export const sentimentTone: Record<Sentiment, { badge: string }> = {
  Positive: { badge: "bg-emerald-50 text-emerald-700" },
  Neutral: { badge: "bg-gray-100 text-gray-700" },
  Negative: { badge: "bg-rose-50 text-rose-700" },
};

// Simple stats from a list of reviews
export function computeStats(list: Review[]) {
  const n = list.length || 1;
  const pos = list.filter((r) => r.sentiment === "Positive").length;
  const neu = list.filter((r) => r.sentiment === "Neutral").length;
  const neg = list.filter((r) => r.sentiment === "Negative").length;
  const avg = list.reduce((s, r) => s + r.rating, 0) / (list.length || 1);

  const pct = (v: number) => Math.round((v / n) * 100);

  return {
    positivePct: pct(pos),
    neutralPct: pct(neu),
    negativePct: pct(neg),
    avg,
  };
}
export const reviewStatusTone: Record<
  ReviewStatus,
  { bg: string; text: string }
> = {
  Responded: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Escalated: { bg: "bg-rose-50", text: "text-rose-700" },
  Pending: { bg: "bg-amber-50", text: "text-amber-700" },
  Critical: { bg: "bg-rose-100", text: "text-rose-800" },
  "": { bg: "", text: "" },
};

// --- sample data (valid dates + a mix of statuses for your conditional buttons) ---
export const REVIEWS: Review[] = [
  {
    id: "r1",
    date: "2025-09-21",
    guest: "Sarah Lee",
    source: "Google",
    rating: 5,
    sentiment: "Positive",
    status: "Responded", // -> View only
    comment: "Amazing service at check-in.",
  },
  {
    id: "r2",
    date: "2025-09-20",
    guest: "John Doe",
    source: "TripAdvisor",
    rating: 3,
    sentiment: "Negative",
    status: "Escalated", // -> View Task
    comment: "Room cleanliness could be improved.",
  },
  {
    id: "r3",
    date: "2025-09-20",
    guest: "John Doe",
    source: "TripAdvisor",
    rating: 4,
    sentiment: "Neutral",
    status: "Pending", // -> Respond AI + Escalate
    comment: "Decent stay overall.",
  },
  {
    id: "r4",
    date: "2025-09-20",
    guest: "John Doe",
    source: "Google",
    rating: 4,
    sentiment: "Neutral",
    status: "Critical", // -> Respond AI + Escalate
    comment: "Very slow check-in; lobby was crowded.",
  },
  {
    id: "r5",
    date: "2025-09-19",
    guest: "Priya N.",
    source: "Booking.com",
    rating: 5,
    sentiment: "Positive",
    status: "", // -> dash, only View
    comment: "Spacious room, quiet floor.",
  },
  {
    id: "r6",
    date: "2025-09-18",
    guest: "David Kim",
    source: "Google",
    rating: 2,
    sentiment: "Negative",
    status: "Escalated",
    comment: "Air conditioner noisy at night.",
  },
  {
    id: "r7",
    date: "2025-09-18",
    guest: "Jane Smith",
    source: "TripAdvisor",
    rating: 3,
    sentiment: "Neutral",
    status: "Pending",
    comment: "Breakfast options were limited.",
  },
  {
    id: "r8",
    date: "2025-09-17",
    guest: "Michael Brown",
    source: "Booking.com",
    rating: 4,
    sentiment: "Positive",
    status: "Responded",
    comment: "Friendly staff and fast checkout.",
  },
  {
    id: "r9",
    date: "2025-09-17",
    guest: "Anna Lopez",
    source: "Google",
    rating: 1,
    sentiment: "Negative",
    status: "Critical",
    comment: "Found hair in the bathroom; very disappointed.",
  },
  {
    id: "r10",
    date: "2025-09-16",
    guest: "Tom H.",
    source: "TripAdvisor",
    rating: 4,
    sentiment: "Neutral",
    status: "", // no special actions
    comment: "Good location, room was okay.",
  },
];
