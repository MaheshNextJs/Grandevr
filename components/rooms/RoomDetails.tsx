"use client";
import Image from "next/image";

export default function RoomDetails() {
  return (
    <section className="px-6 py-12 bg-white text-gray-800 font-sans">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 pt-10">
          <h2 className="text-xl font-semibold">Rooms & Suites</h2>
          <p className="text-gray-600 text-sm mt-2">
            Home / Rooms & Suites / Executive Suite
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div>
            <Image
              src="/images/Room1.png"
              alt="Executive Suite"
              width={800}
              height={600}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/Room2.png"
              alt="Bathroom"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/Room1.png"
              alt="Kitchen"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <Image
              src="/images/Room3.png"
              alt="Food"
              width={400}
              height={300}
              className="rounded-md object-cover"
            />
            <div className="relative">
              <div className="relative group cursor-pointer">
                <Image
                  src="/images/Room1.png"
                  alt="Bedroom"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="text-2xl font-semibold">Executive Suite</h2>
              <div className="text-right">
                <span className="text-2xl font-bold text-gray-900">$199</span>
                <span className="block text-xs text-gray-500">/ NIGHT</span>
              </div>
            </div>

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

          <div className="border border-gray-200  mb-20 shadow-md rounded-lg p-6">
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
              <button className="w-full mt-4 bg-[#5A2A17] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition">
                Book Now
              </button>
            </div>
          </div>

          <div className="mt-10">
            <h3 className="font-semibold text-lg mb-4">Room Availability</h3>

            <div className="max-w-md">
              <div className="text-center text-sm font-medium mb-4">
                September 2025
              </div>
              <div className="grid grid-cols-7 text-center text-xs font-medium text-gray-600 border-b pb-2">
                <div>SUN</div>
                <div>MON</div>
                <div>TUE</div>
                <div>WED</div>
                <div>THU</div>
                <div>FRI</div>
                <div>SAT</div>
              </div>

              <div className="grid grid-cols-7 text-center text-sm gap-y-2 pt-2">
                {/* Empty slots before Sept 1 */}
                {Array.from({ length: 1 }).map((_, i) => (
                  <div key={`empty-${i}`}></div>
                ))}
                {/* Sept 1 to 7 */}
                {Array.from({ length: 7 }, (_, i) => (
                  <div key={`early-${i}`} className="text-gray-700">
                    {i + 1}
                  </div>
                ))}
                {/* Sept 8 to 11 - Not Available */}
                {[8, 9, 10, 11].map((day) => (
                  <div
                    key={`na-${day}`}
                    className="text-red-600 bg-red-100 rounded-md"
                  >
                    {day}
                  </div>
                ))}
                {/* Sept 12 to 30 - Available */}
                {Array.from({ length: 19 }, (_, i) => {
                  const day = i + 12;
                  return (
                    <div
                      key={`available-${day}`}
                      className="text-green-700 bg-green-100 rounded-md"
                    >
                      {day}
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
          </div>
        </div>

        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Room Amenities</h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span>🍳</span>
              <span>Kitchen</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📶</span>
              <span>Free Wireless Internet</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🧺</span>
              <span>Washing Machine</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🏊</span>
              <span>Pool</span>
            </div>
            <div className="flex items-center gap-2">
              <span>📺</span>
              <span>Television</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🍖</span>
              <span>Barbecue</span>
            </div>
          </div>
        </div>

        {/* Policies */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-4">Policies</h3>
          <ul className="space-y-2 text-sm text-gray-700 list-disc list-inside">
            <li>Check-in: 2:00 PM | Check-out: 12:00 PM</li>
            <li>Cancellation: Free until 24 hours before arrival</li>
            <li>Occupancy: Max 3 adults or 2 adults + 1 child</li>
          </ul>
        </div>

        {/* Room Reviews */}
        <div className="mt-10 max-w-3xl">
          <h3 className="font-semibold text-lg mb-4">Room Reviews</h3>

          {[1, 2].map((review, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-4 border border-gray-200 rounded-md shadow-sm mb-4"
            >
              <Image
                src="/images/user1.png"
                alt="Reviewer"
                width={48} // same as w-12 / 12*4 = 48px
                height={48} // same as h-12
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
