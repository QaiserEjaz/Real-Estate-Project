"use client";
// import { useSelector } from "react-redux";
// import type { RootState } from "../../store";
import Image from "next/image";
import { FaChartBar } from "react-icons/fa";

export default function DashboardPage() {
  // const user = useSelector((state: RootState) => state.auth.user);

  // if (!user) {
  //   return <div className="p-8">Please login to view your dashboard.</div>;
  // }

  return (
    <div className="min-h-screen w-full bg-[#f5f7fa] font-['Montserrat',Arial,Helvetica,sans-serif]">
      <section className="container mx-auto py-16 px-4">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
          <div>
            <h1 className="text-4xl font-extrabold text-blue-700 mb-4 flex items-center gap-2">
              <FaChartBar className="text-blue-600 text-3xl" /> Dashboard
            </h1>
            <p className="text-lg text-gray-700 mb-6 max-w-xl">
              Property management dashboard overview: statistics, recent
              activity, and quick access to all modules.
            </p>
          </div>
          <div className="flex items-center gap-6">
            <Image
              src="/assets/images/landing/1.png"
              alt="Dashboard"
              width={220}
              height={120}
              className="rounded shadow-lg"
            />
          </div>
        </div>
        {/* Example stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-blue-700 mb-2">12</span>
            <span className="text-gray-600">Properties</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-blue-700 mb-2">8</span>
            <span className="text-gray-600">Tenants</span>
          </div>
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center hover:scale-105 transition-transform">
            <span className="text-2xl font-bold text-blue-700 mb-2">5</span>
            <span className="text-gray-600">Leases</span>
          </div>
        </div>
        {/* Recent activity table placeholder */}
        <div className="bg-white rounded-lg shadow p-8">
          <h2 className="text-2xl font-bold text-blue-700 mb-6">
            Recent Activity
          </h2>
          <table className="w-full text-left">
            <thead>
              <tr>
                <th className="py-2 px-4 text-gray-600">Date</th>
                <th className="py-2 px-4 text-gray-600">Activity</th>
                <th className="py-2 px-4 text-gray-600">User</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t">
                <td className="py-2 px-4">2025-07-28</td>
                <td className="py-2 px-4">Added new property</td>
                <td className="py-2 px-4">Admin</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">2025-07-27</td>
                <td className="py-2 px-4">Lease renewed</td>
                <td className="py-2 px-4">Manager</td>
              </tr>
              <tr className="border-t">
                <td className="py-2 px-4">2025-07-26</td>
                <td className="py-2 px-4">Tenant payment received</td>
                <td className="py-2 px-4">Tenant</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
