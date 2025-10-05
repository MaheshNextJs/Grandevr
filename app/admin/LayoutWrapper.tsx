"use client";

import { usePathname } from "next/navigation";
import AdminNavbar from "./Navbar";
import AdminSidebar from "./dashboard/Sidebar";

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Define routes that don't need shell (navbar/sidebar)
  const bareRoutes = ["/admin/login"];
  const isBare = bareRoutes.includes(pathname);

  if (isBare) return <>{children}</>;

  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr] bg-neutral-50">
      <AdminNavbar />

      <div
        style={{ ["--admin-sidebar" as any]: "240px" }}
        className="grid min-h-0 [grid-template-columns:var(--admin-sidebar)_1fr]"
      >
        <AdminSidebar />

        {/* ✅ This is the main content area — previously commented out */}
        <main className="p-6 overflow-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
