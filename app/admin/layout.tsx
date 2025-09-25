import AdminNavbar from "./Navbar";
import AdminFooter from "./Footer";
import AdminSidebar from "./dashboard/Sidebar";

export const metadata = { title: "Admin • Grandeur" };

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid grid-rows-[auto_1fr_auto] bg-neutral-50">
      <AdminNavbar />

      {/* grid columns use the same sidebar width as the header */}
      <div className="grid [grid-template-columns:var(--admin-sidebar)_1fr] min-h-0">
        <AdminSidebar />
        <main className="p-6 overflow-auto">
          {/* optional: constrain content width for nicer gutters */}
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      <AdminFooter />
    </div>
  );
}
