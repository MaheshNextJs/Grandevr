// "use client";
// import { usePathname } from "next/navigation";
// import Link from "next/link"; // ✅ Import Link

// export default function Navbar() {
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   return (
//     <header
//       className={`top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 transition
//         ${isHome ? "absolute text-white" : "fixed bg-white text-gray-800"}`}
//     >
//       <h1 className="text-2xl font-bold font-nico">Grandeur</h1>

//       <nav className="space-x-8 hidden md:flex">
//         <Link href="/rooms" className="hover:text-gray-500">
//           Rooms
//         </Link>
//         <Link href="/dining" className="hover:text-gray-500">
//           Dining
//         </Link>
//         <Link href="/facilities" className="hover:text-gray-500">
//           Facilities
//         </Link>
//         <Link href="/contact" className="hover:text-gray-500">
//           Contact
//         </Link>
//         <button className="px-2 flex items-center space-x-2 hover:text-gray-500">
//           <span className="flex items-center justify-center h-6 w-6 text-sm rounded-full bg-white text-white">
//             👤
//           </span>
//           <span>Login</span>
//         </button>
//       </nav>
//     </header>
//   );
// }

// "use client";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   // Routes that should show the minimal nav (Contact only)
//   const minimalRoutes = [
//     "/guest-details",
//     "/booking/guestdetails",
//     "/payments",
//     "/confirmation",
//     "/pre-check-in",
//     "/digital-signature",
//   ];

//   const isMinimal = minimalRoutes.some(
//     (base) => pathname === base || pathname.startsWith(base + "/")
//   );

//   // Toggle Login <-> My Account
//   const [showAccount, setShowAccount] = useState(false);

//   return (
//     <header
//       className={`top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 transition
//         ${
//           isHome && !isMinimal
//             ? "absolute text-white"
//             : "fixed bg-white text-gray-800"
//         }`}
//     >
//       <h1 className="text-2xl font-bold font-nico">Grandeur</h1>

//       <nav className="space-x-8 hidden md:flex items-center">
//         {isMinimal ? (
//           <Link href="/contact" className="hover:text-gray-500">
//             Contact
//           </Link>
//         ) : (
//           <>
//             <Link href="/rooms" className="hover:text-gray-500">
//               Rooms
//             </Link>
//             <Link href="/dining" className="hover:text-gray-500">
//               Dining
//             </Link>
//             <Link href="/facilities" className="hover:text-gray-500">
//               Facilities
//             </Link>
//             <Link href="/contact" className="hover:text-gray-500">
//               Contact
//             </Link>

//             {/* Account toggle + hover dropdown */}
//             <div className="relative group">
//               <button
//                 onClick={() => setShowAccount((v) => !v)}
//                 aria-pressed={showAccount}
//                 aria-haspopup="menu"
//                 className="px-2 flex items-center space-x-2 hover:text-gray-500"
//               >
//                 <span className="flex items-center justify-center h-6 w-6 text-sm rounded-full bg-white text-white">
//                   👤
//                 </span>
//                 <span>{showAccount ? "My Account" : "Login"}</span>
//               </button>

//               {/* Dropdown appears on hover ONLY when label is My Account */}
//               {showAccount && (
//                 <div
//                   className={`
//                     absolute right-0 mt-2 w-44 rounded-md border bg-white text-gray-800 shadow-lg
//                     invisible opacity-0 translate-y-1
//                     group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
//                     group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
//                     transition
//                   `}
//                   role="menu"
//                 >
//                   <Link
//                     href="/dashboard"
//                     className="block px-4 py-2 text-sm hover:bg-gray-50"
//                     role="menuitem"
//                   >
//                     Dashboard
//                   </Link>
//                   <button
//                     className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-50"
//                     role="menuitem"
//                     onClick={() => {
//                       // TODO: hook your logout logic here
//                       console.log("logout");
//                     }}
//                   >
//                     Logout
//                   </button>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }

// "use client";
// import { usePathname } from "next/navigation";
// import Link from "next/link";
// import { useRef, useState } from "react";

// export default function Navbar() {
//   const pathname = usePathname();
//   const isHome = pathname === "/";

//   // Routes that should show the minimal nav (Contact only)
//   const minimalRoutes = [
//     "/guest-details",
//     "/booking/guestdetails",
//     "/payments",
//     "/confirmation",
//     "/pre-check-in",
//     "/digital-signature",
//   ];

//   const isMinimal = minimalRoutes.some(
//     (base) => pathname === base || pathname.startsWith(base + "/")
//   );

//   // Toggle Login <-> My Account
//   const [showAccount, setShowAccount] = useState(false);
//   const accountBtnRef = useRef<HTMLButtonElement>(null);

//   const handleLogout = () => {
//     // TODO: add your actual sign-out logic here
//     setShowAccount(false); // close dropdown + switch to Login
//     accountBtnRef.current?.blur(); // remove focus so it doesn't reopen
//   };

//   return (
//     <header
//       className={`top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 transition
//         ${
//           isHome && !isMinimal
//             ? "absolute text-white"
//             : "fixed bg-white text-gray-800"
//         }`}
//     >
//       {/* <h1 className="text-2xl font-bold font-nico">Grandeur</h1> */}
//       <Link
//         href="/"
//         aria-label="Go to homepage"
//         className="text-2xl font-bold font-nico"
//       >
//         Grandeur
//       </Link>

//       <nav className="space-x-8 hidden md:flex items-center">
//         {isMinimal ? (
//           <Link href="/contact" className="hover:text-gray-500">
//             Contact
//           </Link>
//         ) : (
//           <>
//             <Link href="/rooms" className="hover:text-gray-500">
//               Rooms
//             </Link>
//             <Link href="/dining" className="hover:text-gray-500">
//               Dining
//             </Link>
//             <Link href="/facilities" className="hover:text-gray-500">
//               Facilities
//             </Link>
//             <Link href="/contact" className="hover:text-gray-500">
//               Contact
//             </Link>

//             {/* Account toggle + hover dropdown */}
//             <div className="relative group">
//               <button
//                 ref={accountBtnRef}
//                 onClick={() => setShowAccount((v) => !v)}
//                 aria-pressed={showAccount}
//                 aria-haspopup="menu"
//                 className="px-2 flex items-center space-x-2 hover:text-gray-500"
//               >
//                 <span className="flex items-center justify-center h-6 w-6 text-sm rounded-full bg-white text-white">
//                   👤
//                 </span>
//                 <span>{showAccount ? "My Account" : "Login"}</span>
//               </button>

//               {showAccount && (
//                 <div
//                   className={`
//       absolute right-0 mt-2 w-44 rounded-md overflow-hidden
//       bg-white text-gray-800 shadow-lg ring-1 ring-black/5
//       invisible opacity-0 translate-y-1
//       group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
//       group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
//       transition
//     `}
//                   role="menu"
//                 >
//                   <div className="divide-y divide-gray-100">
//                     <Link
//                       href="/dashboard"
//                       className="block px-4 py-2 text-sm hover:bg-gray-50"
//                       role="menuitem"
//                     >
//                       Dashboard
//                     </Link>
//                     <button
//                       className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-50"
//                       role="menuitem"
//                       onClick={handleLogout}
//                     >
//                       Logout
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </>
//         )}
//       </nav>
//     </header>
//   );
// }
"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useRef, useState } from "react";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  // Routes that should show the minimal nav (Contact only)
  const minimalRoutes = [
    "/guest-details",
    "/booking/guestdetails",
    "/payments",
    "/confirmation",
    "/pre-check-in",
    "/digital-signature",
  ];

  const isMinimal = minimalRoutes.some(
    (base) => pathname === base || pathname.startsWith(base + "/")
  );

  // Toggle Login <-> My Account
  const [showAccount, setShowAccount] = useState(false);
  const accountBtnRef = useRef<HTMLButtonElement>(null);

  const handleLogout = () => {
    // TODO: add your actual sign-out logic here
    setShowAccount(false); // close dropdown + switch to Login
    accountBtnRef.current?.blur(); // remove focus so it doesn't reopen
  };

  return (
    <header
      className={`top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6 transition
        ${
          isHome && !isMinimal
            ? "absolute text-white"
            : "fixed bg-white text-gray-800"
        }`}
      // 👇 Avenir font stack applied to the whole navbar
      style={{
        fontFamily:
          '"Avenir Next", Avenir, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      <Link
        href="/"
        aria-label="Go to homepage"
        className="text-2xl font-bold font-nico"
      >
        Grandeur
      </Link>

      <nav className="space-x-8 hidden md:flex items-center">
        {isMinimal ? (
          <Link href="/contact" className="hover:text-gray-500">
            Contact
          </Link>
        ) : (
          <>
            <Link href="/user/rooms" className="hover:text-gray-500">
              Rooms
            </Link>
            <Link href="/dining" className="hover:text-gray-500">
              Dining
            </Link>
            <Link href="/facilities" className="hover:text-gray-500">
              Facilities
            </Link>
            <Link href="/contact" className="hover:text-gray-500">
              Contact
            </Link>

            {/* Account toggle + hover dropdown */}
            <div className="relative group">
              <button
                ref={accountBtnRef}
                onClick={() => setShowAccount((v) => !v)}
                aria-pressed={showAccount}
                aria-haspopup="menu"
                className="px-2 flex items-center space-x-2 hover:text-gray-500"
              >
                <span className="flex items-center justify-center h-6 w-6 text-sm rounded-full bg-white text-white">
                  👤
                </span>
                <span>{showAccount ? "My Account" : "Login"}</span>
              </button>

              {showAccount && (
                <div
                  className={`
                    absolute right-0 mt-2 w-44 rounded-md overflow-hidden
                    bg-white text-gray-800 shadow-lg ring-1 ring-black/5
                    invisible opacity-0 translate-y-1
                    group-hover:visible group-hover:opacity-100 group-hover:translate-y-0
                    group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-0
                    transition
                  `}
                  role="menu"
                >
                  <div className="divide-y divide-gray-100">
                    <Link
                      href="/user/dashboard"
                      className="block px-4 py-2 text-sm hover:bg-gray-50"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm hover:bg-gray-50"
                      role="menuitem"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </nav>
    </header>
  );
}
