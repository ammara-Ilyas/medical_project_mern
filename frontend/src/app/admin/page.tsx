import React from 'react';
import AdminStats from '@/components/widgets/admin/AdminStats';
import RecentDoctors from '@/components/widgets/admin/RecentDoctors';
import RecentNews from '@/components/widgets/admin/RecentNews';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome back, Admin!</p>
      </div>

      <AdminStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDoctors />
        <RecentNews />
      </div>
    </div>
  );
} 