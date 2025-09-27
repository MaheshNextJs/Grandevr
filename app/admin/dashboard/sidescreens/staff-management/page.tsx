"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  STAFF,
  ROLES,
  SHIFTS,
  STATUSES,
  type Staff,
  type StaffStatus,
} from "./data";

import RowActions from "@/components/admin/staffmanagement/RowActions";
import EditStaffModal from "@/components/admin/staffmanagement/EditStaffModal";
import TaskViewModal, {
  Task,
  TaskPriority,
  TaskStatus,
} from "@/components/admin/staffmanagement/TaskViewModal";
import TaskResolvedSuccessModal from "@/components/admin/staffmanagement/TaskResolvedSuccessModal";
import TaskReassignModal from "@/components/admin/staffmanagement/Task/TaskReassignModal";
import TaskReassignedSuccessModal from "@/components/admin/staffmanagement/Task/TaskReassignedSuccessModal";
import TaskUpdatedSuccessModal from "@/components/admin/staffmanagement/update/TaskUpdatedSuccessModal";
import TaskUpdateModal from "@/components/admin/staffmanagement/update/TaskUpdateModal";

// Status badge colors
const STATUS_STYLES: Record<
  StaffStatus,
  { bg: string; text: string; dot: string }
> = {
  Active: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
  },
  "On Leave": {
    bg: "bg-amber-50",
    text: "text-amber-700",
    dot: "bg-amber-500",
  },
  Inactive: {
    bg: "bg-slate-100",
    text: "text-slate-700",
    dot: "bg-slate-500",
  },
};

const SOURCES = [
  "All Sources",
  "Internal",
  "Agency",
  "Referral",
  "Walk-in",
] as const;

type SourceFilter = (typeof SOURCES)[number];

// Dummy task data for Task tab (replace with API if needed)
const TASKS = Array.from({ length: 10 }).map((_, i) => ({
  id: `TSK00${i + 1}`,
  source: ["Reputation", "Maintenance", "Admin Manual"][i % 3],
  description: "Guest complaint: noisy room",
  priority: ["High", "Medium", "Low"][i % 3], // <- only valid priorities
  assignedTo: ["Housekeeping Supervisor", "Maintenance Team"][i % 2],
  status: ["Open", "In Progress", "Resolved"][i % 3],
}));

export default function Page() {
  const router = useRouter();

  // Filters
  const [query, setQuery] = useState("");
  const [viewOpen, setViewOpen] = useState(false);
  const [viewTask, setViewTask] = useState<Task | null>(null);
  const [role, setRole] = useState<"All Roles" | (typeof ROLES)[number]>(
    "All Roles"
  );
  const [shift, setShift] = useState<"All Shifts" | (typeof SHIFTS)[number]>(
    "All Shifts"
  );
  const [status, setStatus] = useState<
    "All Status" | (typeof STATUSES)[number]
  >("All Status");
  const [source, setSource] = useState<SourceFilter>("All Sources");

  const [reassignOpen, setReassignOpen] = useState(false);
  const [reassignTask, setReassignTask] = useState<Task | null>(null);
  const [reassignSuccessOpen, setReassignSuccessOpen] = useState(false);

  const [resolvedOpen, setResolvedOpen] = useState(false);
  const [resolvedTaskId, setResolvedTaskId] = useState<string | null>(null);

  // Update flow
  const [updateOpen, setUpdateOpen] = useState(false);
  const [updateTask, setUpdateTask] = useState<Task | null>(null);
  const [updateSuccessOpen, setUpdateSuccessOpen] = useState(false);
  const [updatedTaskId, setUpdatedTaskId] = useState<string | undefined>();

  const clearAll = () => {
    setQuery("");
    setRole("All Roles");
    setShift("All Shifts");
    setStatus("All Status");
    setSource("All Sources");
  };

  // Tabs
  const [activeTab, setActiveTab] = useState<"Staff" | "Tasks">("Staff");

  // Edit modal
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState<Staff | null>(null);

  // Staff data (filtered)
  const filteredStaff = useMemo(() => {
    return STAFF.filter((s) => {
      const q =
        s.id.toLowerCase().includes(query.toLowerCase()) ||
        s.name.toLowerCase().includes(query.toLowerCase());
      const rf = role === "All Roles" || s.role === role;
      const sf = shift === "All Shifts" || s.shift === shift;
      const st = status === "All Status" || s.status === status;
      return q && rf && sf && st;
    });
  }, [query, role, shift, status]);

  return (
    <div className="space-y-6">
      {/* Breadcrumbs */}
      <nav className="text-[12px] text-gray-500 flex items-center space-x-1">
        <Link href="/admin/dashboard" className="hover:underline">
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <span className="text-gray-700 font-medium">Staff Management</span>
      </nav>

      <h1 className="text-xl font-semibold text-gray-900">Staff Management</h1>

      {/* Tabs + Button */}
      <div className="px-6 py-4 mt-4 border border-gray-200 shadow rounded-md bg-white">
        <div className="flex gap-6 border-b border-gray-200">
          <button
            className={`pb-2 text-sm ${
              activeTab === "Staff"
                ? "font-medium text-[#A57865] border-b-2 border-[#A57865]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Staff")}
          >
            Staff List
          </button>
          <button
            className={`pb-2 text-sm ${
              activeTab === "Tasks"
                ? "font-medium text-[#A57865] border-b-2 border-[#A57865]"
                : "text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab("Tasks")}
          >
            Tasks
          </button>
        </div>

        <div className="mt-4 flex justify-end">
          <button
            className="rounded-md bg-[#A57865] px-4 py-2 text-[12px] text-white hover:opacity-90"
            onClick={() => setEditOpen(true)}
          >
            Add New Staff
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1 max-w-sm">
              <span className="absolute inset-y-0 left-3 flex items-center">
                <Image
                  src="/icons/search.png"
                  alt="Search"
                  width={16}
                  height={16}
                />
              </span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
                className="w-full rounded-lg border border-gray-300 pl-9 pr-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/5"
              />
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Role */}
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">Role</div>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
              >
                <option>All Roles</option>
                {ROLES.map((r) => (
                  <option key={r}>{r}</option>
                ))}
              </select>
            </div>

            {/* Shift */}
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Shift
              </div>
              <select
                value={shift}
                onChange={(e) => setShift(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
              >
                <option>All Shifts</option>
                {SHIFTS.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Status
              </div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
              >
                <option>All Status</option>
                {STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Source */}
            <div>
              <div className="text-xs font-medium text-gray-500 mb-1">
                Source
              </div>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value as any)}
                className="w-full rounded-lg border border-gray-300 py-2 px-3 text-sm"
              >
                {SOURCES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={clearAll}
            className="mt-4 inline-flex rounded-md border border-[#A57865] bg-white px-3 py-1.5 text-xs text-[#A57865] hover:bg-gray-50"
          >
            Clear all filter
          </button>
        </div>
      </div>

      {/* Table Card */}
      <div className="rounded-xl border border-gray-200 shadow-sm bg-white">
        <div className="px-6 pb-4">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 text-xs">
                  {activeTab === "Staff" ? (
                    <>
                      <th className="py-3 font-medium">Staff ID</th>
                      <th className="py-3 font-medium">Name</th>
                      <th className="py-3 font-medium">Shift</th>
                      <th className="py-3 font-medium">Role</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium">Next Assignment</th>
                      <th className="py-3 font-medium">Action</th>
                    </>
                  ) : (
                    <>
                      <th className="py-3 font-medium">Task ID</th>
                      <th className="py-3 font-medium">Source</th>
                      <th className="py-3 font-medium">Description</th>
                      <th className="py-3 font-medium">Priority</th>
                      <th className="py-3 font-medium">Assigned To</th>
                      <th className="py-3 font-medium">Status</th>
                      <th className="py-3 font-medium">Action</th>
                    </>
                  )}
                </tr>
              </thead>
              <tbody>
                {activeTab === "Staff"
                  ? filteredStaff.map((s) => {
                      const style = STATUS_STYLES[s.status];
                      return (
                        <tr
                          key={s.id}
                          className="border-t border-gray-100 text-gray-700"
                        >
                          <td className="py-4">{s.id}</td>
                          <td className="py-4">{s.name}</td>
                          <td className="py-4">{s.shift}</td>
                          <td className="py-4">{s.role}</td>
                          <td className="py-4">
                            <span
                              className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${style.bg} ${style.text}`}
                            >
                              <span
                                className={`inline-block h-1.5 w-1.5 rounded-full ${style.dot}`}
                              />
                              {s.status}
                            </span>
                          </td>
                          <td className="py-4">{s.nextAssignment}</td>
                          <td className="py-4">
                            <RowActions
                              onView={() =>
                                router.push(
                                  `/admin/dashboard/sidescreens/staff-management/${s.id}`
                                )
                              }
                              onEdit={() => {
                                setEditing(s);
                                setEditOpen(true);
                              }}
                              onCancel={() =>
                                console.log("Cancel clicked", s.id)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  : TASKS.map((t) => (
                      <tr
                        key={t.id}
                        className="border-t border-gray-100 text-gray-700"
                      >
                        <td className="py-4">{t.id}</td>
                        <td className="py-4">{t.source}</td>
                        <td className="py-4">{t.description}</td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                              t.status === "Open"
                                ? "bg-amber-50 text-amber-700"
                                : t.status === "In Progress"
                                ? "bg-sky-50 text-sky-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>

                        <td className="py-4">{t.assignedTo}</td>
                        <td className="py-4">
                          <span
                            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-medium ${
                              t.status === "Open"
                                ? "bg-amber-50 text-amber-700"
                                : t.status === "In Progress"
                                ? "bg-sky-50 text-sky-700"
                                : "bg-emerald-50 text-emerald-700"
                            }`}
                          >
                            {t.status}
                          </span>
                        </td>

                        <td className="py-4 space-x-2">
                          <button
                            className="rounded-md border border-gray-300 bg-white px-3 py-1 text-xs text-gray-700 hover:bg-gray-50"
                            onClick={() => {
                              setViewTask({
                                id: t.id,
                                title: `${t.source} – ${t.description}`,
                                source: t.source,
                                priority:
                                  (t.priority as TaskPriority) || "High",
                                status: (t.status as TaskStatus) || "Open",
                                assignedTo: t.assignedTo,
                                createdBy: "Admin (Reputation System)",
                                createdAt: new Date().toISOString(),
                                description:
                                  "Room was not cleaned properly when I checked in. Housekeeping was slow to respond",
                                notes: [
                                  {
                                    when: "Sept 21",
                                    text: "Assigned to Housekeeping Supervisor (Admin)",
                                  },
                                  {
                                    when: "Sept 21",
                                    text: "Supervisor: Investigating housekeeping logs",
                                  },
                                ],
                              });
                              setViewOpen(true);
                            }}
                          >
                            View
                          </button>
                          {/* <button className="px-3 py-1 rounded-md bg-[#A57865] text-white text-xs">
                            {t.status === "Open" ? "Reassign" : "Update"}
                          </button> */}
                          {t.status !== "Resolved" && (
                            <button
                              className="px-3 py-1 rounded-md bg-[#A57865] text-white text-xs"
                              onClick={() => {
                                const full: Task = {
                                  id: t.id,
                                  title: `${t.source} – ${t.description}`,
                                  source: t.source,
                                  priority: t.priority as TaskPriority,
                                  status: t.status as TaskStatus,
                                  assignedTo: t.assignedTo,
                                  createdBy: "Admin (Reputation System)",
                                  createdAt: new Date().toISOString(),
                                  description:
                                    "Room was not cleaned properly when I checked in. Housekeeping was slow to respond",
                                  notes: [],
                                };

                                if (t.status === "Open") {
                                  setReassignTask(full);
                                  setReassignOpen(true);
                                } else {
                                  setUpdateTask(full);
                                  setUpdateOpen(true);
                                }
                              }}
                            >
                              {t.status === "Open" ? "Reassign" : "Update"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
              </tbody>
            </table>

            {/* View Task Modal */}
            {/* <TaskViewModal
              isOpen={viewOpen}
              onClose={() => setViewOpen(false)}
              task={viewTask}
              onAddNote={(id, note) => {
                console.log("Add note", id, note);
              }}
              onReassign={(id) => {
                console.log("Reassign", id);
              }}
              onResolve={(id) => {
                setViewOpen(false); // Close the task modal
                setResolvedTaskId(id); // Store task ID
                setResolvedOpen(true); // Show success popup
              }}
            /> */}
            <TaskViewModal
              isOpen={viewOpen}
              onClose={() => setViewOpen(false)}
              task={viewTask}
              onAddNote={(id, note) => {
                console.log("Add note", id, note);
              }}
              onReassign={(id) => {
                if (viewTask) setReassignTask(viewTask); // ✅ ADD THIS
                setViewOpen(false); // ✅ AND THIS
                setReassignOpen(true); // ✅ AND THIS
              }}
              onResolve={(id) => {
                setResolvedTaskId(id); // remember which task
                setViewOpen(false); // close the view modal
                setResolvedOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {/* Edit Staff Modal */}
      <EditStaffModal
        open={editOpen}
        staff={editing}
        roles={ROLES}
        shifts={SHIFTS}
        onClose={() => setEditOpen(false)}
        onSave={(updated) => {
          console.log("Save staff", updated);
          setEditOpen(false);
        }}
      />
      <TaskUpdateModal
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        task={updateTask}
        onSave={({ taskId, status, note }) => {
          // TODO: call your API to update the task
          console.log("Update saved", { taskId, status, note });
          setUpdateOpen(false);
          setUpdatedTaskId(taskId);
          setUpdateSuccessOpen(true);
        }}
      />

      <TaskUpdatedSuccessModal
        isOpen={updateSuccessOpen}
        onClose={() => setUpdateSuccessOpen(false)}
        taskId={updatedTaskId}
      />

      <TaskResolvedSuccessModal
        isOpen={resolvedOpen}
        onClose={() => setResolvedOpen(false)}
        taskId={resolvedTaskId ?? ""}
      />

      <TaskReassignModal
        isOpen={reassignOpen}
        onClose={() => setReassignOpen(false)}
        taskId={reassignTask?.id}
        currentAssignee={reassignTask?.assignedTo}
        currentPriority={reassignTask?.priority}
        onConfirm={(payload) => {
          // TODO: call your API here with { taskId: reassignTask?.id, ...payload }
          console.log("Reassign confirmed:", reassignTask?.id, payload);

          setReassignOpen(false);
          setReassignSuccessOpen(true);
        }}
      />

      <TaskReassignedSuccessModal
        isOpen={reassignSuccessOpen}
        onClose={() => setReassignSuccessOpen(false)}
        taskId={reassignTask?.id}
      />
    </div>
  );
}
