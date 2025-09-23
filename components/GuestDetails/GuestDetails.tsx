"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const steps = ["Dates & Rooms", "Guest Details", "Payment", "Confirmation"];

export default function GuestDetails() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2); // 1-based (2 = "Guest Details")

  // refs to measure exact positions
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

      // centers of first/last bubbles
      const firstCenter = firstBox.left + firstBox.width / 2;
      const lastCenter = lastBox.left + lastBox.width / 2;

      const left = firstCenter - railBox.left;
      const width = Math.max(0, lastCenter - firstCenter);

      setRailStyle({ left, width });
    };

    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const handlePayment = () => {
    setCurrentStep(3);
    router.push("/payment");
  };

  return (
    <section className="px-6 py-30 bg-white text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-12 relative" ref={railRef}>
          {/* base line (exactly between first & last centers) */}
          <div
            className="absolute top-7 h-[2px] bg-gray-300 z-0"
            style={{ left: railStyle.left, width: railStyle.width }}
          />
          {/* progress line (fills by segments) */}
          <div
            className="absolute top-7 h-[2px] bg-[#5A2A17] z-0"
            style={{
              left: railStyle.left,
              width:
                railStyle.width *
                (Math.max(0, currentStep - 1) / (steps.length - 1)),
            }}
          />

          {/* bubbles */}
          <div className="flex justify-between items-center relative z-10">
            {steps.map((step, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
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
                      isCompleted
                        ? "bg-[#5A2A17] text-white"
                        : isCurrent
                        ? "bg-white border-2 border-[#5A2A17] text-[#5A2A17]"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : stepNumber}
                  </div>
                  <span
                    className={`mt-2 text-sm text-center whitespace-nowrap
                    ${
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

        {/* ===== Grid Layout ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Guest Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4">Guest Information</h2>
            <p className="text-sm text-gray-600 mb-6">
              Please provide your details to confirm your reservation.
            </p>

            <form className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 1234567890"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Special Requests
                </label>
                <textarea
                  placeholder="Any Special Request"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-[#5A2A17] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="border border-gray-200 shadow-md rounded-lg p-6">
            <Image
              src="/images/Room1.png"
              alt="Booked Room"
              width={500}
              height={300}
              className="rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>
                <strong>Check-in:</strong> 22 Sept 2025
              </p>
              <p>
                <strong>Check-out:</strong> 24 Sept 2025
              </p>
              <p>
                <strong>Guests:</strong> 2 Adults, 1 Child
              </p>
            </div>

            <h3 className="text-lg font-semibold mt-6 mb-2">Price Summary</h3>
            <div className="text-sm text-gray-700 space-y-1">
              <p>Executive Suite × 1</p>
              <p>$250/night × 3 nights = $750</p>
              <p>Subtotal: $750</p>
              <p>Taxes & Fees: $75</p>
              <p className="font-bold text-gray-900 text-base mt-2">
                Total: $825
              </p>
            </div>

            <button className="mt-4 w-full border border-gray-400 text-gray-600 rounded-md py-2 text-sm hover:bg-gray-100 transition">
              Edit Selection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
