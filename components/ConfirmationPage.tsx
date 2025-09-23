"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const steps = ["Dates & Rooms", "Guest Details", "Payment", "Confirmation"];

export default function ConfirmationPage() {
  const router = useRouter();
  const [currentStep] = useState(4);

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

  return (
    <section className="px-6 py-30 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-12 relative" ref={railRef}>
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
              const isCompleted = stepNumber <= currentStep;
              const isCurrent = stepNumber === currentStep;
              return (
                <div
                  key={step}
                  className="flex flex-col items-center"
                  ref={
                    index === 0
                      ? firstRef
                      : index === steps.length - 1
                      ? lastRef
                      : undefined
                  }
                >
                  <div
                    className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-sm
                    ${
                      isCurrent
                        ? "bg-white border-2 border-[#A57865] text-[#A57865]"
                        : "bg-[#A57865] text-white"
                    }`}
                  >
                    {isCurrent ? stepNumber : "✓"}
                  </div>
                  <span
                    className={`mt-2 text-sm text-center whitespace-nowrap ${
                      isCurrent
                        ? "font-semibold text-gray-900"
                        : "text-gray-500"
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
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="M22 4 12 14.01l-3-3" />
            </svg>
          </div>
          <h2 className="text-center text-lg font-semibold mt-4">
            Booking Confirmed!
          </h2>
          <p className="text-center text-sm text-gray-600 mt-1">
            Thank you, John Doe. Your reservation has been successfully booked.
          </p>
        </div>

        {/* ===== Reservation Summary ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          <h3 className="text-base font-semibold px-6 py-4">
            Reservation Summary
          </h3>

          <div className="divide-y divide-gray-200 text-sm">
            {[
              ["Reservation ID", "#HT123456"],
              ["Full Name", "XYZ"],
              ["Phone", "XYZ"],
              ["Check-in", "20–23 Sept 2025"],
              ["Check-out", "20–23 Sept 2025"],
              ["Guests", "2 Adults, 1 Child"],
            ].map(([label, value]) => (
              <div key={label} className="px-6 py-3 flex justify-between">
                <span className="text-gray-500">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}

            {/* Rooms block with two rows */}
            <div className="px-6 py-3">
              <div className="flex justify-between">
                <span className="text-gray-500">Rooms</span>
                <span className="text-gray-800">Executive Suite × 1</span>
              </div>
              <div className="mt-2 flex justify-between">
                <span className="text-gray-500">$250/night × 3 nights</span>
                <span className="text-gray-800">$750</span>
              </div>
            </div>

            <div className="px-6 py-3 flex justify-between">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-800">$750</span>
            </div>
            <div className="px-6 py-3 flex justify-between">
              <span className="text-gray-500">Taxes & Fees</span>
              <span className="text-gray-800">$75</span>
            </div>

            <div className="px-6 py-4 flex justify-between items-center bg-white">
              <span className="text-gray-800 font-semibold">Total</span>
              <span className="text-gray-900 font-extrabold">$825</span>
            </div>
          </div>
        </div>

        {/* ===== What's Next ===== */}
        <div className="mt-10">
          <h4 className="text-base font-semibold mb-2">What’s Next?</h4>
          <p className="text-sm text-gray-600">
            A confirmation email has been sent to john@example.com.
          </p>
          <p className="text-sm text-gray-600">
            You can speed up your arrival with Pre‑Check‑In.
          </p>
          <p className="text-sm text-gray-600">
            Download your booking details for offline reference.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <button
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => router.push("/")}
            >
              Back to Home
            </button>
            <button
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 text-sm hover:bg-gray-100 transition-colors"
              onClick={() => alert("Generate PDF here")}
            >
              Download PDF
            </button>
            <button
              className="px-4 py-2 rounded-md bg-[#A57865] text-white text-sm hover:bg-[#7a3c23] transition-colors"
              onClick={() => router.push("/pre-check-in")}
            >
              Pre‑Check‑In Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
