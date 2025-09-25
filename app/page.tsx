import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/user");
  redirect("/admin/dashboard");
}

// export default function Home() {
//   const isAdmin = true;
//   if (isAdmin) redirect("/admin/dashboard");
//   else redirect("/user");
// }
