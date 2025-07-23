'use client';

import React, { useState, useEffect } from 'react';
import { CalendarIcon, ClockIcon, UserIcon, EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useToast } from '@/context/ToastContext';

interface Appointment {
  id: string;
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
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled' | 'no-show';
  type: 'in-person' | 'video' | 'phone';
  reason: string;
  payment: {
    amount: number;
    status: 'pending' | 'paid' | 'refunded';
  };
}

interface AdminAppointmentsTableProps {
  initialAppointments?: Appointment[];
}

const STATUS_OPTIONS = ['pending', 'confirmed', 'completed', 'cancelled', 'no-show'];
const TYPE_OPTIONS = ['in-person', 'video', 'phone'];

export default function AdminAppointmentsTable({ initialAppointments }: AdminAppointmentsTableProps) {
  const { showToast } = useToast();
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments || []);
  const [isLoading, setIsLoading] = useState(!initialAppointments);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    if (initialAppointments) {
      setAppointments(initialAppointments);
      setIsLoading(false);
    }
  }, [initialAppointments]);

  // Filter logic
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = 
      appointment.patient.name.toLowerCase().includes(search.toLowerCase()) ||
      appointment.patient.email.toLowerCase().includes(search.toLowerCase()) ||
      appointment.doctor.user.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter ? appointment.status === statusFilter : true;
    const matchesType = typeFilter ? appointment.type === typeFilter : true;
    const matchesDate = dateFilter ? appointment.appointmentDate === dateFilter : true;
    
    return matchesSearch && matchesStatus && matchesType && matchesDate;
  });

  // Log filtered results
  useEffect(() => {
    console.log('🔍 Filtered Appointments:', {
      search,
      statusFilter,
      typeFilter,
      dateFilter,
      total: appointments.length,
      filtered: filteredAppointments.length,
      results: filteredAppointments
    });
  }, [search, statusFilter, typeFilter, dateFilter, appointments, filteredAppointments]);

  const handleStatusUpdate = async (appointmentId: string, newStatus: string) => {
    try {
      console.log('🔄 Updating appointment status:', { appointmentId, newStatus });
      
      // TODO: Replace with actual API call
      console.log(`📡 API Call: PUT /api/appointments/${appointmentId}`, { status: newStatus });
      
      showToast('Appointment status updated successfully', 'success');
      
      // Update local state
      setAppointments(prev => prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus as any } : apt
      ));
      
      console.log('✅ Appointment status updated successfully');
    } catch (error) {
      console.error('❌ Error updating appointment status:', error);
      showToast('Failed to update appointment status', 'error');
    }
  };

  const handleDelete = async (appointmentId: string) => {
    if (!confirm('Are you sure you want to delete this appointment?')) return;
    
    try {
      console.log('🗑️ Deleting appointment:', appointmentId);
      
      // TODO: Replace with actual API call
      console.log(`📡 API Call: DELETE /api/appointments/${appointmentId}`);
      
      showToast('Appointment deleted successfully', 'success');
      
      // Update local state
      setAppointments(prev => prev.filter(apt => apt.id !== appointmentId));
      
      console.log('✅ Appointment deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting appointment:', error);
      showToast('Failed to delete appointment', 'error');
    }
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      'no-show': 'bg-gray-100 text-gray-800'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  const getPaymentBadge = (status: string) => {
    const styles = {
      pending: 'bg-yellow-100 text-yellow-800',
      paid: 'bg-green-100 text-green-800',
      refunded: 'bg-gray-100 text-gray-800'
    };
    return styles[status as keyof typeof styles] || styles.pending;
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      {/* Filter/Search Bar */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-lg font-medium text-gray-900">All Appointments</h2>
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="Search patient, doctor..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Status</option>
              {STATUS_OPTIONS.map(status => (
                <option key={status} value={status}>{status.charAt(0).toUpperCase() + status.slice(1)}</option>
              ))}
            </select>
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {TYPE_OPTIONS.map(type => (
                <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
              ))}
            </select>
            <input
              type="date"
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="border rounded px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredAppointments.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-8 text-gray-400">No appointments found.</td>
              </tr>
            ) : (
              filteredAppointments.map((appointment) => (
                <tr key={appointment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <UserIcon className="h-8 w-8 text-gray-400" />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{appointment.patient.name}</div>
                        <div className="text-sm text-gray-500">{appointment.patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{appointment.doctor.user.name}</div>
                      <div className="text-sm text-gray-500">{appointment.doctor.specialization}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <CalendarIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-900">{appointment.appointmentDate}</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <ClockIcon className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm text-gray-500">{appointment.appointmentTime}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="capitalize text-sm text-gray-900">{appointment.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={appointment.status}
                      onChange={(e) => handleStatusUpdate(appointment.id, e.target.value)}
                      className={`text-xs font-semibold rounded-full px-2 py-1 border-0 ${getStatusBadge(appointment.status)}`}
                    >
                      {STATUS_OPTIONS.map(status => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getPaymentBadge(appointment.payment.status)}`}>
                        {appointment.payment.status}
                      </span>
                      <div className="text-sm text-gray-500">${appointment.payment.amount}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(appointment.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="h-4 w-4" />
                      </button>
                    </div>
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