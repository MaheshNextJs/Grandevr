"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import Link from "next/link";

/* ---------------- Main Settings Page ---------------- */
export default function Page() {
  const [activeTab, setActiveTab] = useState<
    "property" | "users" | "precheckin" | "notifications"
  >("property");

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-gray-500">
        <span className="hover:underline">Dashboard</span>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700">Settings</span>
      </nav>

      <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>

      {/* Tabs */}
      <div className="flex gap-6 rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
        <TabBtn id="property" active={activeTab} onClick={setActiveTab}>
          Personal Information
        </TabBtn>
        <TabBtn id="users" active={activeTab} onClick={setActiveTab}>
          User & Role Management
        </TabBtn>
        <TabBtn id="precheckin" active={activeTab} onClick={setActiveTab}>
          Pre-Check-In Preferences
        </TabBtn>
        <TabBtn id="notifications" active={activeTab} onClick={setActiveTab}>
          Notification Settings
        </TabBtn>
      </div>

      {/* Content */}
      {activeTab === "property" && <PersonalInformation />}
      {activeTab === "users" && <UsersRolesTab />}
      {activeTab === "precheckin" && <PreCheckinTab />}
      {activeTab === "notifications" && <NotificationSettingsTab />}
    </div>
  );
}

function TabBtn({
  id,
  active,
  onClick,
  children,
}: {
  id: "property" | "users" | "precheckin" | "notifications";
  active: string;
  onClick: (id: any) => void;
  children: React.ReactNode;
}) {
  const isActive = active === id;
  return (
    <button
      className={`pb-2 border-b-2 ${
        isActive
          ? "border-[#A57865] text-[#A57865] font-medium"
          : "border-transparent hover:text-[#A57865]"
      }`}
      onClick={() => onClick(id)}
    >
      {children}
    </button>
  );
}

/* ---------------- Shared Field Wrapper ---------------- */
function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-1 text-[12px] text-gray-700">{label}</div>
      {children}
    </div>
  );
}

/* =======================================================
   TAB 1: Property Information
======================================================= */
function PersonalInformation() {
  const [hotel, setHotel] = useState("XYZ");
  const [address, setAddress] = useState("XYZ");
  const [phone, setPhone] = useState("XYZ");
  const [email, setEmail] = useState("XYZ");
  // const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">
      {/* Logo */}
      <div className="flex items-center gap-4 border-b border-gray-100 pb-6">
        <div className="relative h-16 w-16 rounded-full bg-gray-100">
          <Image
            src="/images/user1.png"
            alt="Logo"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />
          {/* <span className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#A57865] text-[10px] text-white">
            ✎
          </span> */}
          {/* <button
            onClick={() => setOpenProfile(true)}
            className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#A57865] text-[10px] text-white hover:opacity-90"
            aria-label="Edit profile"
          >
            ✎
          </button> */}
          <Link
            href="/admin/dashboard/sidescreens/settings/profile"
            className="absolute bottom-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#A57865] text-[10px] text-white hover:opacity-90"
            aria-label="Edit profile"
          >
            ✎
          </Link>
        </div>
        <div className="text-[12px] text-gray-500">
          Last updated: 12/08/2024
        </div>
      </div>

      {/* Form */}
      <div className="mt-6 space-y-5">
        <Field label="Hotel Name">
          <input
            value={hotel}
            onChange={(e) => setHotel(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
          />
        </Field>

        <Field label="Address">
          <textarea
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={3}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
          />
        </Field>

        <Field label="Phone">
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
          />
        </Field>

        <Field label="Email">
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
          />
        </Field>
      </div>

      {/* Save */}
      <div className="mt-6 flex justify-end">
        <button className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* =======================================================
   TAB 2: User & Role Management
======================================================= */
type User = {
  name: string;
  role: string;
  email: string;
  status: "Active" | "Disabled";
};

function UsersRolesTab() {
  const [users, setUsers] = useState<User[]>([
    {
      name: "John Doe",
      role: "Admin",
      email: "john@hotel.com",
      status: "Active",
    },
    {
      name: "Sarah Lee",
      role: "Staff",
      email: "sarah@hotel.com",
      status: "Active",
    },
    {
      name: "John Doe",
      role: "Manager",
      email: "john@hotel.com",
      status: "Active",
    },
  ]);

  const addUser = () =>
    setUsers((u) => [
      ...u,
      {
        name: "New User",
        role: "Staff",
        email: "new@hotel.com",
        status: "Active",
      },
    ]);

  const toggleStatus = (idx: number) =>
    setUsers((u) =>
      u.map((x, i) =>
        i === idx
          ? { ...x, status: x.status === "Active" ? "Disabled" : "Active" }
          : x
      )
    );

  return (
    <div className="space-y-3">
      <div className="flex justify-end">
        <button
          onClick={addUser}
          className="rounded-md bg-[#A57865] px-3 py-2 text-xs font-medium text-white hover:opacity-90"
        >
          Add New User
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-50 text-left text-[13px] font-medium text-gray-600">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Role</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((u, i) => (
              <tr key={`${u.email}-${i}`} className="hover:bg-gray-50">
                <td className="px-4 py-3">{u.name}</td>
                <td className="px-4 py-3">{u.role}</td>
                <td className="px-4 py-3">{u.email}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[11px] ${
                      u.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {u.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex justify-end gap-2">
                    <button className="rounded-md border border-gray-300 bg-white px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50">
                      Edit
                    </button>
                    <button
                      onClick={() => toggleStatus(i)}
                      className="rounded-md border text-white border-gray-300 bg-[#A57865] px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-50"
                    >
                      {u.status === "Active" ? "Disable" : "Enable"}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end px-4 py-3">
          <button className="rounded-md bg-[#A57865] px-5 py-2 text-xs font-medium text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* =======================================================
   TAB 3: Pre‑Check‑In Preferences
======================================================= */
function PreCheckinTab() {
  const [requireId, setRequireId] = useState(true);
  const [requireSignature, setRequireSignature] = useState(false);
  const [allowAddons, setAllowAddons] = useState(false);
  const [reminder, setReminder] = useState("24 hours");

  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <ul className="divide-y divide-gray-100">
        <LiSwitch
          label="Require ID Verification"
          checked={requireId}
          onChange={() => setRequireId((v) => !v)}
        />
        <LiSwitch
          label="Require Digital Signature"
          checked={requireSignature}
          onChange={() => setRequireSignature((v) => !v)}
        />
        <LiSwitch
          label="Allow Add-On Payments"
          checked={allowAddons}
          onChange={() => setAllowAddons((v) => !v)}
        />
        <li className="flex items-center justify-between px-4 py-3">
          <div className="text-sm text-gray-700">Default Reminder Interval</div>
          <div className="relative w-[200px]">
            <select
              value={reminder}
              onChange={(e) => setReminder(e.target.value)}
              className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
            >
              <option>6 hours</option>
              <option>12 hours</option>
              <option>24 hours</option>
              <option>48 hours</option>
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
              ▾
            </span>
          </div>
        </li>
      </ul>

      <div className="flex justify-end px-4 py-3">
        <button className="rounded-md bg-[#A57865] px-5 py-2 text-xs font-medium text-white hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

/* =======================================================
   TAB 4: Notification Settings
======================================================= */
function NotificationSettingsTab() {
  const [reservationConfirmed, setReservationConfirmed] = useState(true);
  const [precheckComplete, setPrecheckComplete] = useState(false);
  const [negativeEscalated, setNegativeEscalated] = useState(false);
  const [smsAlert, setSmsAlert] = useState(false);

  const [digestFreq, setDigestFreq] = useState("Weekly");
  const datePlaceholder = useMemo(
    () =>
      new Date(2025, 8, 2).toLocaleDateString("en-US", {
        weekday: "short",
        day: "2-digit",
        month: "long",
      }),
    []
  );

  return (
    <div className="space-y-3">
      <div className="rounded-xl border border-gray-200 bg-white">
        <ul className="divide-y divide-gray-100">
          <LiSwitch
            label="Reservation Confirmed"
            checked={reservationConfirmed}
            onChange={() => setReservationConfirmed((v) => !v)}
          />
          <LiSwitch
            label="Pre-Check-in Completed"
            checked={precheckComplete}
            onChange={() => setPrecheckComplete((v) => !v)}
          />
          <LiSwitch
            label="Negative Review Escalated"
            checked={negativeEscalated}
            onChange={() => setNegativeEscalated((v) => !v)}
          />
          <LiSwitch
            label="SMS Alerts"
            checked={smsAlert}
            onChange={() => setSmsAlert((v) => !v)}
          />
        </ul>
      </div>

      {/* Digest */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className=" px-4 py-2.5 text-[12px] font-medium text-gray-700">
          Digest Reports
        </div>
        <div className="grid grid-cols-1 gap-3 px-4 py-3 md:grid-cols-2">
          <Field label="Date">
            <div className="relative w-full md:max-w-xl">
              <select
                value={digestFreq}
                onChange={(e) => setDigestFreq(e.target.value)}
                className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] focus:border-[#A57865]"
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                ▾
              </span>
            </div>
          </Field>

          <Field label="Email">
            <input
              placeholder="enter your email address"
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-[#A57865]"
            />
          </Field>
        </div>

        <div className="flex justify-end px-4 py-3">
          <button className="rounded-md bg-[#A57865] px-5 py-2 text-xs font-medium text-white hover:opacity-90">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Small Switch Row ---------------- */
// function LiSwitch({
//   label,
//   checked,
//   onChange,
// }: {
//   label: string;
//   checked: boolean;
//   onChange: () => void;
// }) {
//   return (
//     <li className="flex items-center justify-between px-4 py-3">
//       <div className="text-sm text-gray-700">{label}</div>
//       <button
//         onClick={onChange}
//         className={`relative h-6 w-11 rounded-full transition-colors ${
//           checked ? "bg-emerald-500" : "bg-gray-300"
//         }`}
//         aria-pressed={checked}
//       >
//         <span
//           className={`absolute top-1/2 h-5 w-5 -translate-y-1/2 transform rounded-full bg-white transition-transform ${
//             checked ? "translate-x-6" : "translate-x-1"
//           }`}
//         />
//       </button>
//     </li>
//   );
// }

function LiSwitch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <li className="flex items-center justify-between px-4 py-3">
      <div className="text-sm text-gray-700">{label}</div>
      <button
        onClick={onChange}
        className={`relative h-6 w-11 rounded-full transition-colors duration-300 ease-in-out focus:outline-none ${
          checked ? "bg-emerald-500" : "bg-gray-300"
        }`}
        aria-pressed={checked}
      >
        <span
          className={`absolute top-0.5 left-0.5 h-5 w-5 transform rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </li>
  );
}
