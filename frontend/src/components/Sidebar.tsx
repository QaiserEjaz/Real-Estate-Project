import React from "react";
import Link from "next/link";
import {
  FaHome,
  FaWrench,
  FaFileInvoice,
  FaBook,
  FaClipboardList,
  FaBuilding,
} from "react-icons/fa";
import Image from "next/image";

interface SidebarProps {
  role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ role }) => {
  // Example: role-based menu config
  const menu = [
    {
      label: "Dashboard",
      icon: <FaHome />,
      href: "/dashboard",
    },
    {
      label: "Staff Management",
      children: [{ label: "Users", href: "/users" }],
      show: ["admin", "manager"].includes(role),
    },
    {
      label: "Business Management",
      children: [
        { label: "Tenants", href: "/tenants" },
        { label: "Maintainers", href: "/maintainers" },
      ],
      show: ["admin", "manager"].includes(role),
    },
    {
      label: "Real Estate",
      icon: <FaBuilding />,
      children: [
        { label: "Properties", href: "/properties" },
        { label: "Units", href: "/units" },
      ],
    },
    {
      label: "Maintenance",
      icon: <FaWrench />,
      children: [
        { label: "All Requests", href: "/maintenance" },
        { label: "Pending", href: "/maintenance/pending" },
        { label: "In Progress", href: "/maintenance/in-progress" },
      ],
    },
    {
      label: "Finance",
      icon: <FaFileInvoice />,
      children: [
        { label: "Invoices", href: "/finance/invoices" },
        { label: "Expense", href: "/finance/expense" },
      ],
    },
    {
      label: "Contact Diary",
      icon: <FaBook />,
      href: "/contact-diary",
    },
    {
      label: "Notice Board",
      icon: <FaClipboardList />,
      href: "/notice-board",
    },
    {
      label: "Setup",
      children: [{ label: "Types", href: "/setup/types" }],
    },
  ];

  return (
    <aside className="sidebar bg-white min-h-screen w-64 p-4 border-r">
      <div className="mb-8 flex items-center gap-2">
        <Image
          src="/assets/images/logo/logo.png"
          alt="Logo"
          width={32}
          height={32}
        />
        <span className="font-bold text-lg tracking-wide">theme-logo</span>
      </div>
      <nav>
        <ul className="space-y-2">
          {menu.map((item, idx) => {
            if (item.show === false) return null;
            if (item.children) {
              return (
                <li key={idx}>
                  <div className="font-semibold text-gray-700 flex items-center gap-2 mb-1">
                    {item.icon}
                    {item.label}
                  </div>
                  <ul className="ml-6 space-y-1">
                    {item.children.map((child, cidx) => (
                      <li key={cidx}>
                        <Link
                          href={child.href}
                          className="text-gray-600 hover:text-blue-700"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              );
            }
            return (
              <li key={idx}>
                <Link
                  href={item.href || "#"}
                  className="flex items-center gap-2 text-gray-700 font-semibold hover:text-blue-700"
                >
                  {item.icon}
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
