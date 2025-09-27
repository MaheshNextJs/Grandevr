// --- types ---
export type Sentiment = "Positive" | "Neutral" | "Negative";

export type Review = {
  id: string;
  date: string; // ISO (e.g., "2025-09-21")
  guest: string;
  source: string; // e.g., "Google"
  rating: 1 | 2 | 3 | 4 | 5;
  sentiment: Sentiment;
  status?: "Escalated" | ""; // optional chip
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

// --- sample data (expand as you like) ---
export const REVIEWS: Review[] = [
  {
    id: "r1",
    date: "2025-09-21",
    guest: "Sarah Lee",
    source: "Google",
    rating: 4,
    sentiment: "Positive",
    status: "Escalated",
    comment: "Amazing service at check-in.",
  },
  {
    id: "r2",
    date: "2025-09-20",
    guest: "John Doe",
    source: "TripAdvisor",
    rating: 3,
    sentiment: "Negative",
    comment: "Room cleanliness could be improved.",
  },
  {
    id: "r3",
    date: "2025-09-20",
    guest: "John Doe",
    source: "TripAdvisor",
    rating: 4,
    sentiment: "Neutral",
    comment: "Decent stay overall.",
  },
  {
    id: "r4",
    date: "2025-09-20",
    guest: "John Doe",
    source: "Google",
    rating: 4,
    sentiment: "Neutral",
    comment: "Quick check-in, average breakfast.",
  },
  {
    id: "r5",
    date: "2025-09-20",
    guest: "John Doe",
    source: "Google",
    rating: 5,
    sentiment: "Neutral",
    comment: "Spacious room, quiet floor.",
  },
  {
    id: "r6",
    date: "2024-09-20",
    guest: "Johnn Doe",
    source: "Googlfe",
    rating: 5,
    sentiment: "Neutral",
    comment: "Spacious room, quiet floor.",
  },
  {
    id: "r7",
    date: "2025-59-20",
    guest: "John Doe",
    source: "Goog5le",
    rating: 4,
    sentiment: "Neutral",
    comment: "Spaciogggus room, quiet floor.",
  },

  {
    id: "r8",
    date: "2025-09-60",
    guest: "John Doe",
    source: "Googlnje",
    rating: 3,
    sentiment: "Neutral",
    comment: "Spacious room, quiet floor.",
  },
];
