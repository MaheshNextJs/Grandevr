"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Item = {
  label: string;
  href: string;
  icon: string;
  iconActive?: string;
};

const items: Item[] = [
  {
    label: "Dashboard",
    href: "/admin/dashboard/sidescreens/dashboard",
    icon: "/icons/admin/dash.png",
    iconActive: "/icons/admin/dash-2.png",
  },
  {
    label: "Reservations",
    href: "/admin/dashboard/sidescreens/reservations",
    icon: "/icons/admin/reser.png",
    iconActive: "/icons/admin/reser-2.png",
  },
  {
    label: "Pre-Check-In",
    href: "/admin/dashboard/sidescreens/pre-check-in",
    icon: "/icons/admin/precheckin.png",
    iconActive: "/icons/admin/pre-check-in2.png",
  },
  {
    label: "Room Assignment",
    href: "/admin/dashboard/sidescreens/room-assignment",
    icon: "/icons/admin/ra.png",
  },
  {
    label: "Staff Management",
    href: "/admin/dashboard/sidescreens/staff-management",
    icon: "/icons/admin/staff.png",
  },
  {
    label: "Reputation",
    href: "/admin/dashboard/sidescreens/reputation",
    icon: "/icons/admin/reputation.png",
  },
  {
    label: "Insights",
    href: "/admin/dashboard/sidescreens/insights",
    icon: "/icons/admin/insights.png",
  },
  {
    label: "Reports & Analytics",
    href: "/admin/dashboard/sidescreens/reports-analytics",
    icon: "/icons/admin/report.png",
  },
  {
    label: "Settings",
    href: "/admin/dashboard/sidescreens/settings",
    icon: "/icons/admin/settings.png",
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="[width:var(--admin-sidebar)] shrink-0 border-r border-gray-200 bg-white z-10 shadow-right">
      <nav className="pl-4 pr-2 py-3 space-y-1">
        {items.map((it) => {
          const active =
            pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link
              key={it.href}
              href={it.href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition
                ${
                  active
                    ? "bg-rose-50 text-[#A57865] font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
            >
              <Image
                src={active && it.iconActive ? it.iconActive : it.icon}
                alt={it.label}
                width={18}
                height={18}
                className={active ? "" : "opacity-75"}
              />

              <span className="truncate">{it.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
