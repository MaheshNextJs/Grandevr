// "use client";
// import Link from "next/link";
// import Image from "next/image";
// import { useState } from "react";

// export default function AdminNavbar() {
//   const [open, setOpen] = useState(false);

//   return (
//     <header
//       className="h-16 bg-white border-b border-gray-200
//   grid [grid-template-columns:var(--admin-sidebar)_1fr] items-center
//   z-10 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
//     >
//       {/* left column (exactly var(--admin-sidebar) wide) */}
//       <div className="flex items-center gap-3 pl-4">
//         <Link href="/admin/dashboard" className="text-2xl font-bold font-nico">
//           Grandeur
//         </Link>
//         <button
//           onClick={() => setOpen(!open)}
//           className="text-gray-500 hover:text-black"
//         >
//           <svg
//             className="h-5 w-5"
//             fill="none"
//             stroke="currentColor"
//             strokeWidth="2"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M4 6h16M4 12h16M4 18h16"
//             />
//           </svg>
//         </button>
//       </div>

//       {/* right column (rest of the width) */}
//       <div className="flex items-center justify-between gap-6 pr-4">
//         <div className="relative w-full max-w-lg">
//           <input
//             type="text"
//             placeholder="Search something ..."
//             className="w-full pl-10 pr-3 py-1.5 text-sm rounded-lg border border-neutral-200 bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <Image
//             src="/icons/search.png"
//             alt="Search"
//             width={15}
//             height={15}
//             className="absolute left-3 top-2.5"
//           />
//         </div>

//         <div className="flex items-center gap-6">
//           <div className="relative">
//             <Image
//               src="/icons/bell.png"
//               alt="Notifications"
//               width={15}
//               height={15}
//             />
//             <span className="absolute -top-3 -right-3 text-[10px] bg-[#A57865] text-white rounded-full px-1">
//               2
//             </span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Image
//               src="/images/user1.png"
//               alt="Avatar"
//               width={32}
//               height={32}
//               className="rounded-full"
//             />
//             <div className="text-sm leading-tight">
//               <div className="text-[12px] font-bold">Jay Hargudson</div>
//               <div className="text-gray-500 text-xs">Admin</div>
//             </div>
//             <Image
//               src="/icons/userdrop.png"
//               alt="Menu"
//               width={15}
//               height={15}
//             />
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function AdminNavbar() {
  const [open, setOpen] = useState(false);

  return (
    // NO border/shadow on the full header
    <header className="grid [grid-template-columns:var(--admin-sidebar)_1fr] z-10">
      {/* LEFT: brand (same width as sidebar), no bottom line */}
      <div className="h-16 bg-white flex items-center gap-3 pl-4">
        <Link href="/admin/dashboard" className="text-2xl font-bold font-nico">
          Grandeur
        </Link>
      </div>

      {/* RIGHT: put the bottom border + shadow only here */}
      {/* RIGHT: border + shadow apply only on content column */}
      <div
        className="h-16 bg-white flex items-center gap-6 pr-4
                border-b border-gray-200 shadow-[0_2px_8px_rgba(0,0,0,0.06)]"
      >
        {/* Group: hamburger + search (left side of right column) */}
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <button
            aria-label="Toggle sidebar"
            onClick={() => setOpen(!open)}
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
            {" "}
            {/* tighter than max-w-lg */}
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

        {/* Actions (right side) */}
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

          <div className="flex items-center gap-2">
            <Image
              src="/images/user1.png"
              alt="Avatar"
              width={32}
              height={32}
              className="rounded-full"
            />
            <div className="text-sm leading-tight">
              <div className="text-[12px] font-bold">Jay Hargudson</div>
              <div className="text-gray-500 text-xs">Admin</div>
            </div>
            <Image
              src="/icons/userdrop.png"
              alt="Menu"
              width={15}
              height={15}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
