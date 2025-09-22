"use client";
import Image from "next/image";

export default function DiningAndFacilities() {
  return (
    <section className="relative bg-white text-gray-800 px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">Dining & Facilities</h2>
        <p className="mt-4 text-gray-600 max-w-2xl text-sm mx-auto">
          From world-class dining to relaxing wellness experiences, discover
          everything we offer during your stay.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-2">
          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/images/room1.png"
              alt="Exquisite Dining"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Exquisite Dining</h3>
              <p className="text-gray-600 text-sm mt-2">
                Enjoy gourmet cuisine, international flavors, and signature
                cocktails in our restaurant, bar, and café.
              </p>
              <div className="mt-4">
                <button className="px-5 py-2 text-sm bg-[#A57865] text-white rounded font-medium hover:bg-[#A57865]">
                  Explore Dining Options
                </button>
              </div>
            </div>
          </div>

          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden">
            <Image
              src="/images/room3.png"
              alt="Wellness & Recreation"
              width={500}
              height={300}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-left">
              <h3 className="font-semibold text-lg">Wellness & Recreation</h3>
              <p className="text-gray-600 text-sm mt-2">
                Relax at our spa, take a dip in the pool, or stay fit at the
                modern gym.
              </p>
              <div className="mt-4">
                <button className="px-5 py-2 text-sm bg-[#A57865] text-white rounded font-medium hover:bg-[#A57865]">
                  View Facilities
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-8 sm:grid-cols-1 lg:grid-cols-1">
          <div className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition overflow-hidden flex flex-col sm:flex-row">
            <Image
              src="/images/room2.png"
              alt="Events & Celebrations"
              width={500}
              height={300}
              className="w-full sm:w-1/2 h-56 object-cover"
            />
            <div className="p-6 text-left flex-1">
              <h3 className="font-semibold text-lg">Events & Celebrations</h3>
              <p className="text-gray-600 text-sm mt-2">
                Host your weddings, parties, or business meetings in our elegant
                event spaces with professional support staff.
              </p>
              <div className="mt-10">
                <button className="px-5 py-2 bg-[#A57865] text-white text-sm rounded font-medium hover:bg-[#A57865]">
                  Plan Your Event
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
