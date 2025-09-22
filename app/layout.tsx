// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "../styles/globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Grandevr Travel",
  description: "AI powered travel planner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {/* Navbar appears on all pages */}
        <Navbar />

        <main>{children}</main>

        {/* Footer appears on all pages */}
        <Footer />
      </body>
    </html>
  );
}
