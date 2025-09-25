"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const steps = [
  "Reservation Login",
  "ID Verification",
  "Preferences",
  "Add-On Payment",
  "Digital Signature",
  "Confirmation",
];

type AddOn = { id: string; label: string; price: number; note?: string };

const ADDONS: AddOn[] = [
  {
    id: "breakfast",
    label: "Breakfast Package",
    price: 30,
    note: "$10/night (3 nights)",
  },
  { id: "airport", label: "Airport Pickup", price: 30 },
  { id: "spa", label: "Spa Voucher", price: 30 },
  { id: "late", label: "Late Checkout (2 PM)", price: 30 },
];

export default function PreferencesPage() {
  const router = useRouter();
  const [currentStep] = useState(3);

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

  // form state
  const [bed, setBed] = useState<"king" | "twin">("king");
  const [floor, setFloor] = useState<"high" | "low" | "none">("high");
  const [arrival, setArrival] = useState("10:00 - 11:00");
  const [selectedAddOns, setSelectedAddOns] = useState<Record<string, boolean>>(
    {
      breakfast: true,
      airport: true,
      spa: false,
      late: false,
    }
  );

  const addOnsTotal = useMemo(
    () =>
      ADDONS.filter((a) => selectedAddOns[a.id]).reduce(
        (sum, a) => sum + a.price,
        0
      ),
    [selectedAddOns]
  );

  const toggleAddOn = (id: string) =>
    setSelectedAddOns((prev) => ({ ...prev, [id]: !prev[id] }));

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
                        ? "bg-white border-2 border-[#D5D5D5] text-[#A57865]"
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

        {/* ===== Grid ===== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left: Preferences form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-semibold">Customize Your Stay</h1>
            <p className="text-sm text-gray-600 mt-2 mb-8">
              Add your preferences to make your arrival smoother
            </p>

            {/* Bed Preference */}
            <Section title="Bed Preference">
              <Pills>
                <Pill active={bed === "king"} onClick={() => setBed("king")}>
                  King Bed
                </Pill>
                <Pill active={bed === "twin"} onClick={() => setBed("twin")}>
                  King Bed
                </Pill>
              </Pills>
            </Section>

            {/* Floor Preference */}
            <Section title="Floor Preference">
              <Pills>
                <Pill
                  active={floor === "high"}
                  onClick={() => setFloor("high")}
                >
                  High Floor
                </Pill>
                <Pill active={floor === "low"} onClick={() => setFloor("low")}>
                  Low Floor
                </Pill>
                <Pill
                  active={floor === "none"}
                  onClick={() => setFloor("none")}
                >
                  No Preference
                </Pill>
              </Pills>
            </Section>

            {/* Estimated Arrival Time */}
            <Section title="Estimated Arrival Time">
              <Pills>
                {[
                  "10:00 - 11:00",
                  "12:00 - 13:00",
                  "13:00 - 14:00",
                  "17:00 - 18:00",
                ].map((t) => (
                  <Pill
                    key={t}
                    active={arrival === t}
                    onClick={() => setArrival(t)}
                  >
                    {t}
                  </Pill>
                ))}
              </Pills>
            </Section>

            {/* Enhance Your Stay */}
            <h3 className="text-sm font-semibold mt-8 mb-3">
              Enhance Your Stay
            </h3>
            <div className="space-y-3">
              {ADDONS.map((a) => {
                const checked = !!selectedAddOns[a.id];
                return (
                  <label
                    key={a.id}
                    className="flex items-center justify-between gap-3 border border-[#D5D5D5] rounded-md px-4 py-3 text-sm hover:border-gray-400 transition-colors"
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={checked}
                        onChange={() => toggleAddOn(a.id)}
                        className="w-4 h-4 accent-[#A57865]"
                      />
                      <span className="flex flex-col">
                        <span className="text-gray-800">{a.label}</span>
                        {a.note && (
                          <span className="text-xs text-gray-500">
                            {a.note} = ${a.price}
                          </span>
                        )}
                      </span>
                    </span>
                    <span className="text-gray-700">${a.price}</span>
                  </label>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => router.push("/pre-check-in/add-on-payment")}
                className="w-full  bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition-colors"
              >
                Continue
              </button>
            </div>
          </div>

          {/* Right: Booking Summary */}
          <aside className="lg:col-span-1">
            <div className="border border-gray-200 rounded-lg shadow-sm p-5 text-sm sticky top-6">
              <h4 className="font-semibold mb-4">Booking Summary</h4>

              <Row label="Reservation ID" value="#HT123456" />
              <Row label="Check-in" value="20–23 Sept 2025" />
              <Row label="Check-out" value="20–23 Sept 2025" />
              <Row label="Guests" value="2 Adults, 1 Child" />
              <Row label="Room" value="Executive Suite × 1" />
              <div className="flex items-center justify-between py-2 border-b">
                <span className="text-gray-500">Status</span>
                <span className="text-xs px-2 py-1 rounded bg-green-100 text-green-700">
                  Room Paid
                </span>
              </div>

              <h5 className="mt-4 mb-2 font-semibold text-gray-800">
                Selected Add-Ons
              </h5>
              <div className="space-y-2">
                {ADDONS.filter((a) => selectedAddOns[a.id]).length === 0 ? (
                  <p className="text-gray-500">None</p>
                ) : (
                  ADDONS.filter((a) => selectedAddOns[a.id]).map((a) => (
                    <div key={a.id} className="flex justify-between">
                      <span className="text-gray-700">{a.label}</span>
                      <span>${a.price}</span>
                    </div>
                  ))
                )}
              </div>

              <div className="mt-3 bg-gray-100 rounded px-3 py-2 flex justify-between">
                <span className="font-medium">Total Add‑Ons</span>
                <span className="font-semibold">${addOnsTotal}</span>
              </div>

              <p className="text-[11px] text-gray-500 mt-3">
                Payment method will be selected in the next step.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

/* ---------- small helpers ---------- */

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold mb-3">{title}</h3>
      {children}
    </div>
  );
}

function Pills({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-wrap gap-3">{children}</div>;
}

function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-md border text-sm transition-colors ${
        active
          ? "border-[#A57865] text-[#A57865] bg-[#faf5f3]"
          : "border-gray-300 text-gray-700 hover:border-gray-400"
      }`}
    >
      <span className="inline-flex items-center gap-2">
        <span
          className={`inline-block w-3 h-3 rounded-full border ${
            active ? "bg-[#A57865] border-[#A57865]" : "border-gray-300"
          }`}
        />
        {children}
      </span>
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-2 border-b">
      <span className="text-gray-500">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );
}
