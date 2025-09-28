"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  open: boolean;
  onClose: () => void;
  onSend: (finalText: string) => void;
  review: {
    id: string;
    guestName?: string;
    platform?: string; // e.g., "TripAdvisor"
    summary?: string; // short sentence summary
    aiSuggested?: string;
  };
};

export default function RespondToReviewModal({
  open,
  onClose,
  onSend,
  review,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  const defaultSuggested =
    review.aiSuggested ||
    `We sincerely apologize for the inconvenience during your stay. Our team has been alerted, and corrective actions have been taken. We'd love to welcome you back with improved service.`;

  const [template, setTemplate] = useState<
    "apology" | "thanks" | "custom" | "none"
  >("none");
  const [response, setResponse] = useState(defaultSuggested);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!open) return;
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open) setResponse(defaultSuggested);
  }, [open]);

  if (!open) return null;

  const applyTemplate = () => {
    if (template === "apology") {
      setResponse(
        `We sincerely apologize for the inconvenience during your stay. Our housekeeping and front-desk teams have been alerted, and steps are in place to prevent a recurrence. We'd value the chance to host you again with improved service.`
      );
    } else if (template === "thanks") {
      setResponse(
        `Thank you for your feedback and for choosing us. We're delighted you enjoyed your stay, and we look forward to welcoming you again soon!`
      );
    } else if (template === "custom") {
      // leave response as-is; user will edit
    }
  };

  const regenerateAI = () => {
    // Stub: plug your real AI call here
    setResponse(
      `Thanks for sharing this. We're sorry we missed the mark in housekeeping at check‑in. We've addressed this with the team and tightened our room inspection checklist. We'd love to host you again and make it right.`
    );
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative z-[110] w-[min(720px,92vw)] max-h-[90vh] overflow-y-auto rounded-xl bg-white shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-[15px] font-semibold text-gray-900">
            Respond to Review{review.guestName ? ` – ${review.guestName}` : ""}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
          >
            ×
          </button>
        </div>

        {/* Body */}
        {/* <div className="space-y-5 px-5 py-5"> */}
        <div className="max-h-[65vh] overflow-y-auto px-5 py-5 space-y-5">
          {/* Review Summary */}
          <div className="rounded-md border border-gray-200">
            <div className=" px-4 py-3">
              <div className="text-sm font-medium text-gray-800">
                Review Summary
              </div>
            </div>
            <div className="px-4 py-3">
              <textarea
                className="w-full resize-none rounded-md border border-gray-200 p-3 text-sm outline-none focus:border-gray-300"
                rows={2}
                value={
                  review.summary ||
                  `“The room was not cleaned properly when I checked in. Housekeeping was slow to respond.”`
                }
                readOnly
              />
            </div>
          </div>

          {/* AI Suggested Response */}
          <div className="rounded-md border border-gray-200">
            <div className="flex items-center justify-between px-4 py-3">
              <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-800">
                  AI Suggested Response
                </div>
                <span className="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[11px] text-amber-700">
                  Auto generated
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={regenerateAI}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Regenerate
                </button>
                <button
                  onClick={() => setResponse(defaultSuggested)}
                  className="rounded-md bg-[#A57865] px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
                >
                  Use Suggestion
                </button>
              </div>
            </div>
            <div className="px-4 py-3">
              <textarea
                className="w-full resize-none rounded-md border border-gray-200 p-3 text-sm outline-none focus:border-gray-300"
                rows={2}
                value={defaultSuggested}
                readOnly
              />
            </div>
          </div>

          {/* Template suggestions */}
          <div className="rounded-md border border-gray-200">
            <div className="px-4 py-3">
              <div className="text-sm font-medium text-gray-800">
                Template Suggestions
              </div>
            </div>
            <div className="px-4 py-3 space-y-3">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="tpl"
                  className="h-4 w-4"
                  checked={template === "apology"}
                  onChange={() => setTemplate("apology")}
                />
                Apology + Resolution Offer
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="tpl"
                  className="h-4 w-4"
                  checked={template === "thanks"}
                  onChange={() => setTemplate("thanks")}
                />
                Thank You + Future Discount
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="tpl"
                  className="h-4 w-4"
                  checked={template === "custom"}
                  onChange={() => setTemplate("custom")}
                />
                Custom
              </label>

              <div className="pt-1">
                <button
                  onClick={applyTemplate}
                  className="rounded-md border border-gray-300 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>

          {/* Response editor */}
          <div className="rounded-md border border-gray-200">
            <div className=" px-4 py-3">
              <div className="text-sm font-medium text-gray-800">Response</div>
            </div>
            <div className="px-4 py-3">
              <textarea
                className="w-full rounded-md border border-gray-200 p-3 text-sm outline-none focus:border-gray-300"
                rows={5}
                value={response}
                onChange={(e) => setResponse(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-2 border-t px-5 py-4">
          <button
            className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
            onClick={() => onSend(response)}
          >
            Send Response
          </button>
        </div>
      </div>
    </div>
  );
}
