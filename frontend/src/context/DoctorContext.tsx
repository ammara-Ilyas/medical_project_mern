"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { doctorsAPI } from "@/services/api";
import { log } from "console";

export type Doctor = {
  _id?: string;
  name: string;
  specialization: string;
  experience?: number;
  email?: string;
  phone?: string;
  avatar?: string;
  licenseNumber?: string;
  consultationFee?: number;
  isActive?: boolean;
  // Add other fields as needed
};

// Add a type for doctor creation input matching the API
export type DoctorCreateInput = {
  name: string;
  specialization: string;
  experience: string;
  fees: number;
  availableDays: string[];
  availableSlots: { date: string; slots: string[] }[];
  // Add other required fields as needed
};

interface DoctorContextType {
  doctors: Doctor[];
  loading: boolean;
  error: string | null;
  fetchDoctors: () => Promise<void>;
  getDoctorById: (id: string) => Promise<Doctor | null>;
  createDoctor: (data: DoctorCreateInput | FormData) => Promise<Doctor | null>;
  updateDoctor: (id: string, data: Partial<Doctor> | FormData) => Promise<Doctor | null>;
  deleteDoctor: (id: string) => Promise<boolean>;
}

const DoctorContext = createContext<DoctorContextType | undefined>(undefined);

export const useDoctorContext = () => {
  const ctx = useContext(DoctorContext);
  if (!ctx) throw new Error('useDoctorContext must be used within DoctorProvider');
  return ctx;
};

export const DoctorProvider = ({ children }: { children: React.ReactNode }) => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await doctorsAPI.getAll();
      // API may return { success, data } or just array
      console.log("Res in doctors",res)
      const docs = res.data?.doctors || res.data || res.doctors || [];
      console.log("docs in doctors",docs)
      setDoctors(docs);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch doctors');
    } finally {
      setLoading(false);
    }
  };

  const getDoctorById = async (id: string): Promise<Doctor | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await doctorsAPI.getById(id);
      return res.data || res.doctor || null;
    } catch (err: any) {
      setError(err.message || 'Failed to fetch doctor');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createDoctor = async (data: DoctorCreateInput | FormData): Promise<Doctor | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await doctorsAPI.create(data);
      await fetchDoctors();
      return res.data || res.doctor || null;
    } catch (err: any) {
      setError(err.message || 'Failed to create doctor');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateDoctor = async (id: string, data: Partial<Doctor> | FormData): Promise<Doctor | null> => {
    setLoading(true);
    setError(null);
    try {
      const res = await doctorsAPI.update(id, data);
      await fetchDoctors();
      return res.data || res.doctor || null;
    } catch (err: any) {
      setError(err.message || 'Failed to update doctor');
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteDoctor = async (id: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      await doctorsAPI.delete(id);
      await fetchDoctors();
      return true;
    } catch (err: any) {
      setError(err.message || 'Failed to delete doctor');
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <DoctorContext.Provider value={{ doctors, loading, error, fetchDoctors, getDoctorById, createDoctor, updateDoctor, deleteDoctor }}>
      {children}
    </DoctorContext.Provider>
  );
}; 