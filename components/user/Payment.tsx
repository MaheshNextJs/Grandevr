"use client";

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
  if (!inDate || !outDate) return 3;
  const ms = outDate.getTime() - inDate.getTime();
  const nights = Math.ceil(ms / (1000 * 60 * 60 * 24));
  return nights > 0 ? nights : 1;
}

export default function Payment() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [currentStep] = useState(3);

  // Read the same params we forwarded from Guest Details
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

  const roomTitle = room?.title ?? "Executive Suite";
  const nightlyPrice = room?.price ?? 250;

  const nights = diffNights(inDate, outDate);
  const subtotal = nightlyPrice * nights;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

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

  return (
    <section className="px-6 py-30 bg-white text-gray-800 font-sans">
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Reservation Summary (Left) */}
          <div className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg shadow-sm">
              <h3 className="text-base font-semibold px-6 py-4">
                Reservation Summary
              </h3>
              <div className="divide-y divide-gray-200 text-sm">
                {/* Keep identity placeholders since you don't collect them yet */}
                {[
                  ["Full Name", "XYZ"],
                  ["Email", "XYZ@gmail.com"],
                  ["Phone", "XYZ"],
                  ["Check-in", formatDate(inDate)],
                  ["Check-out", formatDate(outDate)],
                  [
                    "Guests",
                    `${adults} Adult${adults === 1 ? "" : "s"}, ${children} ${
                      children === 1 ? "Child" : "Children"
                    }`,
                  ],
                ].map(([label, value]) => (
                  <div key={label} className="px-6 py-3 flex justify-between">
                    <span className="text-gray-500">{label}</span>
                    <span className="text-gray-800">{value}</span>
                  </div>
                ))}

                <div className="px-6 py-3">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Rooms</span>
                    <span className="text-gray-800">{roomTitle} × 1</span>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <span className="text-gray-500">
                      ${nightlyPrice}/night × {nights}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </span>
                    <span className="text-gray-800">${subtotal}</span>
                  </div>
                </div>

                <div className="px-6 py-3 flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-gray-800">${subtotal}</span>
                </div>
                <div className="px-6 py-3 flex justify-between">
                  <span className="text-gray-500">Taxes & Fees</span>
                  <span className="text-gray-800">${taxes}</span>
                </div>

                <div className="px-6 py-4 flex justify-between items-center">
                  <span className="text-gray-800 font-semibold">Total</span>
                  <span className="text-gray-900 font-extrabold">${total}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form (Right) */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-semibold mb-6">Payment</h3>

            {/* Pay With */}
            <div className="mb-6">
              <p className="text-sm text-gray-700 mb-2">Pay With:</p>
              <div className="flex items-center gap-6 text-sm">
                <label className="inline-flex items-center gap-2 cursor-pointer">
                  <span className="inline-block w-4 h-4 rounded-full border border-gray-300 bg-white relative">
                    <span className="absolute inset-1 rounded-full bg-[#A57865]" />
                  </span>
                  Card
                </label>
                <label className="inline-flex items-center gap-2 text-gray-500 cursor-pointer">
                  <span className="inline-block w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  Bank
                </label>
                <label className="inline-flex items-center gap-2 text-gray-500 cursor-pointer">
                  <span className="inline-block w-4 h-4 rounded-full border border-gray-300 bg-white" />
                  Transfer
                </label>
              </div>
            </div>

            {/* Card Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Card Number
              </label>
              <input
                type="text"
                placeholder="1234 5678 9101 1121"
                className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none"
              />
            </div>

            {/* Expiration & CVV */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-2">
                  Expiration Date
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">CVV</label>
                <input
                  type="text"
                  placeholder="123"
                  className="w-full border border-gray-300 rounded-md px-3 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <div className="flex gap-3">
                <select className="w-28 border border-gray-300 rounded-md px-3 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none">
                  <option>+91</option>
                  <option>+1</option>
                  <option>+44</option>
                </select>
                <input
                  type="text"
                  placeholder="dd/mm/yy"
                  className="flex-1 border border-gray-300 rounded-md px-3 py-3 text-sm hover:border-gray-400 focus:border-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Save card details */}
            <label className="inline-flex items-center gap-2 text-sm mb-6 cursor-pointer">
              <input
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300"
              />
              <span>Save card details</span>
            </label>

            {/* Confirm button */}
            <button
              type="button"
              onClick={() => router.push("/user/confirmation")}
              className="w-full bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition"
            >
              Confirm &amp; Pay
            </button>

            {/* Note */}
            <p className="text-xs text-gray-500 mt-4 leading-relaxed">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
