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

export default function AddOnPaymentPage() {
  const router = useRouter();
  const [currentStep] = useState(4);

  const railRef = useRef<HTMLDivElement>(null);
  const firstRef = useRef<HTMLDivElement>(null);
  const lastRef = useRef<HTMLDivElement>(null);
  const [railStyle, setRailStyle] = useState({ left: 0, width: 0 });

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

  const handleConfirm = () => {
    router.push("/digital-signature");
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

        {/* ===== Title & Grid ===== */}
        <h1 className="text-xl font-semibold mb-1">
          Confirm & Pay for Add-Ons
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Complete payment for the extras you selected.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left: Add-On Summary */}
          <div className="w-full max-w-md border border-gray-200 rounded-md shadow-sm p-4 text-sm min-h-[160px] max-h-[360px] overflow-auto">
            <h2 className="font-semibold mb-3">Reservation Summary</h2>

            <div className="space-y-1 text-gray-700">
              <div className="flex justify-between">
                <span>Breakfast Package</span>
                <span>$30</span>
              </div>
              <div className="flex justify-between">
                <span>Airport Pickup</span>
                <span>$30</span>
              </div>
            </div>

            <div className="mt-3 border-t pt-2 flex justify-between border-gray-200 font-semibold text-base text-gray-900">
              <span>Total Add-Ons</span>
              <span>$60</span>
            </div>
          </div>

          {/* Right: Payment Form */}
          <div>
            <h2 className="font-semibold mb-4">Payment</h2>

            {/* Pay With */}
            <div className="mb-4">
              <span className="block text-sm font-medium mb-2">Pay With:</span>
              <div className="flex gap-6 text-sm">
                <label className="flex items-center gap-2">
                  <input type="radio" defaultChecked name="method" />
                  Card
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" />
                  Bank
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="method" />
                  Transfer
                </label>
              </div>
            </div>

            {/* Card Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9101 1121"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-sm mb-1">Expiration Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm mb-1">CVV</label>
                  <input
                    type="text"
                    placeholder="123"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm mb-1">Phone Number</label>
                <input
                  type="text"
                  placeholder="+91   XXXXXXXXXX"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                />
              </div>

              <label className="flex items-center gap-2 text-sm text-gray-600">
                <input type="checkbox" className="accent-[#A57865]" />
                Save card details
              </label>
            </div>

            {/* Button */}
            <div className="mt-6">
              <button
                type="button"
                onClick={handleConfirm}
                className="w-full bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition-colors"
              >
                Confirm &amp; Pay
              </button>

              <p className="text-[11px] text-gray-500 mt-4 text-center">
                Your personal data will be used to process your order, support
                your experience throughout this website, and for other purposes
                described in our privacy policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
