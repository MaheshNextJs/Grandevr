// app/admin/staff/[id]/page.tsx
"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

import ReassignShiftModal, {
  ShiftName,
} from "@/components/admin/staffmanagement/ReassignShiftModal";
import ShiftUpdatedSuccessModal from "@/components/admin/staffmanagement/ShiftUpdatedSuccessModal";
import DeactivateStaffModal from "@/components/admin/staffmanagement/deactivate/DeactivateStaffModal";
import StaffDeactivatedSuccessModal from "@/components/admin/staffmanagement/deactivate/StaffDeactivatedSuccessModal";
import EditStaffModal from "@/components/admin/staffmanagement/EditStaffModal";

import type {
  Staff as StaffModel,
  StaffRole,
  StaffShift,
  StaffStatus,
} from "../data";
import { ROLES, SHIFTS } from "../data";

/* ---------- Local UI helpers ---------- */
type TaskStatus = "Completed" | "Pending" | "Assigned";

type Assignment = {
  date: string; // e.g., "Sept 20"
  task: string; // e.g., "Room 101 – Cleaning"
  status: TaskStatus;
  notes?: string;
};

function StatusBadge({ v }: { v: TaskStatus }) {
  const styles: Record<TaskStatus, string> = {
    Completed: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    Pending: "bg-amber-50 text-amber-700 border border-amber-200",
    Assigned: "bg-sky-50 text-sky-700 border border-sky-200",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${styles[v]}`}
    >
      {v}
    </span>
  );
}

function ProgressBar({ pct }: { pct: number }) {
  return (
    <div className="h-2 w-56 rounded-full bg-gray-200">
      <div
        className="h-2 rounded-full bg-[#A57865]"
        style={{ width: `${Math.min(100, Math.max(0, pct))}%` }}
      />
    </div>
  );
}

/* ---------- Mock Data (swap for API) ---------- */
const MOCK_STAFF: Record<string, StaffModel> = {
  STF001: {
    id: "STF001",
    name: "Sarah Lee",
    role: "Front Desk",
    shift: "Morning",
    status: "Active",
    nextAssignment: "Sept 24 – Lobby Desk (09:00)",
  },
  STF002: {
    id: "STF002",
    name: "John Doe",
    role: "Housekeeping",
    shift: "Evening",
    status: "Active",
    nextAssignment: "Sept 24 – Floor 3 Turnover (17:00)",
  },
};

const MOCK_ASSIGNMENTS: Assignment[] = [
  {
    date: "Sept 20",
    task: "4 Check-ins (Front Desk)",
    status: "Completed",
    notes: "-",
  },
  {
    date: "Sept 21",
    task: "Room 101 – Cleaning",
    status: "Pending",
    notes: "Scheduled for 2 PM",
  },
  {
    date: "Sept 23",
    task: "3 Guest Check-Outs",
    status: "Assigned",
    notes: "-",
  },
];

/* ---------- Page ---------- */
export default function StaffDetailPage() {
  const { id } = useParams<{ id: string }>();

  // Initial staff from mock, then make editable
  const initialStaff = useMemo(
    () => MOCK_STAFF[id as keyof typeof MOCK_STAFF] ?? MOCK_STAFF["STF001"],
    [id]
  );
  const [staff, setStaff] = useState<StaffModel>(initialStaff);

  // Reassign shift flow
  const [openShiftModal, setOpenShiftModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [savedShift, setSavedShift] = useState<{
    shift: ShiftName;
    date: string;
  }>({ shift: "Morning", date: "" });

  // Edit flow
  const [openEdit, setOpenEdit] = useState(false);

  // Deactivate flow
  const [openDeactivate, setOpenDeactivate] = useState(false);
  const [showDeactivateSuccess, setShowDeactivateSuccess] = useState(false);

  // Simple client pagination for assignments
  const PAGE_SIZE = 10;
  const [page, setPage] = useState(1);
  const total = MOCK_ASSIGNMENTS.length;
  const pageData = useMemo(
    () => MOCK_ASSIGNMENTS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE),
    [page]
  );

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 md:space-x-2">
          <li>
            <Link
              href="/admin/dashboard"
              className="hover:underline text-[12px]"
            >
              Dashboard
            </Link>
            <span className="px-1">›</span>
          </li>
          <li>
            <Link
              href="/admin/staff-management"
              className="hover:underline text-[12px]"
            >
              Staff Management
            </Link>
            <span className="px-1">›</span>
          </li>
          <li className="text-gray-900 text-[12px]">Staff Detail</li>
        </ol>
      </nav>

      {/* Title */}
      <div>
        <h1 className="text-2xl font-semibold text-[18px]">Staff Detail</h1>
      </div>

      {/* Summary Cards */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-3">
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Staff Name</div>
            <div className="text-sm text-gray-900">{staff.name}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Staff ID</div>
            <div className="text-sm text-gray-900">{staff.id}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Role</div>
            <div className="text-sm text-gray-900">{staff.role}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Shift</div>
            <div className="text-sm text-gray-900">{staff.shift}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Status</div>
            <div className="text-sm text-gray-900">{staff.status}</div>
          </div>
          <div className="space-y-1">
            <div className="text-[11px] text-gray-500">Next Assignment</div>
            <div className="text-sm text-gray-900">{staff.nextAssignment}</div>
          </div>
        </div>
      </div>

      {/* Assignments */}
      <section className="rounded-xl border border-gray-200 bg-white">
        <header className="border-b border-gray-200 px-4 py-3">
          <h2 className="font-medium">Assignments</h2>
        </header>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs text-gray-500">
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Task / Assignment</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((a, i) => (
                <tr key={i} className="border-b border-gray-100 last:border-0">
                  <td className="px-4 py-3">{a.date}</td>
                  <td className="px-4 py-3">{a.task}</td>
                  <td className="px-4 py-3">
                    <StatusBadge v={a.status} />
                  </td>
                  <td className="px-4 py-3">{a.notes ?? "-"}</td>
                </tr>
              ))}
              {total === 0 && (
                <tr>
                  <td
                    className="px-4 py-6 text-center text-gray-500"
                    colSpan={4}
                  >
                    No assignments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer / Pagination */}
        <div className="flex items-center justify-between px-4 py-3">
          <p className="text-xs text-gray-500">
            Showing {(page - 1) * PAGE_SIZE + 1}–
            {Math.min(page * PAGE_SIZE, total)} from {total}
          </p>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={page === 1}
            >
              ‹
            </button>
            {Array.from({ length: Math.max(1, Math.ceil(total / PAGE_SIZE)) })
              .slice(0, 6)
              .map((_, i) => {
                const n = i + 1;
                return (
                  <button
                    key={n}
                    onClick={() => setPage(n)}
                    className={`h-7 w-7 rounded-md border text-xs ${
                      n === page
                        ? "bg-[#A57865] text-white border-gray-200"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {n}
                  </button>
                );
              })}
            <button
              onClick={() =>
                setPage((p) => Math.min(Math.ceil(total / PAGE_SIZE), p + 1))
              }
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled={page === Math.ceil(total / PAGE_SIZE)}
            >
              ›
            </button>
            <button
              className="h-7 w-7 rounded-md border border-gray-200 text-xs text-gray-600 hover:bg-gray-50"
              disabled
            >
              …
            </button>
          </div>
        </div>
      </section>

      {/* Performance */}
      <section className="rounded-xl border border-gray-200 bg-white p-6">
        <h3 className="mb-4 font-medium">Performance</h3>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left: bars */}
          <div className="space-y-6">
            <div>
              <div className="text-xs text-gray-500">Tasks Completed</div>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar pct={92} />
                <div className="text-sm font-medium text-gray-900">92%</div>
              </div>
              <div className="mt-1 text-[11px] text-gray-500">46/50</div>
            </div>

            <div>
              <div className="text-xs text-gray-500">Attendance</div>
              <div className="mt-2 flex items-center gap-3">
                <ProgressBar pct={92} />
                <div className="text-sm font-medium text-gray-900">92%</div>
              </div>
              <div className="mt-1 text-[11px] text-gray-500">18/20 shifts</div>
            </div>

            <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
              View Detailed Report
            </button>
          </div>

          {/* Right: rating */}
          <div className="space-y-3">
            <div className="text-xs text-gray-500">Guest Rating</div>
            <div className="flex items-center gap-2">
              <div className="flex">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg
                    key={i}
                    viewBox="0 0 24 24"
                    className="h-5 w-5 text-amber-400"
                    fill="currentColor"
                  >
                    <path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.62L12 2 9.19 8.62 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm text-gray-500">(25 reviews)</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Actions */}
      <div className="flex flex-wrap items-center justify-end gap-3">
        <button
          onClick={() => setOpenDeactivate(true)}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Deactivate Staff
        </button>

        <button
          onClick={() => setOpenShiftModal(true)}
          className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
        >
          Reassign Shifts
        </button>

        <button
          onClick={() => setOpenEdit(true)}
          className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Edit Staff Info
        </button>
      </div>

      {/* Reassign Shift Flow */}
      <ReassignShiftModal
        isOpen={openShiftModal}
        onClose={() => setOpenShiftModal(false)}
        onSave={({ shift, date, notes }) => {
          console.log("Reassign saved:", { shift, date, notes });
          setOpenShiftModal(false);
          setSavedShift({ shift, date });
          setShowSuccessModal(true);
        }}
      />
      <ShiftUpdatedSuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        staffName={staff.name}
        shift={savedShift.shift}
        effectiveDate={savedShift.date}
      />

      {/* Deactivate Flow (confirm-only) */}
      <DeactivateStaffModal
        isOpen={openDeactivate}
        onClose={() => setOpenDeactivate(false)}
        staffName={staff.name}
        onConfirm={() => {
          // TODO: call your API: deactivateStaff(staff.id)
          console.log("Deactivated:", staff.id);
          setOpenDeactivate(false);
          setShowDeactivateSuccess(true);
        }}
      />

      <StaffDeactivatedSuccessModal
        isOpen={showDeactivateSuccess}
        onClose={() => setShowDeactivateSuccess(false)}
      />

      {/* Edit Staff Modal */}
      <EditStaffModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        staff={staff}
        roles={ROLES}
        shifts={SHIFTS}
        onSave={(updated) => {
          // Keep nextAssignment unless your modal edits it
          setStaff((prev: { nextAssignment: any }) => ({
            ...prev,
            ...updated,
            nextAssignment: prev.nextAssignment,
          }));
          setOpenEdit(false);
        }}
      />
    </div>
  );
}
