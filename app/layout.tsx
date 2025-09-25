import "../styles/globals.css";
import {
  Geist as GeistSans,
  Geist_Mono as GeistMono,
  Inter,
} from "next/font/google";

const geistSans = GeistSans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = GeistMono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "Grandeur App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
