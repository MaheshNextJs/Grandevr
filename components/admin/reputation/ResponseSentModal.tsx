// "use client";
// import Image from "next/image";

// type Props = {
//   open: boolean;
//   onClose: () => void;
//   review?: { guestName?: string; platform?: string; postedAt?: string };
// };

// export default function ResponseSentModal({ open, onClose, review }: Props) {
//   if (!open) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center">
//       {/* Backdrop */}
//       <div className="absolute inset-0 bg-black/40" onClick={onClose} />

//       {/* Modal */}
//       <div className="relative z-60 w-[min(360px,90vw)] rounded-xl bg-white p-6 shadow-xl">
//         {/* Close button */}
//         <button
//           className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
//           onClick={onClose}
//         >
//           ×
//         </button>

//         {/* Checkmark */}
//         <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
//           <svg
//             viewBox="0 0 24 24"
//             className="h-6 w-6 text-emerald-600"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path d="M5 13l4 4L19 7" />
//           </svg>
//         </div>

//         {/* Title */}
//         <h4 className="mb-3 text-center text-base font-semibold text-gray-900">
//           Response Sent Successfully
//         </h4>

//         {/* Info box */}
//         <div className="mb-3 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
//           <div className="mb-1">
//             <strong className="font-medium">Guest:</strong>{" "}
//             {review?.guestName || "—"}
//           </div>
//           <div>
//             <strong className="font-medium">Platform:</strong>{" "}
//             {review?.platform || "—"}
//           </div>
//         </div>

//         {/* Timestamp */}
//         <p className="mb-5 text-center text-sm text-gray-500">
//           Response posted publicly on{" "}
//           <span className="font-medium text-gray-700">
//             {review?.postedAt || "—"}
//           </span>
//         </p>

//         {/* Close button */}
//         <div className="flex justify-center">
//           <button
//             onClick={onClose}
//             className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useEffect } from "react";

type Props = {
  open: boolean;
  onClose: () => void;

  /** Content */
  guestName?: string;
  platform?: string;
  /** Either a preformatted string (e.g. "Sept 20, 2025") or a Date */
  postedAt?: string | Date;

  /** Optional auto close (ms). e.g. 2500 */
  autoCloseMs?: number;

  /** Show the × button (default: true) */
  showCloseIcon?: boolean;
};

function formatPostedAt(p?: string | Date) {
  if (!p) return "—";
  if (p instanceof Date) {
    return p.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }
  return p;
}

export default function ResponseSentModal({
  open,
  onClose,
  guestName,
  platform,
  postedAt,
  autoCloseMs,
  showCloseIcon = true,
}: Props) {
  useEffect(() => {
    if (!open || !autoCloseMs) return;
    const t = setTimeout(onClose, autoCloseMs);
    return () => clearTimeout(t);
  }, [open, autoCloseMs, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="rsp-title"
    >
      {/* Backdrop (with slight blur) */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-60 w-[min(380px,90vw)] rounded-xl bg-white p-6 shadow-xl
                   animate-in fade-in zoom-in duration-150"
      >
        {/* Close button */}
        {showCloseIcon && (
          <button
            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        )}

        {/* Checkmark */}
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-emerald-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            aria-hidden="true"
          >
            <path d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* Title */}
        <h4
          id="rsp-title"
          className="mb-3 text-center text-base font-semibold text-gray-900"
        >
          Response Sent Successfully
        </h4>

        {/* Info box */}
        <div className="mb-3 rounded-md border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700">
          <div className="mb-1">
            <span className="font-medium">Guest:</span> {guestName ?? "—"}
          </div>
          <div>
            <span className="font-medium">Platform:</span> {platform ?? "—"}
          </div>
        </div>

        {/* Timestamp */}
        <p className="mb-5 text-center text-sm text-gray-500">
          Response posted publicly on{" "}
          <span className="font-medium text-gray-700">
            {formatPostedAt(postedAt)}
          </span>
        </p>

        {/* Close button */}
        <div className="flex justify-center">
          <button
            onClick={onClose}
            className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
