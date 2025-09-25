"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [name, setName] = useState("Jhon");
  const [email, setEmail] = useState("Jhon123@gmail.com");
  const [code, setCode] = useState("+91");
  const [phone, setPhone] = useState("121232345656");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: save profile (API call)
    alert("Profile saved!");
    router.push("/user/dashboard");
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-25">
      {/* Title */}
      <h1 className="text-xl md:text-2xl font-semibold mb-2">My Profile</h1>

      {/* Breadcrumb */}
      <div className="text-xs text-gray-500 mb-6">
        <Link href="/" className="hover:underline">
          Home
        </Link>{" "}
        /
        <Link href="/user/dashboard" className="hover:underline ml-1">
          {" "}
          My Dashboard
        </Link>{" "}
        /<span className="text-gray-700 ml-1"> My Profile</span>
      </div>

      {/* Card */}
      {/* LEFT-ALIGNED, 60% WIDTH (100% on small screens) */}
      <div className="w-full lg:w-[70%] mr-auto">
        <div className="rounded-lg  bg-white ">
          <div className="">
            <h2 className="text-lg font-semibold mb-6">Profile Details</h2>

            <form onSubmit={onSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full border border-gray-200 shadow-sm rounded-md px-3 py-3 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                  className="w-full border border-gray-200 shadow-sm rounded-md px-3 py-3 text-sm"
                />
              </div>

              {/* Phone */}
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2">
                  Phone Number
                </label>

                {/* Combined input group */}
                <div className="flex items-center rounded-md border border-gray-200 shadow-sm focus-within:ring-1 focus-within:ring-[#A57865] bg-white">
                  {/* Country code (selector) */}
                  <select
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="appearance-none bg-transparent px-3 py-3 text-sm outline-none border-0 rounded-l-md"
                    aria-label="Country code"
                  >
                    <option value="+91">+91</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>

                  {/* Vertical divider that doesn't touch edges */}
                  <span className="mx-1 my-2 h-6 w-px bg-gray-300" />

                  {/* Phone number */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="flex-1 px-3 py-3 text-sm outline-none border-0  rounded-r-md"
                    aria-label="Phone number"
                  />
                </div>
              </div>

              {/* Save */}
              <button
                type="submit"
                className="w-full bg-[#A57865] text-white py-3 rounded-md text-sm hover:bg-[#7a3c23] transition"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
