'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import { appointmentsAPI } from '@/services/api';

interface UserAppointment {
  _id: string;
  patient: {
    name: string;
    email: string;
  };
  doctor: {
    user: {
      name: string;
    };
    specialization: string;
  };
  appointmentDate: string;
  appointmentTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  type: 'in-person' | 'video' | 'phone';
  reason: string;
}

export default function UserAppointmentsTable() {
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<UserAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUserAppointments();
  }, []);

  const fetchUserAppointments = async () => {
    try {
      console.log('🔍 Fetching user appointments...');
      
      const response = await appointmentsAPI.getUserAppointments();
      
      if (response.success) {
        setAppointments(response.data.appointments || []);
        console.log('✅ User appointments loaded:', response.data.appointments);
      } else {
        throw new Error(response.message || 'Failed to load appointments');
      }
    } catch (error) {
      console.error('❌ Error fetching user appointments:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to load appointments';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelAppointment = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to cancel this appointment?')) return;
    
    try {
      console.log('❌ Cancelling appointment:', appointmentId);
      
      const response = await appointmentsAPI.cancel(appointmentId);
      
      if (response.success) {
        showToast('Appointment cancelled successfully', 'success');
        
        // Update local state
        setAppointments(prev => prev.map(apt => 
          apt._id === appointmentId ? { ...apt, status: 'cancelled' } : apt
        ));
        
        console.log('✅ Appointment cancelled successfully');
      } else {
        throw new Error(response.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      console.error('❌ Error cancelling appointment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to cancel appointment';
      showToast(errorMessage, 'error');
    }
  };

  const handleRescheduleAppointment = async (appointmentId: string) => {
    try {
      console.log('🔄 Rescheduling appointment:', appointmentId);
      
      // For now, just show a message - reschedule functionality can be added later
      showToast('Reschedule feature coming soon', 'info');
      
      console.log('✅ Reschedule request sent');
    } catch (error) {
      console.error('❌ Error rescheduling appointment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to reschedule appointment';
      showToast(errorMessage, 'error');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-[#1F2B6C] mb-4">My Appointments</h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {appointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">No appointments found.</td>
              </tr>
            ) : (
              appointments.map((appt) => (
                <tr key={appt._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {appt.doctor.user.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{appt.appointmentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{appt.appointmentTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap capitalize">{appt.type}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      appt.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : appt.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : appt.status === "cancelled"
                        ? "bg-red-100 text-red-800"
                        : "bg-blue-100 text-blue-800"
                    }`}>
                      {appt.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{appt.reason}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button 
                      onClick={() => handleRescheduleAppointment(appt._id)}
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      disabled={appt.status === 'cancelled'}
                    >
                      Reschedule
                    </button>
                    <button 
                      onClick={() => handleCancelAppointment(appt._id)}
                      className="text-red-600 hover:text-red-900"
                      disabled={appt.status === 'cancelled'}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
} 