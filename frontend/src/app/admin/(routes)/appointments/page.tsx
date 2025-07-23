import React from 'react';
import AdminAppointmentStats from '@/components/widgets/admin/AdminAppointmentStats';
import AdminAppointmentsTable from '@/components/widgets/admin/AdminAppointmentsTable';

export const metadata = {
  title: "Manage Appointments | MEDDICAL Admin",
  description: "Admin panel for managing all hospital appointments, scheduling, and patient care coordination.",
};

export default async function AdminAppointmentsPage() {
  // Server-side fetch appointments
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/appointments`, {
    cache: "no-store"
  });
  const appointments = await res.json();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage all hospital appointments</p>
        </div>
      </div>

      {/* Stats Cards */}
      <AdminAppointmentStats initialAppointments={appointments} />
      
      {/* Appointments Table */}
      <AdminAppointmentsTable initialAppointments={appointments} />
    </div>
  );
} 