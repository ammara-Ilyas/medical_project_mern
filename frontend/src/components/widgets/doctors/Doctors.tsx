"use client"
import { useDoctorContext } from '@/context/DoctorContext';
import React from 'react'
import DoctorCard from '../home/miniWidgets/DoctorCard';

const Doctors = () => {
    const { doctors } = useDoctorContext();

  return (
     <section className="container mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold text-blue-900 text-center mb-8">Our Doctors</h1>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {doctors.map((doc, idx) => (
        <DoctorCard key={idx} doc={doc} />
      ))}
    </div>
  </section>
  )
}

export default Doctors