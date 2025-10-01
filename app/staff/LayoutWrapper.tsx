"use client";

import { usePathname } from "next/navigation";
import StaffNavbar from "./Navbar";
import StaffFooter from "./Footer";
import StaffSidebar from "./dashboard/Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isLoginPage = pathname === "/staff/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-neutral-50">
      <StaffNavbar />

      <div className="grid [grid-template-columns:var(--admin-sidebar)_1fr] min-h-0">
        <StaffSidebar />
        <main className="p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <StaffFooter />
    </div>
  );
}
