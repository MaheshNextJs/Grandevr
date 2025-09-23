"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const steps = ["Dates & Rooms", "Guest Details", "Payment", "Confirmation"];

export default function GuestDetails() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(2);

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
    router.push("/payments");
  };

  return (
    <section className="px-6 py-30 bg-white text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* ===== Stepper ===== */}
        <div className="mb-12 relative" ref={railRef}>
          <div
            className="absolute top-7 h-[2px] bg-gray-300 z-0"
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
                        ? "bg-[#A57865] text-white"
                        : isCurrent
                        ? "bg-white border-2 border-[#A57865] text-[#A57865]"
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
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm h-30 resize-none hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                />
              </div>

              <button
                type="button"
                onClick={handlePayment}
                className="w-full bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition"
              >
                Continue to Payment
              </button>
            </form>
          </div>

          {/* Booking Summary */}
          <div className="border border-gray-200 shadow-md rounded-lg p-2 w-full max-w-md mx-auto">
            <Image
              src="/images/Room4.png"
              alt="Booked Room"
              width={500}
              height={300}
              className="rounded-md mb-4 object-cover"
            />

            <h3 className="text-md font-semibold mb-4 px-4">Booking Details</h3>
            <div className="space-y-2 text-sm text-gray-700 px-4">
              <p className="flex justify-between">
                <span className="font-medium">Check-in:</span>
                <span>22 Sept 2025</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Check-out:</span>
                <span>24 Sept 2025</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Guests:</span>
                <span>2 Adults, 1 Child</span>
              </p>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-2 px-4">
              Price Summary
            </h3>
            <div className="text-sm text-gray-700 space-y-1 px-4">
              <p className="flex justify-between">
                <span>Executive Suite × 1</span>
              </p>
              <p className="flex justify-between">
                <span>$250/night × 3 nights</span>
                <span>$750</span>
              </p>
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>$750</span>
              </p>
              <p className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>$75</span>
              </p>
              <p className="flex justify-between font-bold text-gray-900 text-base mt-2">
                <span>Total:</span>
                <span>$825</span>
              </p>
            </div>

            <button className="mt-4 w-full border border-[#A57865] text-[#A57865] rounded-md py-2 text-sm hover:bg-gray-200 transition">
              Edit Selection
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
