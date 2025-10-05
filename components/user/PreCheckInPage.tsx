"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "ID Verification",
  "Preferences",
  "Add-On Payment",
  "Digital Signature",
  "Confirmation",
];

export default function PreCheckInPage() {
  const router = useRouter();
  const [currentStep] = useState(1);

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

  const handleFindBooking = () => {
    router.push("/user/pre-check-in/id-verification");
  };

  return (
    <section className="px-6 py-25 bg-white text-gray-800 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-10 relative" ref={railRef}>
          <div
            className="absolute top-6 h-[2px] bg-gray-200 z-0"
            style={{ left: railStyle.left, width: railStyle.width }}
          />
          <div
            className="absolute top-6 h-[2px] bg-[#A57865] z-0"
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
              const isCurrent = stepNumber === currentStep;
              const isCompleted = stepNumber < currentStep;
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
                      isCompleted
                        ? "bg-[#A57865] text-white"
                        : isCurrent
                        ? "bg-white border-2 border-[#A57865] text-[#A57865]"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
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

        {/* ===== Header Copy ===== */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold"> Pre‑Check‑In</h1>
          <p className="text-sm text-gray-600 mt-2">
            Retrieve your booking and save time at the front desk.
          </p>
        </div>

        {/* ===== Form Card ===== */}
        <div className="max-w-2xl">
          <div className="space-y-5">
            {/* Reservation ID */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Reservation ID
              </label>
              <input
                type="text"
                placeholder="#HT123456"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none transition-colors"
              />
            </div>

            {/* CTA */}
            <button
              type="button"
              onClick={handleFindBooking}
              className="w-full bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition-colors duration-300"
            >
              Find My Booking
            </button>

            {/* Help text */}
            <p className="text-xs text-gray-500">
              Didn’t receive your email? Contact us at{" "}
              <a
                href="mailto:stay@hotel.com"
                className="underline decoration-[#A57865] underline-offset-2"
              >
                stay@hotel.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
