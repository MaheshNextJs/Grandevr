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
    href: "/staff/dashboard/sidescreens/dashboard",
    icon: "/icons/admin/dash.png",
    iconActive: "/icons/admin/dash-2.png",
  },
  {
    label: "My Task",
    href: "/staff/dashboard/sidescreens/mytask",
    icon: "/icons/staff/mytask.png",
    iconActive: "/icons/staff/mytask2.png",
  },
  {
    label: "My Schedule",
    href: "/staff/dashboard/sidescreens/myschedule",
    icon: "/icons/staff/myschedule.png",
    iconActive: "/icons/staff/myschedule2.png",
  },
];

export default function StaffSidebar() {
  const pathname = usePathname();

  return (
    <aside className="[width:var(--admin-sidebar)] shrink-0 border-r border-gray-200 bg-white z-10 shadow-right">
      <nav className="pl-4 pr-2 py-3 space-y-2">
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
