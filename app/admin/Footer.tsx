export default function AdminFooter() {
  return (
    <footer
      className="relative z-10 h-14 bg-white border-t border-gray-200
             flex items-center justify-center px-4
             shadow-[0_-4px_80px_rgba(0,0,0,0.08)]"
    >
      <p className="text-xs text-gray-500">
        © {new Date().getFullYear()} <strong>Hotel Name</strong>. Powered by{" "}
        <span className="font-medium text-gray-700">AI Hotel Suite</span>.
      </p>
    </footer>
  );
}
