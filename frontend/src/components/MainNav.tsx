"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import Image from "next/image";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "/icons/dashboard.svg" },
  { href: "/properties", label: "Properties", icon: "/icons/properties.svg" },
  { href: "/tenants", label: "Tenants", icon: "/icons/tenants.svg" },
  { href: "/leases", label: "Leases", icon: "/icons/leases.svg" },
  { href: "/payments", label: "Payments", icon: "/icons/payments.svg" },
  {
    href: "/maintenance",
    label: "Maintenance",
    icon: "/icons/maintenance.svg",
  },
  { href: "/documents", label: "Documents", icon: "/icons/documents.svg" },
  {
    href: "/notifications",
    label: "Notifications",
    icon: "/icons/notifications.svg",
  },
  { href: "/reports", label: "Reports", icon: "/icons/reports.svg" },
  { href: "/settings", label: "Settings", icon: "/icons/settings.svg" },
  { href: "/expenses", label: "Expenses", icon: "/icons/expenses.svg" },
];

export default function MainNav() {
  const user = useSelector((state: RootState) => state.auth.user);
  return (
    <nav
      className="bg-white border-b border-gray-200 px-8 py-4 flex items-center shadow-sm custom-container"
      style={{
        fontFamily: "Montserrat, Arial, Helvetica, sans-serif",
        backgroundColor: "#f0f0f5",
      }}
    >
      <div className="flex gap-8 items-center">
        <Image
          src="/herointro.jpg"
          alt="Logo"
          width={48}
          height={48}
          className="mr-4 rounded"
        />
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-2 text-gray-700 font-semibold hover:text-blue-600 transition"
          >
            <Image src={item.icon} alt={item.label} width={22} height={22} />
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
      <div className="ml-auto flex items-center gap-3">
        {user && (
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded text-sm font-semibold">
            {user.name} ({user.role})
          </span>
        )}
        <span className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center ml-2">
          <Image
            src="/avatar-placeholder.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </span>
      </div>
    </nav>
  );
}
