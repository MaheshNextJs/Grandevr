"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import type { Room } from "@/app/user/rooms/data";
import { FEATURE_ICONS } from "@/app/user/rooms/data";

export default function RoomDetailsClient({ room }: { room: Room }) {
  const router = useRouter();

  const [checkIn, setCheckIn] = useState<string>(""); // "YYYY-MM-DD"
  const [checkOut, setCheckOut] = useState<string>("");
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(1);

  const [date, setDate] = useState(new Date(2025, 8)); // September 2025

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const handleBookNow = () => {
    const params = new URLSearchParams({
      roomId: String(room.id),
      in: checkIn || "",
      out: checkOut || "",
      ad: String(adults),
      ch: String(children),
    });
    router.push(`/user/guest-details?${params.toString()}`);
  };

  const handlePrevMonth = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  const handleNextMonth = () =>
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));

  return (
    <section className="px-6 py-12 bg-white text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8 pt-10">
          <h2 className="text-xl font-semibold">Rooms & Suites</h2>
          <p className="text-gray-600 text-sm mt-2">
            Home / Rooms & Suites / {room.title}
          </p>
        </div>

        {/* Room Images */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <Image
              src={room.image}
              alt={room.title}
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src={room.image}
              alt={`${room.title} 1`}
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <Image
              src={room.image}
              alt={`${room.title} 2`}
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <Image
              src={room.image}
              alt={`${room.title} 3`}
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <div className="relative">
              <div className="relative group cursor-pointer">
                <Image
                  src={room.image}
                  alt={`${room.title} 4`}
                  width={400}
                  height={300}
                  className="rounded-md object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute text-center inset-x-0 bottom-0 bg-black/50 text-white text-sm font-medium rounded-b-md px-3 py-2 transition-opacity duration-500 group-hover:opacity-50">
                  See More Photos {">"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Grid (3 cols) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Left Content */}
          <div className="lg:col-span-2">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-semibold">{room.title}</h2>
              <div className="text-right flex items-baseline justify-end">
                <span className="text-2xl font-bold text-gray-900">
                  ${room.price}
                </span>
                <span className="text-md font-normal text-gray-400 ml-1">
                  / Night
                </span>
              </div>
            </div>

            <p className="text-gray-600 mb-6">{room.description}</p>

            <p className="text-gray-600 mb-6">
              This comfortable, modern hotel is set in the urban center of
              Pontevedra, 10 minutes&apos; walk from the historic quarter. It
              offers a terrace and chic, air-conditioned rooms with free Wi-Fi.
            </p>

            <p className="text-gray-600 mb-6">
              Accommodations feature contemporary design and central heating.
              All rooms include a 26-inch plasma satellite TV, a work desk, and
              a private bathroom with hairdryer.
            </p>

            <p className="text-gray-600 mb-6">
              Breakfast is served daily and the hotel&rsquo;s restaurant offers
              a varied, modern menu from Monday to Saturday. Several bars,
              restaurants, and shops are within 5 minutes&rsquo; walk.
            </p>

            {/* Room details */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold text-lg mb-4">Room details</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between border-b border-gray-200 pb-2 pt-3">
                  <span>Guests</span>
                  <span>1</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2 pt-3">
                  <span>Children</span>
                  <span>2</span>
                </li>
                <li className="flex justify-between border-b border-gray-200 pb-2 pt-3">
                  <span>Room size</span>
                  <span>140 m²</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Booking Card */}
          {/* <div className="border border-gray-200 mb-20 shadow-md rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Adults
                  </label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm">
                    <option>1 Adult</option>
                    <option>2 Adults</option>
                    <option>3 Adults</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Children
                  </label>
                  <select className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm">
                    <option>0 Children</option>
                    <option>1 Child</option>
                    <option>2 Children</option>
                  </select>
                </div>
              </div>

              <button
                onClick={() =>
                  router.push(`/user/guest-details?roomId=${room.id}`)
                }
                className="w-full mt-4 bg-[#5A2A17] text-white py-3 rounded-md text-sm 
  transition-all duration-300 ease-in-out 
  hover:bg-[#7a3c23] hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div> */}

          <div className="border border-gray-200 mb-20 shadow-md rounded-lg p-6">
            <div className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-in Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Check-out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Adults
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                  >
                    <option value={1}>1 Adult</option>
                    <option value={2}>2 Adults</option>
                    <option value={3}>3 Adults</option>
                    <option value={4}>4 Adults</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Children
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="mt-1 w-full border border-gray-300 rounded-md px-3 py-3 text-sm"
                  >
                    <option value={0}>0 Children</option>
                    <option value={1}>1 Child</option>
                    <option value={2}>2 Children</option>
                    <option value={3}>3 Children</option>
                  </select>
                </div>
              </div>

              <button
                onClick={handleBookNow}
                className="w-full mt-4 bg-[#5A2A17] text-white py-3 rounded-md text-sm 
                transition-all duration-300 ease-in-out 
                hover:bg-[#7a3c23] hover:scale-105 hover:shadow-lg active:scale-95"
              >
                Book Now
              </button>
            </div>
          </div>

          {/* Availability */}
          <div className="max-w-md">
            <div className="flex items-center justify-between mb-4 w-full">
              <h3 className="font-semibold text-lg">Room Availability</h3>
            </div>

            <div className="flex items-center justify-between text-sm font-medium mb-4">
              <button
                onClick={handlePrevMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaChevronLeft />
              </button>
              <div className="text-center">
                {monthNames[date.getMonth()]} {date.getFullYear()}
              </div>
              <button
                onClick={handleNextMonth}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <FaChevronRight />
              </button>
            </div>

            {/* Days of week header */}
            <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600 pb-2">
              <div>SUN</div>
              <div>MON</div>
              <div>TUE</div>
              <div>WED</div>
              <div>THU</div>
              <div>FRI</div>
              <div>SAT</div>
            </div>

            {/* Example static month (same as your sample) */}
            <div className="grid grid-cols-7 text-center text-sm gap-y-2 pt-2">
              {Array.from({ length: 1 }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: 7 }, (_, i) => (
                <div key={`early-${i}`} className="text-gray-700">
                  {i + 1}
                </div>
              ))}
              {[8, 9, 10, 11].map((d) => (
                <div
                  key={`na-${d}`}
                  className="text-red-600 bg-red-100 rounded-md"
                >
                  {d}
                </div>
              ))}
              {Array.from({ length: 19 }, (_, i) => {
                const d = i + 12;
                return (
                  <div
                    key={`available-${d}`}
                    className="text-green-700 bg-green-100 rounded-md"
                  >
                    {d}
                  </div>
                );
              })}
            </div>

            {/* Legend */}
            <div className="flex justify-start items-center gap-4 mt-4 text-sm">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
                <span>Not Available</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                <span>Available</span>
              </div>
            </div>
          </div>

          {/* Spacer (keeps grid tidy) */}
          <div></div>

          {/* Chat Icon */}
          <div className="bottom-6 pl-[300px]">
            <Image
              src="/icons/chat.png"
              alt="Chat Icon"
              width={64}
              height={64}
              className="cursor-pointer"
            />
          </div>
        </div>

        {/* Amenities */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Room Amenities</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            {room.features.map((f) => (
              <div key={f} className="flex items-center gap-2">
                <Image
                  src={FEATURE_ICONS[f] || "/icons/default.png"}
                  alt={f}
                  width={15}
                  height={15}
                />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Policies */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li className="p-2">Check-in: 2:00 PM | Check-out: 12:00 PM</li>
            <li className="p-2">
              Cancellation: Free until 24 hours before arrival
            </li>
            <li className="p-2">
              Occupancy: Max 3 adults or 2 adults + 1 child
            </li>
          </ul>
        </div>

        {/* Reviews */}
        <div className="mt-10 max-w-3xl">
          <h3 className="font-semibold text-lg mb-4">Room Reviews</h3>
          {[1, 2].map((_, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm mb-4"
            >
              <Image
                src="/images/user1.png"
                alt="Reviewer"
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
              <div>
                <h4 className="font-medium text-gray-900 mb-1">John D.</h4>
                <div className="flex items-center text-yellow-500 mb-2">
                  {[...Array(4)].map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                  <span className="text-gray-300">★</span>
                </div>
                <p className="text-gray-600 mb-6">
                  Breakfast is served daily and the hotel&rsquo;s restaurant
                  offers a varied, modern menu from Monday to Saturday. Several
                  bars, restaurants, and shops are within 5 minutes&rsquo; walk.
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Similar Rooms */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Similar Rooms</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
              <Image
                src="/images/Room2.png"
                alt="Room"
                width={400}
                height={250}
                className="rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">Deluxe Room</h4>
                <p className="text-[#b55d3b] font-medium text-sm mb-2">
                  $250.00 <span className="text-gray-600">/ per night</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Spacious room with modern design and great city view.
                </p>
                <button className="w-full border border-[#b55d3b] text-[#b55d3b] rounded-md py-2 text-sm hover:bg-[#b55d3b] hover:text-white transition">
                  View Details
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition">
              <Image
                src="/images/Room2.png"
                alt="Executive Suite"
                width={500}
                height={300}
                className="rounded-t-lg object-cover"
              />
              <div className="p-4">
                <h4 className="font-semibold text-gray-900">Executive Suite</h4>
                <p className="text-[#b55d3b] font-medium text-sm mb-2">
                  $350.00 <span className="text-gray-600">/ per night</span>
                </p>
                <p className="text-sm text-gray-600 mb-4">
                  Luxurious suite with separate living area and premium
                  amenities.
                </p>
                <button className="w-full border border-[#b55d3b] text-[#b55d3b] rounded-md py-2 text-sm hover:bg-[#b55d3b] hover:text-white transition">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
