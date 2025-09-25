import KpiCards from "@/components/admin/KpiCards";
import OccupancyTrends from "@/components/admin/OccupancyTrends";
import BookingSourcesChart from "@/components/admin/BookingSourcesChart";
import RevenueByRoomTypeChart from "@/components/admin/RevenueByRoomTypeChart";
import ActionableInsights from "@/components/admin/ActionableInsights";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <KpiCards />

      <section className="rounded-md border-gray-300 shadow-sm bg-white p-4">
        <OccupancyTrends />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <section className="rounded-md border border-gray-300 shadow-sm bg-white p-4">
          <BookingSourcesChart />
        </section>
        <section className="rounded-md border border-gray-300 shadow-sm bg-white p-4">
          <RevenueByRoomTypeChart />
        </section>
      </div>

      <section className="rounded-md border border-gray-300 shadow-sm bg-white p-4">
        <ActionableInsights />
      </section>
    </div>
  );
}
