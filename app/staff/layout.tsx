import LayoutWrapper from "./LayoutWrapper";
export const metadata = {
  title: "Staff • Grandeur",
};

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <LayoutWrapper>{children}</LayoutWrapper>;
}
