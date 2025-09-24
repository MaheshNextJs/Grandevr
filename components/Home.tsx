import Hero from "./HomePage/Hero";
import BookingForm from "./BookingForm";
import Amenities from "@/components/HomePage/Amenities";
import RoomsAndSuites from "./HomePage/RoomsAndSuites";
import DiningAndFacilities from "./DiningAndFacilities";
import SpecialOffers from "./HomePage/SpecialOffers";
import GuestTestimonials from "./HomePage/GuestTesimonials";

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
