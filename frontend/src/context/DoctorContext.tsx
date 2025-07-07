"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

export type Doctor = {
  name: string;
  specialty: string;
  image: string;
  linkedin: string;
  facebook: string;
  twitter: string;
};

type DoctorContextType = {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
};

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const useDoctorContext = () => {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error('useDoctorContext must be used within DoctorProvider');
  return ctx;
};

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    fetch('/data/doctors.json')
      .then((res) => res.json())
      .then((data) => setDoctors(data));
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, setDoctors }}>
      {children}
    </DoctorContext.Provider>
  );
}; 