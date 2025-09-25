"use client";

import { useState } from "react";
import Image from "next/image";

export default function Amenities() {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);

  const amenities = [
    {
      greenicon: "/images/amenities3.png",
      whiteicon: "/images/amenities2.png",
      alt: "Amenities Icon",
      title: "Luxurious Rooms & Suites",
      description:
        "Spacious, elegant rooms with ocean views, premium amenities, and thoughtful touches.",
    },
    {
      greenicon: "/images/amenities3.png",
      whiteicon: "/images/amenities2.png",
      alt: "Amenities Icon",
      title: "Fine Dining & Bar",
      description:
        "World-class dining experiences with signature flavors, cocktails, and exceptional service.",
    },
    {
      greenicon: "/images/amenities3.png",
      whiteicon: "/images/amenities2.png",
      alt: "Amenities Icon",
      title: "Wine Selection",
      description:
        "Exquisite wines curated from across the world for the perfect dining experience.",
    },
    {
      greenicon: "/images/amenities3.png",
      whiteicon: "/images/amenities2.png",
      alt: "Amenities Icon",
      title: "Prime Location",
      description:
        "Conveniently located near top attractions, shopping, and cultural hotspots.",
    },
  ];

  return (
    <section className="relative bg-white text-gray-800 mt-[50px] px-6 py-12">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Why Stay at{" "}
          <span className="text-[#A57865]">Grand Haven Resort?</span>
        </h2>
        <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
          Your perfect stay awaits with comfort, elegance, and personalized
          service.
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {amenities.map((amenity, index) => {
            const isActive = index === activeCardIndex;
            return (
              <div
                key={index}
                onClick={() => setActiveCardIndex(index)}
                className={`p-6 rounded-xl text-center cursor-pointer transition-all duration-300 ${
                  isActive
                    ? "bg-[#A57865] text-white shadow-lg"
                    : "bg-white border border-[#EEEEEE] text-gray-800 shadow hover:shadow-lg"
                }`}
              >
                <div className="mb-4 flex justify-center">
                  <Image
                    src={isActive ? amenity.whiteicon : amenity.greenicon}
                    alt={amenity.alt}
                    width={30}
                    height={30}
                  />
                </div>
                <h3 className="font-semibold mb-2">{amenity.title}</h3>
                <p className="text-sm">{amenity.description}</p>
              </div>
            );
          })}
        </div>

        <button className="mt-12 px-6 py-3 bg-[#A57865] hover:bg-[#A57865] text-white rounded-md font-semibold transition-colors duration-300">
          Explore Our Amenities
        </button>
      </div>
    </section>
  );
}
