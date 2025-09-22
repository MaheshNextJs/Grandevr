"use client";
import Image from "next/image";
import Link from "next/link";

export default function RoomsPage() {
  const rooms = [
    {
      id: 1,
      title: "Deluxe King Room",
      price: 199,
      description: "Spacious room with king bed, balcony & city view.",
      image: "/images/deluxekingroom.png",
      features: [
        "Kitchen",
        "WiFi",
        "WashingMachine",
        "Pool",
        "Television",
        "Barbecue",
      ],
    },
    {
      id: 2,
      title: "Deluxe Suit Room",
      price: 599,
      description: "Spacious room with king bed, balcony & city view.",
      image: "/images/deluxekingroom.png",
      features: [
        "Kitchen",
        "WiFi",
        "WashingMachine",
        "Pool",
        "Television",
        "Barbecue",
      ],
    },
  ];

  const featureIcons: Record<string, string> = {
    Kitchen: "/icons/kitchen.png",
    WiFi: "/icons/wifi.png",
    WashingMachine: "/icons/washing machine.png",
    Pool: "/icons/pool.png",
    Television: "/icons/tv.png",
    Barbecue: "/icons/barbecue.png",
  };

  return (
    <section className="px-6 py-16 bg-white text-gray-800">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8 pt-10">
          <h2 className="text-xl font-semibold">Rooms & Suites</h2>
          <p className="text-gray-600 text-sm mt-2">Home / Rooms & Suites</p>
        </div>

        {rooms.map((room) => (
          <div
            key={room.id}
            className="flex flex-col sm:flex-row rounded-lg shadow-md bg-white border border-gray-200 overflow-hidden mb-8"
          >
            <div className="sm:w-1/3 p-4">
              <Image
                src={room.image}
                alt={room.title}
                width={500}
                height={400}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            <div className="sm:w-2/3 flex flex-col justify-between p-6 border-r border-gray-100">
              <div>
                <h3 className="text-lg font-semibold mb-1">{room.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{room.description}</p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-gray-700 text-sm">
                  {room.features.map((feature, index) => (
                    <span key={index} className="flex items-center gap-2">
                      <Image
                        src={featureIcons[feature] || "/icons/default.png"}
                        alt={feature}
                        width={10}
                        height={10}
                      />
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="sm:w-1/4 flex flex-col justify-center items-center p-6 text-center">
              <div>
                <span className="block text-xl font-bold text-gray-900">
                  ${room.price}
                </span>
                <span className="text-xs text-gray-500">PER NIGHT</span>
              </div>
              <Link href={`/rooms/${room.id}`}>
                <button
                  className="mt-4 border border-[#5A2A17] text-[#5A2A17] px-4 py-2 rounded-sm text-sm 
               hover:bg-[#f5ece8] transition duration-200 
               active:scale-95"
                >
                  View Details
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
