"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store";
import { languages, getTranslation } from "../../locales";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  FaChartBar,
  FaUsers,
  FaDollarSign,
  FaClipboardList,
  FaBook,
} from "react-icons/fa";
import axios from "../../api/axios";

// Dashboard data hooks
type Summary = {
  properties: number;
  units: number;
  tenants: number;
  leases: number;
  payments: number;
  totalRent: number;
  paidRent: number;
  occupancyRate: number;
};

export default function DashboardPage() {
  const t = getTranslation(languages[0].code);

  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }
  }, [user, router]);

  // Dashboard data state
  const [summary, setSummary] = useState<Summary | null>(null);
  const [usersByMonth, setUsersByMonth] = useState<
    { month: string; users: number }[]
  >([]);
  const [paymentsByMonth, setPaymentsByMonth] = useState<
    { month: string; payments: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDashboardData() {
      setLoading(true);
      setError(null);
      try {
        const [summaryRes, usersRes, paymentsRes] = await Promise.all([
          axios.get("/api/reports/summary"),
          axios.get("/api/reports/users-by-month"),
          axios.get("/api/reports/payments-by-month"),
        ]);
        setSummary(summaryRes.data);
        setUsersByMonth(usersRes.data);
        setPaymentsByMonth(paymentsRes.data);
      } catch (err: unknown) {
        if (
          err &&
          typeof err === "object" &&
          "response" in err &&
          err.response &&
          typeof err.response === "object" &&
          "data" in err.response &&
          err.response.data &&
          typeof err.response.data === "object" &&
          "message" in err.response.data
        ) {
          setError(
            (err.response as { data: { message?: string } }).data.message ||
              "Failed to load dashboard data"
          );
        } else {
          setError("Failed to load dashboard data");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchDashboardData();
  }, []);

  if (!user) {
    return null;
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        Loading dashboard...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-[#f5f7fa] font-['Montserrat',Arial,Helvetica,sans-serif]">
      <Sidebar role={user.role} />

      <div className="flex-1 flex flex-col min-h-screen">
        <Navbar user={user} />

        {/* Stat cards */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaChartBar className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalOrganization}
              </span>
              <span className="text-2xl font-bold text-blue-900">
                {summary?.properties ?? 0}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaUsers className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalSubscription}
              </span>
              <span className="text-2xl font-bold text-blue-900">
                {summary?.tenants ?? 0}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaDollarSign className="text-3xl text-blue-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalTransaction}
              </span>
              <span className="text-2xl font-bold text-blue-900">
                {summary?.payments ?? 0}
              </span>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-row items-center gap-4 min-h-[110px] border border-blue-100">
            <FaDollarSign className="text-3xl text-green-600" />
            <div>
              <span className="text-gray-500 text-xs mb-1 block">
                {t.totalIncome}
              </span>
              <span className="text-2xl font-bold text-green-900">
                ${summary?.paidRent ?? 0}
              </span>
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
            <div className="h-56 flex items-center justify-center bg-blue-50 rounded">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={usersByMonth}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="users" fill="#2563eb" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border border-blue-100">
            <span className="font-semibold text-gray-700 mb-2 block">
              {t.paymentsByMonth}
            </span>
            <div className="h-56 flex items-center justify-center bg-blue-50 rounded">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={paymentsByMonth}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="payments"
                    fill="#059669"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
