"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FormEvent } from "react";

function IconInput({
  type,
  placeholder,
  iconSrc,
  name,
}: {
  type: string;
  placeholder: string;
  iconSrc: string;
  name: string;
}) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
        <Image src={iconSrc} alt="" width={18} height={18} />
      </span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="h-11 w-full rounded-full border border-gray-200 bg-white pl-10 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-gray-300 focus:ring-2 focus:ring-gray-100"
      />
    </div>
  );
}

export default function Page() {
  const router = useRouter();

  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    router.push("/staff/dashboard/sidescreens/dashboard");
  };

  return (
    <div className="grid h-screen grid-cols-1 md:grid-cols-[40%_60%]">
      {/* Left: Image */}
      {/* <div className="relative h-full w-full">
        <Image
          src="/icons/staff/bg.png"
          alt="Staff login background"
          fill
          className="pr-10"
          priority
        />
      </div> */}
      <div className="relative h-full w-full overflow-hidden">
        {/* Background Image */}
        <Image
          src="/icons/staff/bg.png"
          alt="Staff login background"
          fill
          className="object-cover"
          priority
        />

        {/* Decorative Arcs (bottom-left only) */}
        <svg
          className="absolute -bottom-[500px]  -left-[500px] w-[1100px] h-[1100px] pointer-events-none"
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="450" cy="450" r="200" stroke="white" strokeWidth="1.2" />
        </svg>
        <svg
          className="absolute -bottom-[550px]  -left-[450px] w-[1100px] h-[1100px] pointer-events-none"
          viewBox="0 0 900 900"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="450" cy="450" r="200" stroke="white" strokeWidth="1.2" />
        </svg>
      </div>

      {/* Right: Form */}
      <div className="flex h-full items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="mb-8">
            <h1 className="text-2xl font-semibold text-gray-900">
              Hello Again!
            </h1>
            <p className="mt-1 text-sm text-gray-500">Welcome Back</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <IconInput
              type="email"
              name="email"
              placeholder="Email Address"
              iconSrc="/icons/staff/mail.png"
            />
            <IconInput
              type="password"
              name="password"
              placeholder="Password"
              iconSrc="/icons/staff/p-lock.png"
            />

            <button
              type="submit"
              className="h-11 w-full rounded-full bg-[#A57865] text-sm font-medium text-white transition hover:opacity-95 active:opacity-90"
            >
              Login
            </button>

            <div className="text-center">
              <Link
                href="/staff/forgot-password"
                className="text-xs text-[#A57865] underline underline-offset-4 hover:opacity-90"
              >
                Forgot Password?
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
