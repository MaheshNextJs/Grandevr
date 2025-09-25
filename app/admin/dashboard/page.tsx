// app/admin/dashboard/page.tsx
import { redirect } from "next/navigation";

export default function AdminDashboardIndex() {
  redirect("/admin/dashboard/sidescreens/dashboard");
}
