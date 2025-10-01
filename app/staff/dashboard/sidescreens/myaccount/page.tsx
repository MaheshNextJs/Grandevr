"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Tab = "personal" | "security" | "notifications";

export default function ProfileSettingsPage() {
  const [tab, setTab] = useState<Tab>("personal");

  return (
    <div className="space-y-5">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 text-[12px] text-gray-500">
        <Link
          href="/admin/dashboard/sidescreens/dashboard"
          className="hover:underline"
        >
          Dashboard
        </Link>
        <span className="text-gray-400">›</span>
        <Link
          href="/admin/dashboard/sidescreens/settings"
          className="hover:underline"
        >
          Settings
        </Link>
        <span className="text-gray-400">›</span>
        <span className="font-medium text-gray-700">My account</span>
      </nav>

      <h1 className="text-2xl font-semibold text-gray-900">My account</h1>

      {/* Tabs */}
      <div className="flex gap-6 rounded-md border border-gray-200 bg-white p-4 text-sm text-gray-700 shadow-sm">
        <TabBtn id="personal" active={tab} onClick={setTab}>
          Personal Information
        </TabBtn>
        <TabBtn id="security" active={tab} onClick={setTab}>
          Security Settings
        </TabBtn>
        <TabBtn id="notifications" active={tab} onClick={setTab}>
          Notification Preferences
        </TabBtn>
      </div>

      {/* ✅ NameBox only for Personal + Security */}
      {tab !== "notifications" && <NameBox />}

      {tab === "personal" && <PersonalSection />}
      {tab === "security" && <SecuritySection />}
      {tab === "notifications" && <NotificationsSection />}
    </div>
  );
}

/* ---------------- Tabs + Field helpers ---------------- */

function TabBtn({
  id,
  active,
  onClick,
  children,
}: {
  id: "personal" | "security" | "notifications";
  active: string;
  onClick: (id: any) => void;
  children: React.ReactNode;
}) {
  const isActive = active === id;
  return (
    <button
      onClick={() => onClick(id)}
      className={`pb-2 border-b-2 ${
        isActive
          ? "border-[#A57865] text-[#A57865] font-medium"
          : "border-transparent hover:text-[#A57865]"
      }`}
    >
      {children}
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1 text-[12px] text-gray-700 [&>*]:text-[12px]">
      <div className="font-medium">{label}</div>
      {children}
    </div>
  );
}

/* ---------------- ✅ NameBox (summary card) ---------------- */

function NameBox() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Info label="Name" value="Maria Smith" />
        <Info label="Role" value="TripAdvisor" />
        <Info label="Employee ID" value="Sept 20, 2025" />
        <div>
          <div className="text-[12px] text-gray-500 mb-1">Status</div>
          <span className="inline-flex items-center rounded px-2 py-0.5 text-xs font-medium bg-emerald-50 text-emerald-700">
            Active
          </span>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="space-y-1">
      <div className="text-[12px] text-gray-500">{label}</div>
      <div className="text-[13px] font-medium text-gray-800">{value}</div>
    </div>
  );
}

/* ---------------- Personal ---------------- */

/* ---------------- Personal ---------------- */

function PersonalSection() {
  const [editing, setEditing] = useState(false);

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-2">
      {/* Header + Edit (icon + text) */}
      <div className="flex justify-end">
        <button
          onClick={() => setEditing((v) => !v)}
          className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900"
        >
          <Image
            src="/icons/staff/edit.png"
            alt="Edit"
            width={16}
            height={16}
          />
          Edit
        </button>
      </div>

      {/* <Field label="Full Name">
        <input
          defaultValue="XYZ"
          disabled={!editing}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] ${
            editing
              ? "border-gray-300 bg-white"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        />
      </Field> */}
      <Field label="Email Address">
        <input
          defaultValue="XYZ"
          disabled={!editing}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] ${
            editing
              ? "border-gray-300 bg-white"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        />
      </Field>
      <Field label="Phone Number">
        <input
          defaultValue="+91"
          disabled={!editing}
          className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] ${
            editing
              ? "border-gray-300 bg-white"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        />
      </Field>
      {/* <Field label="Role">
        <input
          defaultValue="Admin (read-only)"
          readOnly
          className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
        />
      </Field> */}

      {/* Footer: centered Edit text + Save on right */}
      <div className="flex items-center justify-between pt-2">
        <div className="w-full text-center">
          {/* <button
            type="button"
            onClick={() => setEditing((v) => !v)}
            className="text-[13px] text-[#A57865] hover:underline"
          >
            Edit
          </button> */}
        </div>
        <div className="shrink-0">
          <button
            disabled={!editing}
            className={`rounded-md px-5 py-2 text-sm font-medium text-white ${
              editing
                ? "bg-[#A57865] hover:opacity-90"
                : "bg-[#A57865]/50 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Security ---------------- */

/* ---------------- Security ---------------- */

function SecuritySection() {
  const [editing, setEditing] = useState(false);
  const [s1, setS1] = useState(false);
  const [s2, setS2] = useState(false);
  const [s3, setS3] = useState(false);

  const Pwd = ({
    label,
    show,
    setShow,
  }: {
    label: string;
    show: boolean;
    setShow: (v: boolean) => void;
  }) => (
    <div>
      <div className="mb-1 text-sm text-gray-700">{label}</div>
      <div className="relative">
        <input
          type={show ? "text" : "password"}
          defaultValue="XYZ"
          disabled={!editing}
          className={`w-full rounded-md border px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865] ${
            editing
              ? "border-gray-300 bg-white"
              : "border-gray-200 bg-gray-50 text-gray-600"
          }`}
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent p-0.5 hover:opacity-80 focus:outline-none"
          tabIndex={-1}
        >
          <Image
            src={show ? "/icons/admin/pwd.png" : "/icons/admin/pwd.png"}
            alt={show ? "Hide" : "Show"}
            width={16}
            height={16}
            className="pointer-events-none"
          />
        </button>
      </div>
    </div>
  );

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
      {/* Header + Edit (icon + text) */}
      <div className="flex items-center justify-between">
        <div className="text-[15px] font-medium text-gray-800">
          {/* Security Settings */}
        </div>
        <button
          onClick={() => setEditing((v) => !v)}
          className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900"
        >
          <Image
            src="/icons/staff/edit.png"
            alt="Edit"
            width={16}
            height={16}
          />
          Edit
        </button>
      </div>

      <Pwd label="Current Password" show={s1} setShow={setS1} />
      <Pwd label="New Password" show={s2} setShow={setS2} />
      <Pwd label="Confirm Password" show={s3} setShow={setS3} />

      {/* Footer: centered Edit text + Save on right */}
      <div className="flex items-center justify-end pt-2">
        <div className="shrink-0">
          <button
            disabled={!editing}
            className={`rounded-md px-5 py-2 text-sm font-medium text-white ${
              editing
                ? "bg-[#A57865] hover:opacity-90"
                : "bg-[#A57865]/50 cursor-not-allowed"
            }`}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Notifications (UNCHANGED) ---------------- */

function ToggleSwitch({
  checked,
  disabled,
  onChange,
}: {
  checked: boolean;
  disabled?: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={(e) => {
        e.stopPropagation(); // prevent row onClick from also toggling
        if (!disabled) onChange();
      }}
      className={`relative inline-flex h-5.5 w-10 items-center rounded-full transition-colors ${
        checked ? "bg-green-600" : "bg-gray-300"
      } ${disabled ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <span
        className={`inline-block h-4.5 w-4.5 transform rounded-full bg-white shadow transition ${
          checked ? "translate-x-5" : "translate-x-1"
        }`}
      />
    </button>
  );
}

function NotificationsSection() {
  // edit gate like the reference screen
  const [editing, setEditing] = useState(false);

  // group 1
  const [cancelSrc, setCancelSrc] = useState(true);
  const [precheck, setPrecheck] = useState(false);
  const [escalations, setEscalations] = useState(false);

  return (
    <div className="space-y-4">
      {/* Group 1 */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="flex p-5 justify-end">
          <button
            onClick={() => setEditing((v) => !v)}
            className="inline-flex items-center gap-2 text-[13px] text-gray-600 hover:text-gray-900"
          >
            <Image
              src="/icons/staff/edit.png"
              alt="Edit"
              width={16}
              height={16}
            />
            Edit
          </button>
        </div>
        <ul className="divide-y divide-gray-100">
          <NotifRow
            label="Cancellations by Source"
            checked={cancelSrc}
            disabled={!editing}
            onToggle={() => setCancelSrc((v) => !v)}
          />
          <NotifRow
            label="Pre-Check-In Completed"
            checked={precheck}
            disabled={!editing}
            onToggle={() => setPrecheck((v) => !v)}
          />
          <NotifRow
            label="Reputation Escalations"
            checked={escalations}
            disabled={!editing}
            onToggle={() => setEscalations((v) => !v)}
          />
        </ul>
      </div>
    </div>
  );
}

function NotifRow({
  label,
  checked,
  disabled,
  onToggle,
}: {
  label: string;
  checked: boolean;
  disabled?: boolean;
  onToggle: () => void;
}) {
  return (
    <li
      onClick={() => !disabled && onToggle()}
      className={`flex items-center justify-between px-4 py-3 text-sm ${
        disabled ? "cursor-default" : "hover:bg-gray-50 cursor-pointer"
      }`}
    >
      <div className="text-gray-800">{label}</div>
      <ToggleSwitch checked={checked} disabled={disabled} onChange={onToggle} />
    </li>
  );
}
