"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ROOMS } from "@/app/user/rooms/data";

const steps = ["Dates & Rooms", "Guest Details", "Payment", "Confirmation"];

function parseDate(d?: string | null) {
  if (!d) return undefined;
  const parts = d.split("-");
  if (parts.length !== 3) return undefined;
  const [y, m, day] = parts.map((x) => Number(x));
  if (!y || !m || !day) return undefined;
  return new Date(y, m - 1, day);
}
function formatDate(d?: Date) {
  if (!d) return "—";
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}
function diffNights(inDate?: Date, outDate?: Date) {
  if (!inDate || !outDate) return 3; // fallback like before
  const ms = outDate.getTime() - inDate.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

export default function GuestDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = Number(searchParams.get("roomId"));
  const checkInStr = searchParams.get("in");
  const checkOutStr = searchParams.get("out");
  const adStr = searchParams.get("ad");
  const chStr = searchParams.get("ch");

  const inDate = parseDate(checkInStr);
  const outDate = parseDate(checkOutStr);
  const adults = adStr ? Number(adStr) : 2;
  const children = chStr ? Number(chStr) : 1;

  const room = useMemo(() => {
    if (!roomId) return undefined;
    return ROOMS.find((r) => r.id === roomId);
  }, [roomId]);

  const summaryImage = room?.image ?? "/images/Room4.png";
  const summaryTitle = room?.title ?? "Executive Suite";
  const nightlyPrice = room?.price ?? 250;

  const nights = diffNights(inDate, outDate);
  const subtotal = nightlyPrice * nights;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

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
    const params = new URLSearchParams({
      roomId: String(roomId || ""),
      in: checkInStr || "",
      out: checkOutStr || "",
      ad: String(adults),
      ch: String(children),
    });
    router.push(`/user/payments?${params.toString()}`);
  };

  return (
    <section className="px-6 py-30 bg-white text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
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
              src={summaryImage}
              alt="Booked Room"
              width={500}
              height={300}
              className="rounded-md mb-4 object-cover"
            />
            <h3 className="text-md font-semibold mb-4 px-4">Booking Details</h3>
            <div className="space-y-2 text-sm text-gray-700 px-4">
              <p className="flex justify-between">
                <span className="font-medium">Room:</span>
                <span>{summaryTitle}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Check-in:</span>
                <span>{formatDate(inDate) || "22 Sept 2025"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Check-out:</span>
                <span>{formatDate(outDate) || "24 Sept 2025"}</span>
              </p>
              <p className="flex justify-between">
                <span className="font-medium">Guests:</span>
                <span>
                  {adults} Adult{adults === 1 ? "" : "s"}, {children}{" "}
                  {children === 1 ? "Child" : "Children"}
                </span>
              </p>
            </div>

            <h3 className="text-md font-semibold mt-6 mb-2 px-4">
              Price Summary
            </h3>
            <div className="text-sm text-gray-700 space-y-1 px-4">
              <p className="flex justify-between">
                <span>{summaryTitle} × 1</span>
              </p>
              <p className="flex justify-between">
                <span>
                  ${nightlyPrice}/night × {nights}{" "}
                  {nights === 1 ? "night" : "nights"}
                </span>
                <span>${subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal}</span>
              </p>
              <p className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span>${taxes}</span>
              </p>
              <p className="flex justify-between font-bold text-gray-900 text-base mt-2">
                <span>Total:</span>
                <span>${total}</span>
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
