"use client"
import React, { useState } from 'react';
import DoctorsList from './DoctorsList';
import AddDoctorButton from './AddDoctorButton';
import AddDoctorForm from './AddDoctorForm';

export default function DoctorsManager() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage Doctors</h1>
        <AddDoctorButton  />
      </div>
      <DoctorsList />
     
    </div>
  );
} 