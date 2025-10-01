// app/staff/dashboard/sidescreens/dashboard/page.tsx
import Link from "next/link";

type Priority = "High" | "Medium" | "Low";
type Status = "Open" | "In Progress";
type Task = {
  id: string;
  desc: string;
  priority: Priority;
  status: Status;
  action: "Start" | "Update";
};
import Image from "next/image";
const TASKS: Task[] = [
  {
    id: "TSK001",
    desc: "Clean Room 101",
    priority: "High",
    status: "Open",
    action: "Start",
  },
  {
    id: "TSK002",
    desc: "Lobby Check",
    priority: "Medium",
    status: "Open",
    action: "Start",
  },
  {
    id: "TSK003",
    desc: "Guest Complaint – Maria",
    priority: "High",
    status: "In Progress",
    action: "Update",
  },
];

function StatCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-md border border-gray-200 bg-white p-4">
      <div className="flex items-center justify-between">
        <div className="text-xs text-gray-500">{label}</div>
        <Image
          src="/icons/staff/card1.png"
          alt="Chart icon"
          width={18}
          height={18}
        />
      </div>
      <div className="mt-2 text-xl font-semibold text-gray-800">{value}</div>
    </div>
  );
}

function Pill({
  tone,
  children,
}: {
  tone: "rose" | "amber" | "zinc" | "yellow";
  children: React.ReactNode;
}) {
  const map = {
    rose: "bg-rose-50 text-rose-700",
    amber: "bg-amber-50 text-amber-700",
    zinc: "bg-zinc-50 text-zinc-600",
    yellow: "bg-yellow-50 text-yellow-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p className="text-[12px] text-gray-500">
          Overview of hotel performance and key insights
        </p>
      </div>

      {/* Greeting card */}
      <div className="rounded-md shadow-md bg-[#FEF5F2] p-4">
        <div className="text-sm">
          <div className="font-medium text-gray-800">Hello, Sarah 👋</div>
          <p className="mt-1 text-gray-600">Here’s your overview for today.</p>
        </div>
        <div className="mt-3 flex items-center gap-6 text-[10px] text-gray-600">
          <span className="flex items-center gap-1">
            <Image
              src="/icons/staff/date1.png"
              alt="Calendar icon"
              width={12}
              height={12}
            />
            Today: Sept 27, 2025
          </span>

          <span className="flex items-center gap-1">
            <Image
              src="/icons/staff/time.png"
              alt="Clock icon"
              width={12}
              height={12}
            />
            Evening Shift (3 PM – 11 PM)
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Tasks Assigned Today" value={5} />
        <StatCard label="In Progress" value={5} />
        <StatCard label="Completed" value={5} />
      </div>

      {/* Tasks + Schedule */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Current Tasks */}
        <div className="lg:col-span-2 rounded-md border border-gray-200 bg-white">
          <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-medium text-gray-800">Current Tasks</h2>
            <Link href="#" className="text-xs text-[#A57865] hover:underline">
              View all Task
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50 text-left text-xs text-gray-500">
                  <th className="px-4 py-3">Task ID</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {TASKS.map((t) => (
                  <tr
                    key={t.id}
                    className="border-b border-gray-100 last:border-0"
                  >
                    <td className="px-4 py-3">{t.id}</td>
                    <td className="px-4 py-3">{t.desc}</td>
                    <td className="px-4 py-3">
                      <Pill tone={t.priority === "High" ? "rose" : "amber"}>
                        {t.priority}
                      </Pill>
                    </td>
                    <td className="px-4 py-3">
                      {t.status === "Open" ? (
                        <Pill tone="zinc">Open</Pill>
                      ) : (
                        <Pill tone="yellow">inprogress</Pill>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <button className="w-[72px] rounded bg-[#A57865] px-3 py-1 text-xs font-medium text-white text-center hover:opacity-95 active:opacity-90">
                        {t.action}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Tomorrow's Schedule */}
        <div className="rounded-md border border-gray-200 bg-white">
          <div className="border-b border-gray-100 px-4 py-3">
            <h2 className="text-sm font-medium text-gray-800">
              Tomorrow&apos;s Schedule
            </h2>
          </div>
          <div className="p-4 text-sm">
            <div className="flex items-center gap-2">
              <Image
                src="/icons/staff/time.png"
                alt="Clock icon"
                width={14}
                height={14}
              />
              <span>
                <strong>Morning Shift</strong> (7 AM – 3 PM)
              </span>
            </div>

            <div className="mt-4">
              <div className="text-xs font-medium text-gray-500">Duties:</div>
              <ul className="mt-2 list-disc pl-5 text-xs text-gray-700 space-y-1">
                <li>Rooms 201–205 Cleaning</li>
                <li>Lobby Inspection</li>
              </ul>
            </div>

            <Link
              href="#"
              className="mt-4 block border-t border-gray-100 py-5 shadow-xs text-xs text-[#A57865] hover:underline"
            >
              View Full Schedule
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
