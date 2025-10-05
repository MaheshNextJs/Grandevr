"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "Reservation Login",
  "ID Verification",
  "Preferences",
  "Add-On Payment",
  "Digital Signature",
  "Confirmation",
];

export default function PreCheckInConfirmationPage() {
  const router = useRouter();
  const [currentStep] = useState(6);

  // stepper rail sizing
  const railRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [railStyle, setRailStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  useEffect(() => {
    const calc = () => {
      if (!railRef.current || !firstRef.current || !lastRef.current) return;
      const railBox = railRef.current.getBoundingClientRect();
      const firstBox = firstRef.current.getBoundingClientRect();
      const lastBox = lastRef.current.getBoundingClientRect();
      const firstCenter = firstBox.left + firstBox.width / 2;
      const lastCenter = lastBox.left + lastBox.width / 2;
      setRailStyle({
        left: firstCenter - railBox.left,
        width: Math.max(0, lastCenter - firstCenter),
      });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const downloadPdf = () => {
    // TODO: generate and download real PDF
    alert("Download PDF clicked");
  };

  return (
    <section className="px-6 py-25 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-10 relative" ref={railRef}>
          <div
            className="absolute top-7 h-[2px] bg-gray-200 z-0"
            style={{ left: railStyle.left, width: railStyle.width }}
          />
          <div
            className="absolute top-7 h-[2px] bg-[#A57865] z-0"
            style={{
              left: railStyle.left,
              width:
                railStyle.width *
                (Math.max(0, currentStep - 1) / (steps.length - 1)),
            }}
          />
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              return (
                <div
                  key={step}
                  className="flex flex-col items-center gap-2"
                  ref={
                    index === 0
                      ? firstRef
                      : index === steps.length - 1
                      ? lastRef
                      : undefined
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm
                    ${
                      isCurrent
                        ? "bg-white border-2 border-[#A57865] text-[#A57865]"
                        : "bg-[#A57865] text-white"
                    }`}
                  >
                    {isCurrent ? stepNumber : "✓"}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent ? "text-[#A57865]" : "text-gray-500"
                    }`}
                  >
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* ===== Success Card ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-8 mb-8">
          <div className="mx-auto w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg
              className="w-6 h-6 text-green-600"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20 6 9 17l-5-5" />
            </svg>
          </div>
          <h2 className="text-center text-lg font-semibold mt-4">
            Pre‑Check‑In Complete!
          </h2>
          <p className="text-center text-sm text-gray-600 mt-1">
            Thank you, John. Your arrival will be smooth and contactless.
          </p>
        </div>

        {/* ===== Details ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
            <div>
              <div className="text-gray-500">Full Name</div>
              <div className="text-gray-800">xyz</div>
            </div>
            <div>
              <div className="text-gray-500">Email</div>
              <div className="text-gray-800">xyz</div>
            </div>
            <div>
              <div className="text-gray-500">Phone</div>
              <div className="text-gray-800">xyz</div>
            </div>
            <div>
              <div className="text-gray-500">Check-in</div>
              <div className="text-gray-800">20–23 Sept 2025</div>
            </div>
            <div>
              <div className="text-gray-500">Check-out</div>
              <div className="text-gray-800">20–23 Sept 2025</div>
            </div>
            <div>
              <div className="text-gray-500">Room</div>
              <div className="text-gray-800">Executive Suite × 1</div>
            </div>
            <div>
              <div className="text-gray-500">Guests</div>
              <div className="text-gray-800">2 Adults, 1 Child</div>
            </div>
          </div>
        </div>

        {/* ===== Add‑Ons ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm mb-6 overflow-hidden">
          <div className="px-6 py-4 font-semibold">Add‑Ons</div>
          <div className="px-6 text-sm text-gray-400">Breakfast Package</div>
          <div className="px-6 text-sm text-gray-400">Airport Pickup</div>
          <div className="mt-3 border-t border-gray-200 px-6 py-3 flex justify-between text-sm font-semibold">
            <span>Total Add‑Ons</span>
            <span>$60</span>
          </div>
        </div>

        {/* ===== Payment Status ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm mb-6">
          <div className="px-6 py-4 font-semibold">Payment Status</div>

          <div className="px-6 pb-3">
            <div className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm flex items-center justify-between">
              <span>Room</span>
              <span className="text-green-600 flex items-center gap-1">
                Paid
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 6 9 17l-5-5" strokeWidth="2" />
                </svg>
              </span>
            </div>
          </div>

          <div className="px-6 pb-6">
            <div className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm flex items-center justify-between">
              <span>Add‑Ons</span>
              <span className="text-green-600 flex items-center gap-1">
                Paid online
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M20 6 9 17l-5-5" strokeWidth="2" />
                </svg>
              </span>
            </div>
          </div>
        </div>

        {/* ===== Notes ===== */}
        <ul className="text-sm text-gray-700 space-y-2 mb-6 list-disc pl-6">
          <li className="py-2">Just collect your key card at reception.</li>
          <li className="py-2">
            Your preferences have been saved (King Bed, High Floor, ETA: 3 PM).
          </li>
          <li className="py-2">Your ID has been securely verified.</li>
        </ul>

        {/* ===== Actions ===== */}
        <div className="flex flex-col md:flex-row gap-4 pb-6">
          <button
            className="w-full md:w-1/2 border border-gray-300 text-gray-700 rounded-md py-2 text-sm hover:bg-gray-100 transition-colors"
            onClick={() => router.push("/user")}
          >
            Back to Home
          </button>
          <button
            className="w-full md:w-1/2 bg-[#A57865] text-white rounded-md py-2 text-sm hover:bg-[#7a3c23] transition-colors"
            onClick={downloadPdf}
          >
            Download PDF
          </button>
        </div>
      </div>
    </section>
  );
}
