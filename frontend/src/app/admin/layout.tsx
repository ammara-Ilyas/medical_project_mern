import React from 'react';
import AdminSidebar from '@/components/widgets/admin/AdminSidebar';
import AdminHeader from '@/components/widgets/admin/AdminHeader';
import RouteProgressBar from '@/components/widgets/admin/RouteProgressBar';
import PageTransition from '@/components/widgets/admin/PageTransition';
import { ToastProvider } from '@/context/ToastContext';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ToastProvider>
      <div className="min-h-screen relative bg-gray-50">
        <RouteProgressBar />
        <AdminHeader />
        <div>
          <AdminSidebar />
          <main className="flex-1 ml-6 p-6 pl-64">
            <PageTransition>
              {children}
            </PageTransition>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
} 