// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="bg-[#A57865] text-white py-12 px-6">
//       <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="flex flex-col items-start justify-start">
//           <h3 className="text-2xl font-bold mb-4 text-left font-nico m-0">
//             Grandeur
//           </h3>
//           <p className="text-sm text-gray-200">
//             Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
//             eiusmod tempor incididunt ut labore et dolore magna aliqua.
//           </p>
//         </div>

//         <div>
//           <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
//           <ul className="space-y-2 text-gray-200">
//             <li className="text-sm">Rooms & Suites</li>
//             <li className="text-sm">Dining</li>
//             <li className="text-sm">Facilities</li>
//             <li className="text-sm">Offers & Packages</li>
//             <li className="text-sm">Events & Weddings</li>
//             <li className="text-sm">Contact Us</li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-lg font-semibold mb-4">CONTACT INFO</h4>
//           <div className="space-y-2 text-gray-200">
//             <p className="text-sm">Phone: 1234567890</p>
//             <p className="text-sm">Email: company@email.com</p>
//             <p className="text-sm">Location: 100 Smart Street, LA, USA</p>
//             <div className="flex space-x-4 mt-4">
//               <a href="#" aria-label="Facebook">
//                 <Image
//                   src="/images/fb.png"
//                   alt="Facebook"
//                   width={24}
//                   height={24}
//                 />
//               </a>
//               <a href="#" aria-label="Twitter">
//                 <Image
//                   src="/images/twitter.png"
//                   alt="Twitter"
//                   width={24}
//                   height={24}
//                 />
//               </a>
//               <a href="#" aria-label="Instagram">
//                 <Image
//                   src="/images/insta.png"
//                   alt="Instagram"
//                   width={24}
//                   height={24}
//                 />
//               </a>
//               <a href="#" aria-label="LinkedIn">
//                 <Image
//                   src="/images/linkedin.png"
//                   alt="LinkedIn"
//                   width={24}
//                   height={24}
//                 />
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-8 pt-6 border-t border-white">
//         <div className="max-w-6xl mx-auto flex justify-between">
//           <p className="text-sm">
//             © 2022 thecreation.design | All rights reserved
//           </p>
//           <p className="text-sm">Created with love by thecreation.design</p>
//         </div>
//       </div>
//     </footer>
//   );
// }
"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Footer() {
  const pathname = usePathname();

  // Show the simplified "booking" footer on these routes
  const minimalPrefixes = [
    "/guest-details",
    "/booking/guestdetails",
    "/payment",
    "/payments",
    "/confirmation",
    "/dashboard",
    "/pre-check-in",
    "/digital-signature",
  ];

  const isMinimal =
    pathname.startsWith("/booking") ||
    minimalPrefixes.some((p) => pathname === p || pathname.startsWith(p + "/"));

  if (isMinimal) {
    // ---- Booking footer (matches your screenshot) ----
    return (
      <footer className="bg-[#A57865] text-white">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-sm font-semibold mb-2">CONTACT INFO</div>
          <div className="text-sm opacity-90">
            Need help? Call +91 123-456-7890&nbsp; | &nbsp;stay@hotel.com
          </div>
        </div>

        <div className="border-t border-white/60" />

        <div className="max-w-6xl mx-auto px-6 py-6 text-xs flex items-center justify-between">
          <div>© 2022 thecreation.design | All rights reserved</div>
          <a href="/privacy" className="hover:underline">
            Privacy Policy
          </a>
        </div>
      </footer>
    );
  }

  // ---- Default/marketing footer (your existing one) ----
  return (
    <footer className="bg-[#A57865] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex flex-col items-start justify-start">
          <h3 className="text-2xl font-bold mb-4 text-left font-nico m-0">
            Grandeur
          </h3>
          <p className="text-sm text-gray-200">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-200">
            <li className="text-sm">Rooms &amp; Suites</li>
            <li className="text-sm">Dining</li>
            <li className="text-sm">Facilities</li>
            <li className="text-sm">Offers &amp; Packages</li>
            <li className="text-sm">Events &amp; Weddings</li>
            <li className="text-sm">Contact Us</li>
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-semibold mb-4">CONTACT INFO</h4>
          <div className="space-y-2 text-gray-200">
            <p className="text-sm">Phone: 1234567890</p>
            <p className="text-sm">Email: company@email.com</p>
            <p className="text-sm">Location: 100 Smart Street, LA, USA</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Facebook">
                <Image
                  src="/images/fb.png"
                  alt="Facebook"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#" aria-label="Twitter">
                <Image
                  src="/images/twitter.png"
                  alt="Twitter"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#" aria-label="Instagram">
                <Image
                  src="/images/insta.png"
                  alt="Instagram"
                  width={24}
                  height={24}
                />
              </a>
              <a href="#" aria-label="LinkedIn">
                <Image
                  src="/images/linkedin.png"
                  alt="LinkedIn"
                  width={24}
                  height={24}
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-white">
        <div className="max-w-6xl mx-auto flex justify-between">
          <p className="text-sm">
            © 2022 thecreation.design | All rights reserved
          </p>
          <p className="text-sm">Created with love by thecreation.design</p>
        </div>
      </div>
    </footer>
  );
}
