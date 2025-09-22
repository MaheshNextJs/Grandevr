"use client";
import Image from "next/image";

export default function GuestTestimonials() {
  return (
    <section className="relative bg-white text-gray-800 px-6 py-16">
      <div className="max-w-6xl pb-10 mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-bold">What Our Guests Say</h2>
        <p className="mt-4 text-gray-600 max-w-2xl pb-10 mx-auto text-sm">
          Trusted by thousands of happy guests worldwide.
        </p>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="border border-[#EEEEEE] rounded-md shadow hover:shadow-lg transition relative"
            >
              <div className="pt-16 px-6">
                <div className="absolute -top-6 left-6 bg-[#A57865] rounded-full w-12 h-12 flex items-center justify-center shadow">
                  <Image
                    src="/images/quote.png"
                    alt="Quote"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="flex gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5 text-yellow-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.174 9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-700 text-sm mb-4">
                  &quot;The hotel exceeded our expectations! The staff were
                  warm, the rooms spotless, and the ocean view was
                  breathtaking.&quot;
                </p>
              </div>

              <div className="flex items-center gap-3 border-t border-gray-200 pt-4 p-6">
                {" "}
                <Image
                  src="/images/user1.png"
                  alt="Serhiy Hipskyy"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div className="text-left">
                  <div className="font-semibold text-sm">Serhiy Hipskyy</div>
                  <div className="text-xs text-gray-500">CEO Universal</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
