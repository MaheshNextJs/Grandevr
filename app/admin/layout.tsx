// NO "use client" here
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Admin • Grandeur",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server layout returns the client wrapper; no hooks here
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
