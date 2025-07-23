"use client"
import { useDoctorContext } from '@/context/DoctorContext';
import React from 'react'
import DoctorCard from '../home/miniWidgets/DoctorCard';

const Doctors = () => {
    const { doctors, loading, error } = useDoctorContext();

  if (loading) return <div className="text-center py-8">Loading doctors...</div>;
  if (error) return <div className="text-center text-red-500 py-8">{error}</div>;

  return (
     <section className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Our Doctors</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {doctors.map((doc, idx) => {
        const docItem = {
          name: doc.name,
          image: doc.avatar || '/images/home/doctor_01.png',
          specialty: doc.specialization || 'General',
          linkedin: '#',
          facebook: '#',
          twitter: '#',
        };
        return <DoctorCard key={idx} doc={docItem} />;
      })}
    </div>
  </section>
  )
}

export default Doctors