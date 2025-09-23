import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative h-[85vh] flex flex-col items-start justify-center px-6 font-sans text-white">
      <Image
        src="/images/banner.jpg"
        alt="Luxury Resort"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 max-w-2xl">
        <h2 className="text-3xl sm:text-5xl font-bold">
          Experience Luxury at <br />
          <span className="">Grandeur</span>
        </h2>
        <p className="mt-4 text-md text-gray-200">
          Your perfect stay awaits with comfort, elegance, and personalized
          service.
        </p>
        <button className="mt-6 px-6 py-3 bg-[#A57865] hover:bg-[#8C664F] rounded-md font-semibold text-sm">
          Book your stay
        </button>
      </div>
    </section>
  );
}
