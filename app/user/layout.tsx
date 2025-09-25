import type { Metadata } from "next";
import Navbar from "@/components/user/Navbar";
import Footer from "@/components/user/Footer";

export const metadata: Metadata = {
  title: "Grandevr Travel",
  description: "AI powered travel planner",
};

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
