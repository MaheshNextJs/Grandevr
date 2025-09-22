import Image from "next/image";
import Hero from "./Hero";
import BookingForm from "./BookingForm";
import Amenities from "@/components/Amenities";
import RoomsAndSuites from "./RoomsAndSuites";
import DiningAndFacilities from "./DiningAndFacilities";
import SpecialOffers from "./SpecialOffers";
import GuestTestimonials from "./GuestTesimonials";

export default function Home() {
  return (
    <div className="relative min-h-screen font-sans fancy-heading">
      <div className="text-white">
        <Hero />
        <BookingForm />
      </div>
      <Amenities />
      <RoomsAndSuites />
      <DiningAndFacilities />
      <SpecialOffers />
      <GuestTestimonials />
    </div>
  );
}
