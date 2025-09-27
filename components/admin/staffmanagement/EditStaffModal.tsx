"use client";
import { useEffect, useRef, useState } from "react";
import type {
  Staff,
  StaffStatus,
  StaffRole,
  StaffShift,
} from "@/app/admin/dashboard/sidescreens/staff-management/data";

type Props = {
  open: boolean;
  staff: Staff | null;
  roles: StaffRole[];
  shifts: StaffShift[];
  onClose: () => void;
  onSave: (updated: Staff & { email?: string; phone?: string }) => void;
};

export default function EditStaffModal({
  open,
  staff,
  roles,
  shifts,
  onClose,
  onSave,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  const [name, setName] = useState(staff?.name ?? "");
  const [role, setRole] = useState<StaffRole | "">(
    (staff?.role as StaffRole) ?? ""
  );
  const [shift, setShift] = useState<StaffShift | "">(
    (staff?.shift as StaffShift) ?? ""
  );
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<StaffStatus>(
    (staff?.status as StaffStatus) ?? "Active"
  );

  // hydrate when staff/open changes
  useEffect(() => {
    if (!open) return;
    setName(staff?.name ?? "");
    setRole((staff?.role as StaffRole) ?? "");
    setShift((staff?.shift as StaffShift) ?? "");
    setStatus((staff?.status as StaffStatus) ?? "Active");
    setEmail("");
    setPhone("");
  }, [open, staff]);

  // close on ESC / outside click
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const onClick = (e: MouseEvent) => {
      if (!wrapRef.current?.contains(e.target as Node)) onClose();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [open, onClose]);

  if (!open || !staff) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center bg-black/60 p-4">
      <div
        ref={wrapRef}
        className="mt-8 w-full max-w-3xl rounded-md bg-white shadow-xl border border-gray-200"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4">
          <h3 className="text-[15px] font-semibold">Edit Staff</h3>
          <button
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="p-4 border border rounded-md shadow-sm mx-4 border-gray-200">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {/* Name */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Name</div>
              <div className="relative">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-300">
                  ⌄
                </span>
              </div>
            </div>

            {/* Role */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Role</div>
              <div className="relative">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as StaffRole)}
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                >
                  <option value="" disabled>
                    Role
                  </option>
                  {roles.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
            </div>

            {/* Shift */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Shift</div>
              <div className="relative">
                <select
                  value={shift}
                  onChange={(e) => setShift(e.target.value as StaffShift)}
                  className="w-full appearance-none rounded-md border border-gray-300 bg-white py-2 pl-3 pr-8 text-sm"
                >
                  <option value="" disabled>
                    Shift
                  </option>
                  {shifts.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                  ▾
                </span>
              </div>
            </div>

            {/* Email */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Email</div>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Phone</div>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                className="w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 text-sm"
              />
            </div>

            {/* Status */}
            <div>
              <div className="text-[11px] text-gray-600 mb-1">Status</div>
              <div className="flex items-center gap-5 pt-2">
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    className="h-4 w-4 accent-[#A57865]"
                    checked={status === "Active"}
                    onChange={() => setStatus("Active")}
                  />
                  Active
                </label>
                <label className="inline-flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="radio"
                    className="h-4 w-4 accent-[#A57865]"
                    checked={status === "On Leave"}
                    onChange={() => setStatus("On Leave")}
                  />
                  Leave
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3  px-5 py-3">
          <button
            onClick={onClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={() =>
              onSave({
                ...(staff as Staff),
                name,
                role: role as StaffRole,
                shift: shift as StaffShift,
                status,
                email,
                phone,
              })
            }
            className="rounded-md bg-[#A57865] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
