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

export default function DigitalSignaturePage() {
  const router = useRouter();
  const [currentStep] = useState(5);

  // Stepper sizing
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

  // Terms consent + signature
  const [consented, setConsented] = useState(false);
  const [hasSigned, setHasSigned] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const drawing = useRef(false);
  const last = useRef<{ x: number; y: number } | null>(null);

  // Resize canvas to device pixel ratio for crisp lines
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      ctx.scale(ratio, ratio);
      // Light baseline line style stays default
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  const getPos = (e: MouseEvent | TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    let clientX: number, clientY: number;
    if (e instanceof TouchEvent) {
      const t = e.touches[0] || e.changedTouches[0];
      clientX = t.clientX;
      clientY = t.clientY;
    } else {
      clientX = (e as MouseEvent).clientX;
      clientY = (e as MouseEvent).clientY;
    }
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const startDraw = (e: MouseEvent | TouchEvent) => {
    e.preventDefault();
    drawing.current = true;
    last.current = getPos(e);
  };

  const draw = (e: MouseEvent | TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const now = getPos(e);
    const prev = last.current!;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#2d2d2d";
    ctx.beginPath();
    ctx.moveTo(prev.x, prev.y);
    ctx.lineTo(now.x, now.y);
    ctx.stroke();
    last.current = now;
    if (!hasSigned) setHasSigned(true);
  };

  const endDraw = (e: MouseEvent | TouchEvent) => {
    if (!drawing.current) return;
    e.preventDefault();
    drawing.current = false;
    last.current = null;
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSigned(false);
  };

  const handleSubmit = () => {
    router.push("/user/pre-check-in/confirmation");
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

        {/* ===== Header ===== */}
        <h1 className="text-xl font-semibold mb-1">
          Confirm &amp; Pay for Add-Ons
        </h1>
        <p className="text-sm text-gray-600 mb-8">
          Complete payment for the extras you selected.
        </p>

        {/* ===== Reservation Details Card ===== */}
        <div className="border border-gray-200 rounded-lg shadow-sm p-5 mb-8">
          <h2 className="font-semibold mb-4">Reservation Details</h2>
          <div className="divide-y divide-gray-100">
            {[
              ["Guest Name", "John Doe"],
              ["Reservation ID", "#HT123456"],
              ["Dates", "20–23 Sept 2025"],
              ["Room", "Executive Suite × 1"],
              ["Guests", "2 Adults, 1 Child"],
              ["Add-Ons", "Breakfast ($30), Airport Pickup ($30)"],
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between py-2 text-sm">
                <span className="text-gray-600">{label}</span>
                <span className="text-gray-800">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ===== Terms & Conditions ===== */}
        <div className="mb-6">
          <h3 className="text-sm font-semibold mb-2">Terms &amp; Conditions</h3>
          <ul className="text-sm text-gray-700 space-y-3 mb-3 list-disc pl-5">
            <li>I confirm that the above details are correct.</li>
            <li>
              I agree to the hotel’s policies on check‑in, occupancy, and
              cancellations.
            </li>
            <li>
              I authorize the hotel to process charges for selected add‑ons.
            </li>
          </ul>

          <label className="flex items-start gap-2 text-xs text-gray-500">
            <input
              type="checkbox"
              checked={consented}
              onChange={(e) => setConsented(e.target.checked)}
              className="mt-[3px]"
            />
            <span>
              I confirm that the above information is accurate and agree to the
              hotel’s terms.
            </span>
          </label>
        </div>

        {/* ===== Digital Signature ===== */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-semibold">Digital Signature</h3>
            <button
              type="button"
              onClick={clearCanvas}
              className="text-sm text-[#A57865] hover:underline"
            >
              Clear
            </button>
          </div>

          {/* Signature Canvas */}
          <div className="border rounded-md border-gray-300 bg-white">
            <div
              className="h-48 md:h-56"
              // container for intrinsic size; canvas scales to this via CSS size
              style={{ position: "relative" }}
            >
              <canvas
                ref={canvasRef}
                className="w-full h-full rounded-md cursor-crosshair"
                onMouseDown={(e) => startDraw(e.nativeEvent)}
                onMouseMove={(e) => draw(e.nativeEvent)}
                onMouseUp={(e) => endDraw(e.nativeEvent)}
                onMouseLeave={(e) => endDraw(e.nativeEvent)}
                onTouchStart={(e) => startDraw(e.nativeEvent)}
                onTouchMove={(e) => draw(e.nativeEvent)}
                onTouchEnd={(e) => endDraw(e.nativeEvent)}
              />
            </div>
            <div className="text-center text-xs text-gray-500 border-t border-gray-300 py-2">
              Sign here with your finger, stylus, or mouse.
            </div>
          </div>
        </div>

        {/* ===== Submit ===== */}
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            disabled={!consented || !hasSigned}
            onClick={handleSubmit}
            className={`w-full max-w-[720px] bg-[#A57865] text-white py-3 rounded-md text-sm transition-colors duration-300 ${
              consented && hasSigned
                ? "hover:bg-[#7a3c23]"
                : "opacity-60 cursor-not-allowed"
            }`}
          >
            Submit Pre‑Check‑In
          </button>
        </div>
      </div>
    </section>
  );
}
