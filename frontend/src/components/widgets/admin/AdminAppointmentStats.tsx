'use client';

import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, CheckCircleIcon, XCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

interface AppointmentStats {
  total: number;
  pending: number;
  confirmed: number;
  completed: number;
  cancelled: number;
  today: number;
}

interface Appointment {
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  appointmentDate: string;
  // ...other fields
}

interface AdminAppointmentStatsProps {
  initialAppointments?: Appointment[];
}

export default function AdminAppointmentStats({ initialAppointments }: AdminAppointmentStatsProps) {
  const [stats, setStats] = useState<AppointmentStats>({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    today: 0
  });
  const [isLoading, setIsLoading] = useState(!initialAppointments);

  useEffect(() => {
    if (initialAppointments) {
      // Calculate stats from initialAppointments
      const todayStr = new Date().toISOString().slice(0, 10);
      const total = initialAppointments.length;
      const pending = initialAppointments.filter(a => a.status === 'pending').length;
      const confirmed = initialAppointments.filter(a => a.status === 'confirmed').length;
      const completed = initialAppointments.filter(a => a.status === 'completed').length;
      const cancelled = initialAppointments.filter(a => a.status === 'cancelled').length;
      const today = initialAppointments.filter(a => a.appointmentDate === todayStr).length;
      setStats({ total, pending, confirmed, completed, cancelled, today });
      setIsLoading(false);
      return;
    }
    // TODO: Replace with actual API call
    const fetchStats = async () => {
      try {
        console.log('🔍 Fetching appointment stats...');
        
        // Mock data for now
        const mockStats = {
          total: 156,
          pending: 23,
          confirmed: 45,
          completed: 78,
          cancelled: 10,
          today: 12
        };
        
        console.log('📊 Appointment Stats Response:', mockStats);
        
        setTimeout(() => {
          setStats(mockStats);
          setIsLoading(false);
          console.log('✅ Appointment stats loaded successfully');
        }, 500);
      } catch (error) {
        console.error('❌ Error fetching appointment stats:', error);
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [initialAppointments]);

  const statCards = [
    {
      name: 'Total Appointments',
      value: stats.total,
      icon: CalendarIcon,
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      name: 'Today',
      value: stats.today,
      icon: ClockIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Pending',
      value: stats.pending,
      icon: ExclamationTriangleIcon,
      color: 'bg-yellow-500',
      textColor: 'text-yellow-600'
    },
    {
      name: 'Confirmed',
      value: stats.confirmed,
      icon: CheckCircleIcon,
      color: 'bg-purple-500',
      textColor: 'text-purple-600'
    },
    {
      name: 'Completed',
      value: stats.completed,
      icon: CheckCircleIcon,
      color: 'bg-green-500',
      textColor: 'text-green-600'
    },
    {
      name: 'Cancelled',
      value: stats.cancelled,
      icon: XCircleIcon,
      color: 'bg-red-500',
      textColor: 'text-red-600'
    }
  ];

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {statCards.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center">
            <div className={`p-2 rounded-lg ${stat.color}`}>
              <stat.icon className="h-5 w-5 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
} 