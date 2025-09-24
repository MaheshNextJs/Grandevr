"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

/* ---------- dummy data ---------- */
type Room = {
  id: string;
  name: string;
  price: number;
  rating: number;
  amenities: string[];
  image: string;
  capacity: number;
};
const ROOMS: Room[] = [
  {
    id: "exec",
    name: "Executive Suite",
    price: 199,
    rating: 4.6,
    amenities: [
      "Kitchen",
      "WiFi",
      "Washing Machine",
      "Pool",
      "Televison",
      "Barbecue",
    ],
    capacity: 2,
    image: "/images/Room1.png",
  },
  {
    id: "pres-1",
    name: "Presidential Suite",
    price: 400,
    rating: 4.9,
    amenities: ["Wi‑Fi", "Sea View", "Mini Bar", "Butler"],
    image: "/images/Room2.png",
    capacity: 3,
  },
  {
    id: "pres-2",
    name: "Presidential Suite",
    price: 400,
    rating: 4.9,
    amenities: ["Wi‑Fi", "Sea View", "Mini Bar", "Butler"],
    image: "/images/Room3.png",
    capacity: 4,
  },
];

const steps = ["Dates & Rooms", "Guest Details", "Payment", "Confirmation"];

/* ---------- utils ---------- */
function nightsBetween(a?: string, b?: string) {
  if (!a || !b) return 3; // sensible default
  const A = new Date(a);
  const B = new Date(b);
  const diff = Math.max(1, Math.round((+B - +A) / (1000 * 60 * 60 * 24)));
  return diff;
}

function RoomsPage() {
  const router = useRouter();
  const params = useSearchParams();

  /* stepper sizing */
  const [currentStep] = useState(1);
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

  /* query defaults from URL */
  const [checkin, setCheckin] = useState(params.get("checkin") ?? "");
  const [checkout, setCheckout] = useState(params.get("checkout") ?? "");
  const [adults, setAdults] = useState(Number(params.get("adults") ?? 2));
  const [children, setChildren] = useState(Number(params.get("children") ?? 0));

  /* filters */
  const [maxPrice, setMaxPrice] = useState(700);
  const [roomTypes, setRoomTypes] = useState<Record<string, boolean>>({
    Deluxe: false,
    "Executive Suite": true,
    "Presidential Suite": true,
    Penthouse: false,
    Family: false,
  });
  const [amenities, setAmenities] = useState<Record<string, boolean>>({
    "Free Breakfast": false,
    "Room Service": false,
    "Mini Bar": false,
    "Sea View": false,
    Desk: false,
  });

  const [occupancy, setOccupancy] = useState<"2" | "3" | "4+" | null>(null);

  /* selection */
  const [selectedRoomId, setSelectedRoomId] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const filteredRooms = useMemo(() => {
    const chosenTypes = Object.entries(roomTypes)
      .filter(([, v]) => v)
      .map(([k]) => k);
    return ROOMS.filter((r) => {
      const typeOk = chosenTypes.length === 0 || chosenTypes.includes(r.name);
      const priceOk = r.price <= maxPrice;
      const amenitiesOk = Object.entries(amenities)
        .filter(([, v]) => v)
        .every(
          ([k]) =>
            r.amenities
              .join(" ")
              .toLowerCase()
              .includes(k.toLowerCase().replace(/\s+/g, "")) ||
            r.amenities.includes(k)
        );
      const occOk =
        !occupancy ||
        (occupancy === "2" && r.capacity >= 2) ||
        (occupancy === "3" && r.capacity >= 3) ||
        (occupancy === "4+" && r.capacity >= 4);

      return typeOk && priceOk && amenitiesOk && occOk;
    });
  }, [roomTypes, maxPrice, amenities]);

  const nights = nightsBetween(checkin, checkout);
  const selectedRoom =
    filteredRooms.find((r) => r.id === selectedRoomId) ||
    ROOMS.find((r) => r.id === selectedRoomId);
  const subtotal = selectedRoom ? selectedRoom.price * nights * quantity : 0;
  const taxes = Math.round(subtotal * 0.1);
  const total = subtotal + taxes;

  const proceed = () => {
    if (!selectedRoom) return;
    router.push("/booking/guestdetails");
  };

  return (
    <section className="px-6 py-25 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        {/* Stepper */}
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
            {steps.map((s, i) => {
              const n = i + 1;
              const isCurrent = n === currentStep;
              const isCompleted = n < currentStep;
              return (
                <div
                  key={s}
                  className="flex flex-col items-center gap-2"
                  ref={
                    i === 0
                      ? firstRef
                      : i === steps.length - 1
                      ? lastRef
                      : undefined
                  }
                >
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm ${
                      isCompleted
                        ? "bg-[#A57865] text-white"
                        : isCurrent
                        ? "bg-white border-2 border-gray-200 text-[#A57865]"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? "✓" : n}
                  </div>
                  <span
                    className={`text-sm ${
                      isCurrent ? "text-[#A57865]" : "text-gray-500"
                    }`}
                  >
                    {s}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Title */}
        <div className="flex items-end justify-between mb-6">
          <div>
            <h1 className="text-xl font-semibold">
              You found {filteredRooms.length} rooms
            </h1>
          </div>
          <div>
            <select className="border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>Sort by: Default</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Left filters */}
          <aside className="md:col-span-1 space-y-6">
            {/* Booking details */}
            <div className="border border-gray-300 rounded-md p-4">
              <h4 className="font-semibold text-sm mb-3">Booking Details</h4>
              <label className="block text-xs text-gray-600 mb-1">
                Check‑in Date
              </label>
              <input
                type="date"
                value={checkin}
                onChange={(e) => setCheckin(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3"
              />
              <label className="block text-xs text-gray-600 mb-1">
                Check‑out Date
              </label>
              <input
                type="date"
                value={checkout}
                onChange={(e) => setCheckout(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm mb-3"
              />
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Adults
                  </label>
                  <input
                    type="number"
                    min={1}
                    value={adults}
                    onChange={(e) => setAdults(+e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">
                    Children
                  </label>
                  <input
                    type="number"
                    min={0}
                    value={children}
                    onChange={(e) => setChildren(+e.target.value)}
                    className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border border-gray-300 rounded-md p-4">
              <h4 className="font-semibold text-sm mb-3">Price Range</h4>
              <input
                type="range"
                min={50}
                max={700}
                value={maxPrice}
                onChange={(e) => setMaxPrice(+e.target.value)}
                className="w-full"
              />
              <div className="text-xs text-gray-600 mt-1">$0 – ${maxPrice}</div>
            </div>

            {/* Room Type */}
            <div className="border border-gray-300 rounded-md p-4">
              <h4 className="font-semibold text-sm mb-3">Room Type</h4>
              {Object.keys(roomTypes).map((k) => (
                <label key={k} className="flex items-center gap-2 text-sm mb-2">
                  <input
                    type="checkbox"
                    checked={roomTypes[k]}
                    onChange={() =>
                      setRoomTypes({ ...roomTypes, [k]: !roomTypes[k] })
                    }
                  />
                  {k}
                </label>
              ))}
            </div>

            {/* Amenities */}
            <div className="border  border-gray-300 rounded-md p-4">
              <h4 className="font-semibold text-sm mb-3">Amenities</h4>
              {Object.keys(amenities).map((k) => (
                <label key={k} className="flex items-center gap-2 text-sm mb-2">
                  <input
                    type="checkbox"
                    checked={amenities[k]}
                    onChange={() =>
                      setAmenities({ ...amenities, [k]: !amenities[k] })
                    }
                  />
                  {k}
                </label>
              ))}
            </div>

            {/* ✅ Occupancy */}
            <div className="border  border-gray-300 rounded-md p-4">
              <h4 className="font-semibold text-sm mb-3">Occupancy</h4>
              <div className="space-y-2 text-sm">
                {["2", "3", "4+"].map((opt) => (
                  <label key={opt} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={occupancy === (opt as "2" | "3" | "4+")}
                      onChange={() =>
                        setOccupancy(
                          occupancy === opt ? null : (opt as "2" | "3" | "4+")
                        )
                      }
                    />
                    {opt === "4+" ? "4+ Guests" : `${opt} Guests`}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          <main className="md:col-span-2 space-y-6">
            {filteredRooms.map((room) => {
              const isSelected = selectedRoomId === room.id;
              const qty = isSelected ? quantity : 1;

              const StarRow = ({ rating }: { rating: number }) => {
                const full = Math.floor(rating);
                const half = rating - full >= 0.5 ? 1 : 0;
                const empty = 5 - full - half;
                const stars = [
                  ...Array(full).fill("full"),
                  ...Array(half).fill("half"),
                  ...Array(empty).fill("empty"),
                ];
                return (
                  <div className="flex items-center gap-1">
                    {stars.map((t, i) => (
                      <span
                        key={i}
                        className={
                          t === "empty" ? "text-gray-300" : "text-yellow-400"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                );
              };

              const getAmenityIcon = (amenity: string) => {
                const src = {
                  Kitchen: "/icons/kitchen.png",
                  Barbecue: "/icons/barbecue.png",
                  WiFi: "/icons/wifi.png",
                  Televison: "/icons/tv.png",
                  "Washing Machine": "/icons/washing machine.png",
                  Pool: "/icons/pool.png",
                }[amenity];
                return src ? (
                  <Image
                    src={src}
                    alt={amenity}
                    width={12}
                    height={12}
                    className="inline-block"
                  />
                ) : (
                  <span className="inline-block w-4 h-4 rounded-full border border-gray-300" />
                );
              };

              const AmenityRow = ({ items }: { items: string[] }) => (
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-700">
                  {items.slice(0, 6).map((a) => (
                    <span key={a} className="inline-flex items-center gap-2">
                      {getAmenityIcon(a)}
                      {a}
                    </span>
                  ))}
                </div>
              );

              return (
                <div
                  key={room.id}
                  className="border border-gray-300 rounded-lg shadow-sm overflow-hidden bg-white"
                >
                  {/* TOP IMAGE — full width */}
                  <Image
                    src={room.image}
                    alt={room.name}
                    width={1000}
                    height={600}
                    className=" h-64 md:h-70 object-cover p-2"
                    priority
                  />

                  {/* CONTENT */}
                  <div className="p-6">
                    {/* title + price */}
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold text-xl">{room.name}</h3>
                      <div className="text-right">
                        <div className="text-xl font-semibold">
                          ${room.price}
                        </div>
                        <div className="text-[11px] uppercase tracking-wide text-gray-500">
                          Per Night
                        </div>
                      </div>
                    </div>

                    {/* stars */}
                    <div className="">
                      <StarRow rating={room.rating} />
                    </div>

                    <p className="mt-2 text-[10px] text-gray-600">
                      Private terrace, jacuzzi, butler service.
                    </p>

                    <AmenityRow items={room.amenities} />

                    {/* actions: quantity left, buttons right — same line */}
                    <div className="mt-6 flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
                      {/* quantity */}
                      <div className="flex items-center gap-3">
                        <span className="text-sm">Quantity:</span>
                        <div className="inline-flex items-center border border-gray-300 rounded-md">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRoomId(room.id);
                              setQuantity(Math.max(0, qty - 1));
                            }}
                            className="px-3 py-1 text-sm"
                          >
                            –
                          </button>
                          <span className="px-4 py-1 text-sm">{qty}</span>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedRoomId(room.id);
                              setQuantity(Math.min(9, qty + 1));
                            }}
                            className="px-3 py-1 text-sm"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      {/* buttons */}
                      <div className="ml-auto flex items-center gap-3 shrink-0">
                        <button
                          className="border border-gray-300 px-4 py-2 rounded-md text-sm hover:bg-gray-50"
                          onClick={() => setSelectedRoomId(room.id)}
                        >
                          View Details
                        </button>
                        <button
                          onClick={() => setSelectedRoomId(room.id)}
                          className="bg-[#A57865] text-white px-5 py-2 rounded-md text-sm hover:bg-[#7a3c23]"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </main>

          {/* Right: selection summary */}
          <aside className="md:col-span-1">
            <div className="border border-gray-300 rounded-md shadow-sm p-4 sticky top-6">
              <h4 className="font-semibold mb-3">Your Selection</h4>
              <div className="text-sm space-y-2 text-gray-700">
                <div className="flex justify-between">
                  <span>Check‑in</span>
                  <span>{checkin || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Check‑out</span>
                  <span>{checkout || "—"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Guests</span>
                  <span>
                    {adults} Adult{adults > 1 ? "s" : ""}, {children} Child
                    {children !== 1 ? "ren" : ""}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Rooms</span>
                  <span>
                    {quantity} × {selectedRoom?.name || "—"}
                  </span>
                </div>
              </div>

              <div className="mt-3 border-t border-gray-300 pt-3 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Taxes & Fees</span>
                  <span>${taxes}</span>
                </div>
                <div className="flex justify-between font-semibold text-base pt-1">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
              </div>

              <button
                disabled={!selectedRoom}
                onClick={proceed}
                className={`mt-4 w-full py-2 rounded-md text-sm transition-colors ${
                  selectedRoom
                    ? "bg-[#A57865] text-white hover:bg-[#7a3c23]"
                    : "bg-gray-200 text-gray-500 cursor-not-allowed"
                }`}
              >
                Continue to Guest Details
              </button>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default function RoomsPageWithSuspense() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <RoomsPage />
    </Suspense>
  );
}
