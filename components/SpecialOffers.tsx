"use client";
import Image from "next/image";

export default function SpecialOffers() {
  return (
    <section className="relative bg-gray-50 text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Special Offers & Packages
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm mx-auto">
          Make the most of your stay with exclusive deals designed just for you.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              <Image
                src="/images/room1.png"
                alt="Romantic Getaway"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-4 left-4 bg-pink-600 text-white text-xs font-semibold px-3 py-1 rounded">
                Save 20%
              </span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Romantic Getaway</h3>
              <p className="text-gray-600 text-sm mt-2">
                2 nights stay with candlelight dinner, spa treatment, and
                champagne on arrival.
              </p>
              <div className="mt-4">
                <button className="w-full text-sm px-5 py-2 bg-[#A57865] text-white rounded font-medium hover:bg-[#A57865]">
                  Book This Package
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              <Image
                src="/images/room2.png"
                alt="Family Staycation"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-4 left-4 bg-yellow-500 text-white text-xs font-semibold px-3 py-1 rounded">
                From $199/night
              </span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Family Staycation</h3>
              <p className="text-gray-600 text-sm mt-2">
                Spacious family suite, complimentary kids&apos; meals, and free
                access to kids&apos; club and pool.
              </p>

              <div className="mt-4">
                <button className="w-full text-sm px-5 py-2 bg-[#A57865] text-white rounded font-medium hover:bg-[#A57865]">
                  Book This Package
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <div className="relative">
              <Image
                src="/images/room3.png"
                alt="Wellness Retreat"
                width={500}
                height={300}
                className="w-full h-56 object-cover"
              />
              <span className="absolute top-4 left-4 bg-green-700 text-white text-xs font-semibold px-3 py-1 rounded">
                Save $150
              </span>
            </div>
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Wellness Retreat</h3>
              <p className="text-gray-600 text-sm mt-2">
                Daily yoga sessions, full-body massage, and organic meals for a
                rejuvenating 3-day escape.
              </p>
              <div className="mt-4">
                <button className="w-full text-sm px-5 py-2 bg-[#A57865] text-white rounded font-medium hover:bg-[#A57865]">
                  Book This Package
                </button>
              </div>
            </div>
          </div>
        </div>

        <button className="mt-12 text-sm px-6 py-3 bg-[#A57865] hover:bg-[#A57865] text-white rounded-md font-semibold">
          View All Offers
        </button>
      </div>
    </section>
  );
}
