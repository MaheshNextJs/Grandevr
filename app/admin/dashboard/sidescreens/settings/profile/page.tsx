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

      {tab === "personal" && <PersonalSection />}
      {tab === "security" && <SecuritySection />}
      {tab === "notifications" && <NotificationsSection />}
    </div>
  );
}

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

/* -------- Sections -------- */
function PersonalSection() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 space-y-5">
      <Field label="Full Name">
        <input
          defaultValue="XYZ"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865]"
        />
      </Field>
      <Field label="Email Address">
        <input
          defaultValue="XYZ"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865]"
        />
      </Field>
      <Field label="Phone Number">
        <input
          defaultValue="XYZ"
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865]"
        />
      </Field>
      <Field label="Role">
        <input
          defaultValue="Admin (read-only)"
          readOnly
          className="w-full cursor-not-allowed rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-600"
        />
      </Field>
      <div className="flex justify-end">
        <button className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function SecuritySection() {
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
          className="w-full rounded-md border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#A57865]"
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent p-0.5 hover:opacity-80 focus:outline-none"
        >
          <Image
            src={show ? "/icons/admin/eye-off.png" : "/icons/admin/eye.png"}
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
      <Pwd label="Current Password" show={s1} setShow={setS1} />
      <Pwd label="New Password" show={s2} setShow={setS2} />
      <Pwd label="Confirm Password" show={s3} setShow={setS3} />
      <div className="flex justify-end">
        <button className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          Save Changes
        </button>
      </div>
    </div>
  );
}

function NotificationsSection() {
  // ✅ local state for each toggle
  const [cancelSrc, setCancelSrc] = useState(true);
  const [precheck, setPrecheck] = useState(false);
  const [escalations, setEscalations] = useState(false);
  const [smsEnabled, setSmsEnabled] = useState(true);
  const [inApp, setInApp] = useState(false);

  return (
    <div className="space-y-4">
      {/* Group 1 */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="px-4 py-2.5 text-[12px] font-medium text-gray-700">
          Cancellations by Source
        </div>
        <ul className="divide-y divide-gray-100">
          <Row
            label="Cancellations by Source"
            checked={cancelSrc}
            onChange={() => setCancelSrc((v) => !v)}
          />
          <Row
            label="Pre-Check-In Completed"
            checked={precheck}
            onChange={() => setPrecheck((v) => !v)}
          />
          <Row
            label="Reputation Escalations"
            checked={escalations}
            onChange={() => setEscalations((v) => !v)}
          />
        </ul>
      </div>

      {/* Group 2 */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="px-4 py-2.5 text-[12px] font-medium text-gray-700">
          SMS Alerts
        </div>
        <ul className="divide-y divide-gray-100">
          <Row
            label="Enabled"
            checked={smsEnabled}
            onChange={() => setSmsEnabled((v) => !v)}
          />
          <Row
            label="In-App Alerts"
            checked={inApp}
            onChange={() => setInApp((v) => !v)}
          />
        </ul>
      </div>

      <div className="flex justify-end">
        <button className="rounded-md bg-[#A57865] px-5 py-2 text-sm font-medium text-white hover:opacity-90">
          Save Preferences
        </button>
      </div>
    </div>
  );
}

/* -------- Shared Row with Toggle -------- */
function Row({
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
