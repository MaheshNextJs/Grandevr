"use client";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <header
      className={`top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 transition
        ${isHome ? "absolute text-white" : "fixed bg-white text-gray-800"}`}
    >
      <h1 className="text-2xl font-bold font-nico">Grandeur</h1>

      <nav className="space-x-8 hidden md:flex">
        <a href="/rooms" className="hover:text-gray-500">
          Rooms
        </a>
        <a href="/dining" className="hover:text-gray-500">
          Dining
        </a>
        <a href="/facilities" className="hover:text-gray-500">
          Facilities
        </a>
        <a href="/contact" className="hover:text-gray-500">
          Contact
        </a>
        <button className="px-2 flex items-center space-x-2 hover:text-gray-500">
          <span className="flex items-center justify-center h-6 w-6 text-sm rounded-full bg-white text-white">
            👤
          </span>
          <span>Login</span>
        </button>
      </nav>
    </header>
  );
}
