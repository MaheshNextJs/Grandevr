"use client";
import { useState } from "react";
import Image from "next/image";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function BookingForm() {
  const [checkIn, setCheckIn] = useState<Date | null>(null);
  const [checkOut, setCheckOut] = useState<Date | null>(null);
  const [guests, setGuests] = useState<number | null>(null);
  const [children, setChildren] = useState<number | null>(null); // state for children

  return (
    <div className="flex justify-center relative -mt-15 z-20">
      <div className="bg-white text-gray-800 shadow-2xl rounded-xl flex flex-col sm:flex-row items-center gap-6 px-6 py-6 w-[90%] sm:w-auto">
        {/* Check-in */}
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <Image
              src="/images/calendar.png"
              alt="Check-in Date"
              width={15}
              height={15}
              className="mr-2"
            />
            <label className="text-sm font-medium">Check-in Date</label>
          </div>
          <DatePicker
            selected={checkIn}
            onChange={(date) => setCheckIn(date)}
            className="!border-0 rounded-md px-3 py-2 text-sm focus:border focus:border-teal-500 focus:ring-0 transition-all duration-200"
            placeholderText="Pick a date"
          />
        </div>

        {/* Check-out */}
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <Image
              src="/images/calendar.png"
              alt="Check-out Date"
              width={15}
              height={15}
              className="mr-2"
            />
            <label className="text-sm font-medium">Check-out Date</label>
          </div>
          <DatePicker
            selected={checkOut}
            onChange={(date) => setCheckOut(date)}
            className="!border-0 rounded-md px-3 py-2 text-sm focus:border focus:border-teal-500 focus:ring-0 transition-all duration-200"
            placeholderText="Pick a date"
          />
        </div>

        {/* Adults */}
        <div className="flex flex-col">
          <div className="flex items-center mb-1">
            <Image
              src="/images/guests.png"
              alt="Guests"
              width={18}
              height={18}
              className="mr-2"
            />
            <label className="text-sm font-medium">Adults</label>
          </div>
          <input
            type="number"
            value={guests ?? ""}
            onChange={(e) => setGuests(Number(e.target.value))}
            placeholder="How many?"
            className="!border-0 rounded-md px-3 py-2 text-sm focus:border focus:border-teal-500 focus:ring-0 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col">
          <div className="mb-1 h-[1.25rem]"></div>
          <input
            type="number"
            value={children ?? ""}
            onChange={(e) => setChildren(Number(e.target.value))}
            placeholder="Children"
            className="!border-0 rounded-md px-3 py-2 text-sm focus:border focus:border-teal-500 focus:ring-0 transition-all duration-200"
          />
        </div>

        <button className="bg-[#A57865] hover:bg-[#8C664F] text-white px-6 py-3 rounded-full text-sm font-semibold">
          Find Rooms
        </button>
      </div>
    </div>
  );
}
