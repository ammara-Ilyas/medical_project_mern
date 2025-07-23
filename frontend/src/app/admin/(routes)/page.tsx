import React from 'react';
import AdminHeader from '@/components/widgets/admin/AdminHeader';
import AdminStats from '@/components/widgets/admin/AdminStats';
import RecentDoctors from '@/components/widgets/admin/RecentDoctors';
import RecentNews from '@/components/widgets/admin/RecentNews';
import Link from 'next/link';

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4 justify-end mb-6">
          <Link href="/admin/doctors/add-doctor" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
            + Add Doctor
          </Link>
          <Link href="/admin/news/add-news" className="inline-flex items-center px-4 py-2 bg-purple-600 text-white font-semibold rounded-lg shadow hover:bg-purple-700 transition">
            + Add News
          </Link>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Area: Stats + Chart */}
          <div className="lg:col-span-2 space-y-8">
            <AdminStats />
          </div>
          {/* Sidebar: Recent Doctors & News */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <RecentDoctors />
            </div>
            <div className="bg-white rounded-xl shadow-lg p-6">
              <RecentNews />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 