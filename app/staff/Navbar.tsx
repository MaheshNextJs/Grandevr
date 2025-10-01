"use client";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";

export default function StaffNavbar() {
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  // inside StaffNavbar()
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(e.target as Node)
      ) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  return (
    <header className="grid [grid-template-columns:var(--admin-sidebar)_1fr] z-10">
      {/* LEFT: brand */}
      <div className="h-16 bg-white flex items-center gap-3 pl-4">
        <Link href="/staff/dashboard" className="text-2xl font-bold font-nico">
          Grandeur
        </Link>
      </div>

      {/* RIGHT: actions */}
      <div className="h-16 bg-white flex items-center gap-6 pr-4 border-b border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
        {/* hamburger + search */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            aria-label="Toggle sidebar"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md text-gray-600 hover:text-black hover:bg-neutral-100"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="relative w-full max-w-md">
            <input
              type="text"
              placeholder="Search something ..."
              className="w-full pl-10 pr-3 py-1.5 text-sm rounded-lg border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Image
              src="/icons/search.png"
              alt="Search"
              width={15}
              height={15}
              className="absolute left-3 top-2.5"
            />
          </div>
        </div>

        {/* right-side icons */}
        <div className="flex items-center gap-6">
          <div className="relative">
            <Image
              src="/icons/bell.png"
              alt="Notifications"
              width={15}
              height={15}
            />
            <span className="absolute -top-3 -right-3 text-[10px] bg-[#A57865] text-white rounded-full px-1">
              2
            </span>
          </div>

          {/* PROFILE + DROPDOWN */}
          <div
            ref={profileRef}
            className="relative"
            onMouseEnter={() => setProfileOpen(true)}
            // onMouseLeave={() => setProfileOpen(false)}
          >
            <button
              className="flex items-center gap-2 focus:outline-none"
              onFocus={() => setProfileOpen(true)}
              onBlur={(e) => {
                // close only if focus moves outside this container
                if (!profileRef.current?.contains(e.relatedTarget as Node)) {
                  setProfileOpen(false);
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape") setProfileOpen(false);
              }}
            >
              <Image
                src="/images/user1.png"
                alt="Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
              <div className="text-sm leading-tight text-left">
                <div className="text-[12px] font-bold text-gray-900">
                  Jay Hargudson
                </div>
                <div className="text-gray-500 text-xs">Admin</div>
              </div>
              <Image
                src="/icons/userdrop.png"
                alt="Menu"
                width={15}
                height={15}
              />
            </button>

            {profileOpen && (
              <div
                className="absolute right-0 mt-2 w-44 rounded-md border border-gray-200 bg-white shadow-lg z-50"
                role="menu"
                tabIndex={-1}
              >
                {/* small caret/arrow */}
                <div className="absolute -top-1 right-6 h-2 w-2 rotate-45 bg-white border border-gray-200 border-b-0 border-r-0" />

                <Link
                  href="/staff/dashboard/sidescreens/myaccount"
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={0}
                >
                  <Image
                    src="/icons/staff/myaccount.png" /* ← replace with your icon path */
                    alt="My Account"
                    width={16}
                    height={16}
                  />
                  My Account
                </Link>

                <button
                  onClick={() => {
                    setProfileOpen(false); // close the menu
                    // TODO: clear auth tokens/cookies here if you use them
                    window.alert("Logged out"); // simple popup
                    router.push("/staff/login"); // go to login
                  }}
                  className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  role="menuitem"
                  tabIndex={0}
                >
                  <Image
                    src="/icons/staff/logout.png"
                    alt="Logout"
                    width={16}
                    height={16}
                  />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
