"use client";
import Image from "next/image";
import Link from "next/link";

export default function RoomsAndSuites() {
  return (
    <section className="relative bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Rooms & Suites</h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm mx-auto">
          Choose from our elegant rooms and luxury suites, designed for your
          comfort and style.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              <Image
                src="/images/Room1.png"
                alt="Deluxe King Room"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded">
                Most Popular
              </span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Deluxe King Room</h3>
              <p className="text-[#A57865] font-semibold mt-1">
                $350.00{" "}
                <span className="text-gray-500 text-sm">/ per night</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Spacious room with king bed, balcony, and city view.
              </p>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 border border-[#A57865] text-[#A57865] rounded-sm py-2 text-sm font-medium hover:bg-teal-50">
                  View Details
                </button>
                <button className="flex-1 bg-[#A57865] text-white rounded-sm py-2 text-sm font-medium hover:bg-[#A57865]">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/images/Room2.png"
              alt="Executive Suite"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Executive Suite</h3>
              <p className="text-[#A57865] font-semibold mt-1">
                $350.00{" "}
                <span className="text-gray-500 text-sm">/ per night</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Luxurious suite with separate living area and premium amenities.
              </p>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 border border-[#A57865] text-[#A57865] rounded-sm py-2 text-sm font-medium hover:bg-teal-50">
                  View Details
                </button>
                <button className="flex-1 bg-[#A57865] text-white rounded-sm py-2 text-sm font-medium hover:bg-[#A57865]">
                  Book Now
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/images/Room3.png"
              alt="Presidential Suite"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Presidential Suite</h3>
              <p className="text-[#A57865] font-semibold mt-1">
                $350.00{" "}
                <span className="text-gray-500 text-sm">/ per night</span>
              </p>
              <p className="text-gray-600 text-sm mt-2">
                Ultimate luxury with panoramic views and exclusive amenities.
              </p>

              <div className="mt-4 flex gap-3">
                <button className="flex-1 border border-[#A57865] text-[#A57865] rounded-sm py-2 text-sm font-medium hover:bg-teal-50">
                  View Details
                </button>
                <button className="flex-1 bg-[#A57865] text-white rounded-sm py-2 text-sm font-medium hover:bg-[#A57865]">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Link href="/user/rooms">
            <button
              className="mt-12 px-6 py-3 border border-[#5A2A17] text-[#5A2A17] bg-white rounded-sm text-sm font-medium 
      hover:bg-[#f5ece8] 
      active:bg-[#e8d8d3] 
      active:translate-y-[2px] 
      active:shadow-inner 
      transition transform duration-150"
            >
              Explore All Rooms & Suites
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
