"use client";

import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function BookingDetailPage() {
  // read [id] from the URL in a client component
  const { id } = useParams<{ id: string }>();
  const reservationId = (id ?? "xyz").toString().split("-")[0];

  return (
    <div className="max-w-6xl mx-auto px-6 py-25">
      <div>
        <h1 className="text-xl md:text-2xl font-semibold">
          Reservation Details
        </h1>
      </div>

      {/* Title + Downloads (right) */}
      <div className="flex items-center justify-between">
        <div className="ml-auto flex items-center gap-6 text-xs text-gray-600">
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
            Pre-Check-in Confirmation
          </Link>
        </div>
      </div>

      {/* Details card */}
      <div className="mt-5 border border-gray-200 rounded-lg bg-white shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-5">
          {/* Col 1 */}
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[11px] text-gray-500">Reservation ID</div>
              <div className="text-gray-900">{reservationId}</div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Check-out</div>
              <div className="text-gray-900">20–23 Sept 2025</div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Guests</div>
              <div className="text-gray-900">2 Adults, 1 Child</div>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[11px] text-gray-500">Check-in</div>
              <div className="text-gray-900">20–23 Sept 2025</div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Add-Ons</div>
              <div className="text-gray-900">Breakfast, Airport Pickup</div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Payment</div>
              <div className="inline-flex items-center gap-1 text-green-600">
                <span className="text-sm font-medium">Paid ($820)</span>
                <Image
                  src="/icons/paid.png"
                  alt="Paid"
                  width={12}
                  height={12}
                />
              </div>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-4 text-sm">
            <div>
              <div className="text-[11px] text-gray-500">Check-out</div>
              <div className="text-gray-900">20–23 Sept 2025</div>
            </div>

            <div>
              <div className="text-[11px] text-gray-500">Room</div>
              <div className="text-gray-900">Executive Suite × 1</div>
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex gap-3">
        <Link
          href="/dashboard/reciepts"
          className="border border-gray-300 px-4 py-2 rounded-md text-[12px] text-[#A57865] hover:bg-[#F8F4F3]"
        >
          Modify Booking
        </Link>

        <button className="border border-gray-300 px-4 py-2 rounded-md text-[12px] text-[#A57865] hover:bg-[#F8F4F3]">
          Cancel Booking
        </button>

        <Link
          href="/pre-check-in"
          className="inline-flex items-center justify-center px-4 py-2 rounded-md text-[12px] bg-[#A57865] text-white hover:bg-[#7a3c23]"
        >
          Start Pre-Check-in
        </Link>
      </div>
    </div>
  );
}
