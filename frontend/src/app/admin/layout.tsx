import React from 'react';
import AdminSidebar from '@/components/widgets/admin/AdminSidebar';
import AdminHeader from '@/components/widgets/admin/AdminHeader';
import RouteProgressBar from '@/components/widgets/admin/RouteProgressBar';
import PageTransition from '@/components/widgets/admin/PageTransition';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouteProgressBar />
      <AdminHeader />
      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-6">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
} 