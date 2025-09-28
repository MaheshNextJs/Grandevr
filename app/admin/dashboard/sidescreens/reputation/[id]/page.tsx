"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { REVIEWS, type Review } from "../data";

import ResponseSentModal from "@/components/admin/reputation/ResponseSentModal";
import RespondToReviewModal from "@/components/admin/reputation/RespondToReviewModal";
import EscalateReviewModal from "@/components/admin/reputation/EscalateReviewModal";
import EscalatedSuccessModal from "@/components/admin/reputation/EscalatedSuccessModal";

// Helpers
const formatDate = (input: string | Date) => {
  const d = new Date(input);
  if (isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const sentimentStyles: Record<
  Review["sentiment"],
  { bg: string; text: string }
> = {
  Positive: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Neutral: { bg: "bg-gray-100", text: "text-gray-700" },
  Negative: { bg: "bg-rose-50", text: "text-rose-700" },
};

const statusStyles: Record<
  NonNullable<Review["status"]>,
  { bg: string; text: string }
> = {
  Responded: { bg: "bg-emerald-50", text: "text-emerald-700" },
  Escalated: { bg: "bg-rose-50", text: "text-rose-700" },
  Pending: { bg: "bg-amber-50", text: "text-amber-700" },
  Critical: { bg: "bg-rose-50", text: "text-rose-700" },
  "": { bg: "bg-sky-50", text: "text-sky-700" },
};

function KV({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start">
      <div className="text-[11px] text-gray-500 mb-1">{label}</div>
      <div className="text-[13px] text-gray-900">{value}</div>
    </div>
  );
}

function StarRow({ count }: { count: number }) {
  return (
    <div className="inline-flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${
            i < count ? "fill-amber-400" : "fill-gray-200"
          }`}
        >
          <path d="M10 15.27 16.18 19l-1.64-7.03L20 7.24l-7.19-.61L10 0 7.19 6.63 0 7.24l5.46 4.73L3.82 19z" />
        </svg>
      ))}
    </div>
  );
}

export default function ReviewDetailPage() {
  const { id } = useParams<{ id: string }>();
  const review = useMemo(() => REVIEWS.find((r) => r.id === id) ?? null, [id]);

  const [openRespond, setOpenRespond] = useState(false);
  const [openSuccess, setOpenSuccess] = useState(false);
  const [openEscalate, setOpenEscalate] = useState(false);
  const [openEscalateSuccess, setOpenEscalateSuccess] = useState(false);
  const [lastEscalation, setLastEscalation] = useState<{
    assignee?: string;
    priority?: "High" | "Medium" | "Low";
  }>({});
  const [postedAt, setPostedAt] = useState<string | undefined>();

  const handleSend = async (finalText: string) => {
    // await postReviewResponse(review?.id!, finalText)
    setPostedAt(formatDate(new Date()));
    setOpenRespond(false);
    setOpenSuccess(true);
  };

  const handleEscalate = (data: {
    assignee: string;
    priority: "High" | "Medium" | "Low";
    notes: string;
  }) => {
    // await escalateReviewAPI(...)
    setLastEscalation({ assignee: data.assignee, priority: data.priority });
    setOpenEscalate(false);
    setOpenEscalateSuccess(true);
  };

  if (!review)
    return <div className="p-4 text-sm text-gray-600">Review not found</div>;

  const sStyle = review.status ? statusStyles[review.status] : undefined;
  const sentStyle = sentimentStyles[review.sentiment];
  const formattedDate = formatDate(review.date);

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <nav className="text-[12px] text-gray-500 flex items-center space-x-1">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <Link href="/admin/reputation" className="hover:underline">
          Reputation
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Detail View</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">Detail View</h1>

      {/* Info Card */}
      <div className="rounded-md border border-gray-200 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-4 px-4 py-4">
          <KV label="Guest" value={review.guest} />
          <KV label="Source" value={review.source} />
          <KV label="Date" value={formattedDate} />
          <KV
            label="Rating"
            value={
              <>
                <StarRow count={review.rating} />
                <span className="text-xs text-gray-600">
                  ({review.rating}/5)
                </span>
              </>
            }
          />
          <KV
            label="Sentiment"
            value={
              <span
                className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${sentStyle.bg} ${sentStyle.text}`}
              >
                {review.sentiment}
              </span>
            }
          />
          <KV
            label="Status"
            value={
              review.status ? (
                <span
                  className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[11px] font-medium ${sStyle?.bg} ${sStyle?.text}`}
                >
                  {review.status}
                  {review.status === "Critical" && (
                    <Image
                      src="/icons/admin/critical.png"
                      alt="Critical"
                      width={12}
                      height={12}
                    />
                  )}
                </span>
              ) : (
                "-"
              )
            }
          />
        </div>
      </div>

      {/* AI flagged warning */}
      {review.status === "Critical" && (
        <div className="rounded-md border border-rose-200 bg-rose-50 text-rose-800">
          <div className="flex items-start gap-2 px-4 py-3">
            <Image
              src="/icons/admin/flagged1.png"
              alt="Critical icon"
              width={16}
              height={16}
              className="mt-0.5"
            />
            <div className="text-[13px] font-medium text-gray-800">
              This review has been flagged by AI as critical.
            </div>
          </div>
          <div className="px-4 py-3 pt-1">
            <p className="text-[13px] text-gray-700">
              Extremely low rating (1 star) + negative sentiment ("Terrible
              stay, want refund…"). Recommended Action: Escalate to relevant
              staff immediately.
            </p>
          </div>
        </div>
      )}

      {/* Review content */}
      <div className="rounded-md border border-gray-200 bg-white">
        <div className="px-4 py-3 font-medium text-[13px] text-gray-800">
          Review Content
        </div>
        <div className="px-4 py-3 text-[13px] text-gray-700">
          {review.comment}
        </div>
      </div>

      {/* Suggested response */}
      <div className="rounded-md border border-gray-200 bg-white">
        <div className="flex items-center gap-2 px-4 py-3">
          <div className="text-[13px] font-medium text-gray-800">
            AI Suggested Response
          </div>
          <span className="rounded-md border border-gray-200 bg-[#A578651A] px-2 py-0.5 text-[11px] text-[#A57865]">
            Auto generated
          </span>
        </div>
        <div className="px-4 py-3">
          <div className="rounded-md border border-gray-200 bg-white p-3 text-[13px] text-gray-700">
            “We sincerely apologize for the issues you faced during your stay.
            Our team has been notified to review the AC and room cleanliness
            immediately. We would like to reach out to you directly to offer
            compensation and ensure a better experience in the future.”
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex items-center justify-end gap-2">
        <button
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          onClick={() => setOpenEscalate(true)}
        >
          Escalate to Staff
        </button>
        <button
          className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          onClick={() => setOpenRespond(true)}
        >
          Respond (AI)
        </button>
      </div>

      {/* Modals */}
      <RespondToReviewModal
        open={openRespond}
        onClose={() => setOpenRespond(false)}
        onSend={handleSend}
        review={review}
      />

      <ResponseSentModal
        open={openSuccess}
        onClose={() => setOpenSuccess(false)}
        guestName={review.guest}
        platform={review.source}
        postedAt={postedAt}
      />

      <EscalateReviewModal
        open={openEscalate}
        onClose={() => setOpenEscalate(false)}
        onEscalate={handleEscalate}
        summary={review.comment}
        guestName={review.guest}
      />

      <EscalatedSuccessModal
        open={openEscalateSuccess}
        onClose={() => setOpenEscalateSuccess(false)}
        assignee={lastEscalation.assignee}
        priority={lastEscalation.priority}
      />
    </div>
  );
}
