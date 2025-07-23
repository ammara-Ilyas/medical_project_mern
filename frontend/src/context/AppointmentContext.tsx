"use client"
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
// Removed axios import

// Appointment type definition (customize as needed)
export interface Appointment {
  _id: string;
  doctor: string;
  user: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  [key: string]: any;
}

interface AppointmentContextType {
  appointments: Appointment[];
  loading: boolean;
  error: string | null;
  fetchAppointments: (filters?: any) => Promise<void>;
  createAppointment: (data: Partial<Appointment>) => Promise<void>;
  updateAppointment: (id: string, data: Partial<Appointment>) => Promise<void>;
  deleteAppointment: (id: string) => Promise<void>;
  getAvailableTimes: (doctorId: string, date: string) => Promise<string[]>;
  filters: any;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

const AppointmentContext = createContext<AppointmentContextType | undefined>(undefined);

export const useAppointmentContext = () => {
  const ctx = useContext(AppointmentContext);
  if (!ctx) throw new Error('useAppointmentContext must be used within AppointmentProvider');
  return ctx;
};

export const AppointmentProvider = ({ children }: { children: ReactNode }) => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<any>({});

  // Fetch appointments (optionally with filters)
  const fetchAppointments = async (filters = {}) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams(filters as any).toString();
      const res = await fetch(`/api/appointments${params ? '?' + params : ''}`);
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      setAppointments(data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  // Create appointment
  const createAppointment = async (data: Partial<Appointment>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const newAppointment = await res.json();
      setAppointments(prev => [...prev, newAppointment]);
    } catch (err: any) {
      setError(err.message || 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  // Update appointment
  const updateAppointment = async (id: string, data: Partial<Appointment>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error(await res.text());
      const updated = await res.json();
      setAppointments(prev => prev.map(a => (a._id === id ? updated : a)));
    } catch (err: any) {
      setError(err.message || 'Failed to update appointment');
    } finally {
      setLoading(false);
    }
  };

  // Delete appointment
  const deleteAppointment = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/appointments/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await res.text());
      setAppointments(prev => prev.filter(a => a._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete appointment');
    } finally {
      setLoading(false);
    }
  };

  // Get available times for a doctor on a date (excluding already booked slots)
  const getAvailableTimes = async (doctorId: string, date: string): Promise<string[]> => {
    try {
      const res = await fetch(`/api/appointments/available-times?doctorId=${doctorId}&date=${date}`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.times;
    } catch (err) {
      return [];
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchAppointments(filters);
    // eslint-disable-next-line
  }, [JSON.stringify(filters)]);

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        error,
        fetchAppointments,
        createAppointment,
        updateAppointment,
        deleteAppointment,
        getAvailableTimes,
        filters,
        setFilters,
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}; 