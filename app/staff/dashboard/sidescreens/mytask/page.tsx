"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import {
  TASKS,
  type Task,
  type Priority,
} from "@/app/staff/dashboard/sidescreens/mytask/data";
import TaskDetailModal from "@/components/staff/TaskDetailModal";
import StartTaskModal from "@/components/staff/StartTaskModal";
import UpdateTaskModal from "@/components/staff/UpdateTaskModal";

/* ---------------- UI helpers ---------------- */
function Badge({
  tone,
  children,
}: {
  tone: "rose" | "amber" | "emerald" | "zinc" | "sky";
  children: React.ReactNode;
}) {
  const map = {
    rose: "bg-rose-50 text-rose-700",
    amber: "bg-amber-50 text-amber-700",
    emerald: "bg-emerald-50 text-emerald-700",
    zinc: "bg-zinc-50 text-zinc-600",
    sky: "bg-sky-50 text-sky-700",
  } as const;
  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 text-xs font-medium ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function FixedBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-[72px] rounded bg-[#A57865] px-3 py-2 text-xs font-medium text-white hover:opacity-95 active:opacity-90"
    >
      {children}
    </button>
  );
}

function GhostBtn({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="rounded border border-gray-200 bg-white px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50"
    >
      {children}
    </button>
  );
}

function Select({
  value,
  onChange,
  options,
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  className?: string;
}) {
  return (
    <div className={`relative ${className}`}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-md border border-gray-200 bg-white px-3 py-2 pr-8 text-xs text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-100"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400">
        ▾
      </span>
    </div>
  );
}

function Pagination({
  page,
  total,
  onPage,
}: {
  page: number;
  total: number;
  onPage: (p: number) => void;
}) {
  const pages = Math.ceil(total / 10);
  const visible = Math.min(5, pages);
  return (
    <div className="flex items-center justify-between px-4 py-3 text-xs text-gray-600">
      <div>
        Showing {page * 10 - 9}-{Math.min(page * 10, total)} from {total}
      </div>
      <div className="flex items-center gap-1">
        <button
          onClick={() => onPage(Math.max(1, page - 1))}
          className="h-7 w-7 rounded border border-gray-200 bg-white hover:bg-gray-50"
        >
          ‹
        </button>
        {Array.from({ length: visible }).map((_, i) => {
          const n = i + 1;
          return (
            <button
              key={n}
              onClick={() => onPage(n)}
              className={`h-7 w-7 rounded border text-xs ${
                page === n
                  ? "border-[#A57865] bg-[#A57865] text-white"
                  : "border-gray-200 bg-white hover:bg-gray-50"
              }`}
            >
              {n}
            </button>
          );
        })}
        {pages > visible && (
          <button className="h-7 w-7 rounded border border-gray-200 bg-white">
            …
          </button>
        )}
        <button
          onClick={() => onPage(Math.min(pages, page + 1))}
          className="h-7 w-7 rounded border border-gray-200 bg-white hover:bg-gray-50"
        >
          ›
        </button>
      </div>
    </div>
  );
}

/* ---------------- Page ---------------- */
export default function MyTaskPage() {
  // filters
  const [query, setQuery] = useState("");
  const [priority, setPriority] = useState("All");
  const [status, setStatus] = useState("All");
  const [source, setSource] = useState("All");
  const [page, setPage] = useState(1);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false); // NEW
  const [showStarted, setShowStarted] = useState(false); // NEW success modal
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const clearAll = () => {
    setQuery("");
    setPriority("All");
    setStatus("All");
    setSource("All");
    setPage(1);
  };

  // filter + paginate
  const filtered = useMemo(() => {
    const start = (page - 1) * 10;
    const end = start + 10;
    return TASKS.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q);

      const matchPriority =
        priority === "All" || t.priority === (priority as Priority);

      const matchStatus =
        status === "All" ||
        (Array.isArray(t.status)
          ? t.status.some((s) => s === status)
          : t.status === status);

      const matchSource = source === "All" || t.source === source;

      return matchQuery && matchPriority && matchStatus && matchSource;
    }).slice(start, end);
  }, [query, priority, status, source, page]);

  const total = useMemo(() => {
    return TASKS.filter((t) => {
      const q = query.trim().toLowerCase();
      const matchQuery =
        !q ||
        t.id.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.source.toLowerCase().includes(q);
      const matchPriority =
        priority === "All" || t.priority === (priority as Priority);
      const matchStatus =
        status === "All" ||
        (Array.isArray(t.status)
          ? t.status.some((s) => s === status)
          : t.status === status);
      const matchSource = source === "All" || t.source === source;
      return matchQuery && matchPriority && matchStatus && matchSource;
    }).length;
  }, [query, priority, status, source]);

  return (
    <div className="space-y-4">
      {/* Breadcrumb + Title */}
      <div className="text-xs text-gray-500">Dashboard ▸ My Task</div>
      <h1 className="text-lg font-semibold text-gray-900">My Task</h1>

      {/* Filter card */}
      <div className="rounded-md border border-gray-200 bg-white p-4">
        {/* Search */}
        <div className="mb-3">
          <div className="relative w-full sm:w-80">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2">
              <Image
                src="/icons/search.png"
                alt="Search"
                width={14}
                height={14}
              />
            </span>
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              placeholder="Search"
              className="h-9 w-full rounded-md border border-gray-200 bg-white pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-gray-100"
            />
          </div>
        </div>

        {/* Dropdowns */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div>
            <div className="mb-1 text-[11px] text-gray-500">Priority</div>
            <Select
              value={priority}
              onChange={(v) => {
                setPriority(v);
                setPage(1);
              }}
              options={["All", "High", "Medium", "Low"]}
            />
          </div>

          <div>
            <div className="mb-1 text-[11px] text-gray-500">Status</div>
            <Select
              value={status}
              onChange={(v) => {
                setStatus(v);
                setPage(1);
              }}
              options={["All", "Open", "In Progress", "Completed", "Active"]}
            />
          </div>

          <div>
            <div className="mb-1 text-[11px] text-gray-500">Source</div>
            <Select
              value={source}
              onChange={(v) => {
                setSource(v);
                setPage(1);
              }}
              options={["All", "Reputation", "Maintenance", "Admin Manual"]}
            />
          </div>
        </div>

        <button
          onClick={clearAll}
          className="mt-3 inline-flex rounded-md border border-[#A57865] bg-white px-3 py-1.5 text-xs text-[#A57865] hover:bg-gray-50"
        >
          Clear all filter
        </button>
      </div>

      {/* Table */}
      <div className="rounded-md border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs text-gray-500">
                <th className="px-4 py-3">Task ID</th>
                <th className="px-4 py-3">Source</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {filtered.map((t) => (
                <tr
                  key={t.id}
                  className="border-b border-gray-200 last:border-0"
                >
                  <td className="px-4 py-3 font-medium">{t.id}</td>
                  <td className="px-4 py-3">{t.source}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block max-w-[280px] truncate align-middle">
                      {t.description}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {t.priority === "High" && <Badge tone="rose">High</Badge>}
                    {t.priority === "Medium" && (
                      <Badge tone="amber">Medium</Badge>
                    )}
                    {t.priority === "Low" && <Badge tone="sky">Low</Badge>}
                  </td>
                  <td className="px-4 py-3">
                    {Array.isArray(t.status) ? (
                      <div className="flex items-center gap-2">
                        <Badge tone="amber">In Progress</Badge>
                      </div>
                    ) : t.status === "Completed" ? (
                      <Badge tone="emerald">Completed</Badge>
                    ) : t.status === "Active" ? (
                      <Badge tone="emerald">Active</Badge>
                    ) : t.status === "Open" ? (
                      <Badge tone="zinc">Open</Badge>
                    ) : (
                      <Badge tone="amber">In Progress</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {/* <GhostBtn onClick={() => setSelectedTask(t)}>
                        View
                      </GhostBtn> */}
                      <GhostBtn
                        onClick={() => {
                          setSelectedTask(t);
                          setDetailOpen(true); // or any modal trigger
                        }}
                      >
                        View
                      </GhostBtn>
                      {/* <FixedBtn>
                        {Array.isArray(t.status) ? "Update" : "Start"}
                      </FixedBtn> */}
                      {/* <FixedBtn
                        onClick={() => {
                          setSelectedTask(t);
                          setShowStarted(true); // open the Start modal on Start button
                        }}
                      >
                        {Array.isArray(t.status) ? "Update" : "Start"}
                      </FixedBtn> */}
                      {/* <FixedBtn
                        onClick={() => {
                          if (!Array.isArray(t.status)) {
                            // Status is not started → Show start modal
                            setSelectedTask(t);
                            setShowStarted(true);
                          } else {
                            // Already started → maybe do nothing or open update modal
                            console.log(
                              "Already started: skipping start modal"
                            );
                          }
                        }}
                      >
                        {Array.isArray(t.status) ? "Update" : "Start"}
                      </FixedBtn> */}
                      <FixedBtn
                        onClick={() => {
                          if (!Array.isArray(t.status)) {
                            // Start
                            setSelectedTask(t);
                            setShowStarted(true);
                          } else {
                            // Update
                            setSelectedTask(t);
                            setUpdateOpen(true);
                          }
                        }}
                      >
                        {Array.isArray(t.status) ? "Update" : "Start"}
                      </FixedBtn>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination page={page} total={total} onPage={setPage} />
      </div>

      {/* Modal mount */}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={() => setSelectedTask(null)}
        />
      )}
      {showStarted && selectedTask && (
        <StartTaskModal
          task={selectedTask}
          onClose={() => setShowStarted(false)}
        />
      )}
      {showStarted && selectedTask && (
        <StartTaskModal
          task={selectedTask}
          onClose={() => {
            setShowStarted(false);
            setSelectedTask(null);
          }}
        />
      )}
      {updateOpen && selectedTask && (
        <UpdateTaskModal
          task={selectedTask}
          onClose={() => {
            setUpdateOpen(false);
            setSelectedTask(null);
          }}
          onSave={({ status, note }) => {
            // TODO: persist if needed
            console.log("Updated:", status, note);
          }}
        />
      )}
    </div>
  );
}
