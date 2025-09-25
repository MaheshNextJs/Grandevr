"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

/* ── Types & mock data ── */
type Booking = {
  id: string;
  hotel: string;
  checkin: string;
  checkout: string;
  room: string;
  guests: string;
  status: "Paid" | "Pending";
};

const UPCOMING: Booking[] = [
  {
    id: "xyz-1001",
    hotel: "xyz",
    checkin: "20–23 Sept 2025",
    checkout: "20–23 Sept 2025",
    room: "Executive Suite × 1",
    guests: "2 Adults, 1 Child",
    status: "Paid",
  },
  {
    id: "xyz-1002",
    hotel: "xyz",
    checkin: "20–23 Sept 2025",
    checkout: "20–23 Sept 2025",
    room: "Executive Suite × 1",
    guests: "2 Adults, 1 Child",
    status: "Paid",
  },
];

const PAST: Booking[] = [];

/* ── Bits ── */
function Breadcrumb() {
  return (
    <div className="text-xs text-gray-500">
      <Link href="/" className="hover:underline">
        Home
      </Link>{" "}
      / <span className="text-gray-700">My Dashboard</span>
    </div>
  );
}

function UserCard() {
  const router = useRouter();
  return (
    <aside className=" rounded-lg border border-gray-200 shadow-lg bg-white ">
      <div className="p-4 space-y-3 text-sm text-gray-700">
        <div className="flex items-center gap-2">
          <Image src="/icons/user2.png" alt="Phone" width={15} height={15} />
          <span>John Doe</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/mail.png" alt="Email" width={16} height={16} />
          <span>john.doe@email.com</span>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/icons/phone.png" alt="Phone" width={16} height={16} />
          <span>+91 123-456-7890</span>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard/edit-profile")}
          className="mt-2 flex mx-auto items-center gap-2 text-xs border border-gray-300 shadow-sm rounded-md px-3 py-2 text-white bg-[#A57865] hover:bg-[#7a3c23]"
        >
          <Image src="/icons/edit-04.png" alt="Edit" width={16} height={16} />
          Edit Profile
        </button>
      </div>
    </aside>
  );
}

function Downloads() {
  return (
    <div className="flex items-center gap-6 text-xs text-gray-600">
      {/* <div className="font-medium text-gray-800">Downloads</div> */}
      <Link
        href="#"
        className="inline-flex items-center gap-1 text-[#A57865] hover:text-[#A57865]"
      >
        <Image
          src="/icons/download-02.png"
          alt="Invoice"
          width={16}
          height={16}
        />
        Invoice PDF
      </Link>
      <Link
        href="/pre-check-in"
        className="inline-flex items-center gap-1 text-[#A57865] hover:text-[#A57865]"
      >
        <Image
          src="/icons/download-02.png"
          alt="Pre Check-in"
          width={16}
          height={16}
        />
        Pre Check-in Confirmation
      </Link>
    </div>
  );
}

function Tabs({
  value,
  onChange,
}: {
  value: "upcoming" | "past";
  onChange: (t: "upcoming" | "past") => void;
}) {
  return (
    <div className="flex items-center gap-2 text-xs">
      {(["upcoming", "past"] as const).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`px-3 py-1.5 rounded-md border ${
            value === t
              ? "bg-[#F8F4F3] text-[#A57865] border-gray-200 shadow-sm"
              : "text-gray-500 border-transparent hover:bg-gray-50"
          }`}
        >
          {t === "upcoming" ? "Upcoming" : "Past"}
        </button>
      ))}
    </div>
  );
}

function BookingCard({ b }: { b: Booking }) {
  return (
    <div className="border border-gray-200 rounded-lg bg-white shadow-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <div>
              <div className="text-[11px] text-gray-500">Reservation ID</div>
              <div className="text-gray-900">{b.id.split("-")[0]}</div>
            </div>
            <div className="text-right">
              <div className="text-[11px] text-gray-500">Hotel</div>
              <div className="text-gray-900">{b.hotel}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] text-gray-500">Check-in</div>
              <div className="text-gray-900">{b.checkin}</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-500">Check-out</div>
              <div className="text-gray-900">{b.checkout}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <div className="text-[11px] text-gray-500">Room</div>
              <div className="text-gray-900">{b.room}</div>
            </div>
            <div>
              <div className="text-[11px] text-gray-500">Guests</div>
              <div className="text-gray-900">{b.guests}</div>
            </div>
          </div>

          <div>
            <div className="text-[11px] text-gray-500">Payment Status</div>
            <div className="inline-flex items-center gap-1 text-green-600">
              <span className="text-[10px] font-medium">{b.status}</span>
              <Image src="/icons/paid.png" alt="Paid" width={12} height={12} />
            </div>
          </div>
        </div>

        {/* Buttons column */}
      </div>
      <div className="flex md:items-end md:justify-start p-5 pt-0">
        <div className="mt-4 md:mt-auto flex gap-3">
          <Link
            href={`/user/dashboard/bookings/${b.id}`}
            className="border border-gray-300 px-4 py-2 rounded-md text-[12px] text-[#A57865] hover:bg-[#F8F4F3]"
          >
            View Details
          </Link>
          <Link
            href="/pre-check-in"
            className="inline-flex items-center justify-center px-4 py-2 rounded-md text-[12px] bg-[#A57865] text-white hover:bg-[#7a3c23]"
          >
            Pre Check-in Now
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ── Page ── */
export default function DashboardPage() {
  const [tab, setTab] = useState<"upcoming" | "past">("upcoming");
  const list = tab === "upcoming" ? UPCOMING : PAST;

  return (
    <div className="max-w-6xl mx-auto px-6 py-25">
      <div className="flex items-center justify-between">
        <h1 className="text-xl md:text-2xl avenir font-semibold">Dashboard</h1>
      </div>

      <div className="mb-4">
        <div className="mb-2 avenir-base">
          <Breadcrumb />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <div className="ml-auto">
          <Downloads />
        </div>
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-6">
        <div className="lg:col-span-1">
          <UserCard />
        </div>

        <div className="lg:col-span-3">
          {/* Tabs */}
          <div className="flex items-center gap-3 mb-4">
            <Tabs value={tab} onChange={setTab} />
          </div>

          {/* Booking list */}
          <div className="space-y-4">
            {list.length === 0 ? (
              <div className="border border-gray-200 rounded-lg bg-white shadow-sm p-8 text-center text-sm text-gray-500">
                No {tab} reservations.
              </div>
            ) : (
              list.map((b) => <BookingCard key={b.id} b={b} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
