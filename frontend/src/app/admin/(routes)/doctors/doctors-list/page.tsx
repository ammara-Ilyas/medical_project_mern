import React from 'react';
import DoctorsList from '@/components/widgets/admin/DoctorsList';
import AddDoctorButton from '@/components/widgets/admin/AddDoctorButton';

export default function DoctorsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Doctors</h1>
        <AddDoctorButton />
      </div>
      
      <DoctorsList />
    </div>
  );
} 