import React from 'react';
import AddDoctorForm from '@/components/widgets/admin/AddDoctorForm';

export default function AddDoctorPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Add New Doctor</h1>
      </div>
      
      <AddDoctorForm />
    </div>
  );
} 