"use client";
import React from "react";
import { languages, getTranslation } from "../../locales";

import Image from "next/image";
import Link from "next/link";
import {
  FaUsers,
  FaChartBar,
  FaBook,
  FaClipboardList,
  FaCog,
  FaGift,
  FaDollarSign,
  FaUserCircle,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";

export default function DashboardPage() {
  const [open, setOpen] = React.useState({
    pricing: false,
    coupons: false,
    settings: false,
  });
  type OpenKey = keyof typeof open;
  const toggle = (key: OpenKey) => setOpen((o) => ({ ...o, [key]: !o[key] }));

  // Sidebar collapse state
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  // Language dropdown state
  const [langOpen, setLangOpen] = React.useState(false);
  const [selectedLang, setSelectedLang] = React.useState(languages[0].code);
  const [userDropdown, setUserDropdown] = React.useState(false);
  const t = getTranslation(selectedLang);

  // Example user (replace with real user from state)
  const user = { name: "Super Admin", role: "super admin" };
  return (
    <div className="min-h-screen flex bg-[#f5f7fa] font-['Montserrat',Arial,Helvetica,sans-serif]">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarCollapsed ? "w-20" : "w-64"
        } bg-white text-[#222] flex flex-col min-h-screen shadow-lg border-r border-gray-100 transition-all duration-200`}
      >
        <div
          className={`flex items-center gap-2 px-6 py-6 border-b border-gray-100 ${
            sidebarCollapsed ? "justify-center" : ""
          }`}
        >
          <Image
            src="/assets/images/logo/logo.png"
            alt="Logo"
            width={40}
            height={40}
          />
          {!sidebarCollapsed && (
            <span className="font-bold text-lg tracking-wide">theeme-logo</span>
          )}
        </div>
        <nav className="flex-1 py-6">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 px-6 py-2 rounded transition font-medium bg-blue-50 text-blue-700 ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaChartBar className="text-lg" />
                {!sidebarCollapsed && t.dashboard}
              </Link>
            </li>
            <li>
              <Link
                href="/users"
                className={`flex items-center gap-3 px-6 py-2 rounded transition hover:bg-gray-100 ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaUsers className="text-lg" />
                {!sidebarCollapsed && t.users}
              </Link>
            </li>
            {!sidebarCollapsed && (
              <li className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase">
                {t.businessManagement}
              </li>
            )}
            <li>
              <Link
                href="/contact-diary"
                className={`flex items-center gap-3 px-6 py-2 rounded transition hover:bg-gray-100 ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaBook className="text-lg" />
                {!sidebarCollapsed && t.contactDiary}
              </Link>
            </li>
            <li>
              <Link
                href="/notice-board"
                className={`flex items-center gap-3 px-6 py-2 rounded transition hover:bg-gray-100 ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaClipboardList className="text-lg" />
                {!sidebarCollapsed && t.noticeBoard}
              </Link>
            </li>
            {!sidebarCollapsed && (
              <li className="px-6 pt-4 pb-1 text-xs font-bold text-gray-400 uppercase">
                {t.systemSettings}
              </li>
            )}
            <li>
              <button
                onClick={() => toggle("pricing")}
                className={`flex items-center gap-3 px-6 py-2 w-full rounded transition hover:bg-gray-100 font-medium ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaDollarSign className="text-lg" />
                {!sidebarCollapsed && t.pricing}
                {!sidebarCollapsed && (
                  <span className="ml-auto">{open.pricing ? "▾" : "▸"}</span>
                )}
              </button>
              {!sidebarCollapsed && open.pricing && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/packages"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.packages}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/transactions"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.transactions}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => toggle("coupons")}
                className={`flex items-center gap-3 px-6 py-2 w-full rounded transition hover:bg-gray-100 font-medium ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaGift className="text-lg" />
                {!sidebarCollapsed && t.coupons}
                {!sidebarCollapsed && (
                  <span className="ml-auto">{open.coupons ? "▾" : "▸"}</span>
                )}
              </button>
              {!sidebarCollapsed && open.coupons && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/coupons/all"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.allCoupon}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/coupons/history"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.couponHistory}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
            <li>
              <button
                onClick={() => toggle("settings")}
                className={`flex items-center gap-3 px-6 py-2 w-full rounded transition hover:bg-gray-100 font-medium ${
                  sidebarCollapsed ? "justify-center px-0" : ""
                }`}
              >
                <FaCog className="text-lg" />
                {!sidebarCollapsed && t.settings}
                {!sidebarCollapsed && (
                  <span className="ml-auto">{open.settings ? "▾" : "▸"}</span>
                )}
              </button>
              {!sidebarCollapsed && open.settings && (
                <ul className="ml-10 mt-1 space-y-1">
                  <li>
                    <Link
                      href="/settings/account"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.accountSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/password"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.passwordSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/general"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.generalSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/email"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.emailSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/payment"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.paymentSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/seo"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.siteSeoSetting}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/settings/recaptcha"
                      className="block px-2 py-1 text-sm hover:underline"
                    >
                      {t.recaptchaSetting}
                    </Link>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
        {/* Remove logout from sidebar for topbar dropdown */}
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="w-full bg-white shadow flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            {/* Sidebar collapse button */}
            <button
              className="p-2 rounded hover:bg-gray-100 border border-gray-200"
              onClick={() => setSidebarCollapsed((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <svg
                width="20"
                height="20"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            {/* Language dropdown */}
            <div className="relative">
              <button
                className="border border-gray-200 rounded px-3 py-1 text-sm flex items-center gap-2 bg-white"
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
              >
                {languages.find((l) => l.code === selectedLang)?.label}
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {langOpen && (
                <ul
                  className="absolute left-0 mt-1 w-40 bg-white border border-gray-200 rounded shadow z-10 max-h-60 overflow-auto"
                  role="listbox"
                >
                  {languages.map((lang) => (
                    <li
                      key={lang.code}
                      className={`px-4 py-2 text-sm hover:bg-blue-50 cursor-pointer ${
                        selectedLang === lang.code
                          ? "bg-blue-100 font-semibold"
                          : ""
                      }`}
                      onClick={() => {
                        setSelectedLang(lang.code);
                        setLangOpen(false);
                      }}
                      role="option"
                      aria-selected={selectedLang === lang.code}
                    >
                      {lang.label}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 relative">
            <button
              className="flex items-center gap-2 px-2 py-1 rounded hover:bg-gray-100 focus:outline-none"
              onClick={() => setLangOpen(false)}
              onBlur={() => setUserDropdown(false)}
              tabIndex={0}
              onFocus={() => setUserDropdown(true)}
              onClickCapture={() => setUserDropdown((v) => !v)}
            >
              <FaUserCircle className="text-2xl text-blue-700" />
              <div className="flex flex-col items-start text-left">
                <span className="font-semibold text-sm">{user.name}</span>
                <span className="text-xs text-gray-400">{user.role}</span>
              </div>
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {userDropdown && (
              <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-20">
                <li className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2">
                  <FaUser className="text-blue-600" /> {t.settings}
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2 text-red-600"
                  onClick={() => {
                    /* handle logout */
                  }}
                >
                  <FaSignOutAlt /> {t.logout}
                </li>
              </ul>
            )}
          </div>
        </header>

        {/* Stat cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaChartBar className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalOrganization}
              </span>
              <span className="text-2xl font-bold text-blue-900">1</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaUsers className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalSubscription}
              </span>
              <span className="text-2xl font-bold text-blue-900">1</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaDollarSign className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalTransaction}
              </span>
              <span className="text-2xl font-bold text-blue-900">0</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaDollarSign className="text-3xl text-green-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalIncome}
              </span>
              <span className="text-2xl font-bold text-green-900">$0</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaClipboardList className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalNotes}
              </span>
              <span className="text-2xl font-bold text-blue-900">0</span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaBook className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalContact}
              </span>
              <span className="text-2xl font-bold text-blue-900">0</span>
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-8">
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <span className="font-semibold text-gray-700 mb-2 block">
              {t.usersByMonth}
            </span>
            <div className="h-56 flex items-center justify-center text-gray-400 bg-blue-50 rounded">
              [Chart Placeholder]
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <span className="font-semibold text-gray-700 mb-2 block">
              {t.paymentsByMonth}
            </span>
            <div className="h-56 flex items-center justify-center text-gray-400 bg-blue-50 rounded">
              [Chart Placeholder]
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
