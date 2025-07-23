'use client';

import React, { useState, useEffect } from 'react';
import { useToast } from '@/context/ToastContext';
import PaymentForm from '@/components/widgets/payment/PaymentForm';
import { appointmentsAPI, doctorsAPI } from '@/services/api';

interface AppointmentFormData {
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  doctorId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentType: 'in-person' | 'video' | 'phone';
  reason: string;
  notes: string;
}

interface Doctor {
  _id: string;
  user: {
    name: string;
  };
  specialization: string;
  consultationFee: number;
}

export default function AppointmentForm() {
  const { showToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [appointmentId, setAppointmentId] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<AppointmentFormData>({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    doctorId: '',
    appointmentDate: '',
    appointmentTime: '',
    appointmentType: 'in-person',
    reason: '',
    notes: ''
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      console.log('👨‍⚕️ Fetching doctors...');
      const response = await doctorsAPI.getAll();
      
      if (response.success) {
        setDoctors(response.data.doctors || []);
        console.log('✅ Doctors loaded:', response.data.doctors);
      }
    } catch (error) {
      console.error('❌ Error fetching doctors:', error);
      showToast('Failed to load doctors', 'error');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update selected doctor when doctor is changed
    if (name === 'doctorId') {
      const doctor = doctors.find(d => d._id === value);
      setSelectedDoctor(doctor || null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('📅 Creating appointment:', formData);

      const response = await appointmentsAPI.create(formData);
      
      if (response.success) {
        setAppointmentId(response.data._id);
        showToast('Appointment created successfully! Please complete payment.', 'success');
        setShowPayment(true);
        console.log('✅ Appointment created successfully:', response.data);
      } else {
        throw new Error(response.message || 'Failed to create appointment');
      }
    } catch (error) {
      console.error('❌ Error creating appointment:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to create appointment';
      showToast(errorMessage, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log('💰 Payment successful:', paymentData);
    showToast('Payment completed! Your appointment is confirmed.', 'success');
    
    // Reset form
    setFormData({
      patientName: '',
      patientEmail: '',
      patientPhone: '',
      doctorId: '',
      appointmentDate: '',
      appointmentTime: '',
      appointmentType: 'in-person',
      reason: '',
      notes: ''
    });
    setShowPayment(false);
    setAppointmentId('');
    setSelectedDoctor(null);
  };

  const handlePaymentError = (error: string) => {
    console.error('❌ Payment failed:', error);
    showToast(`Payment failed: ${error}`, 'error');
  };

  const consultationFee = selectedDoctor?.consultationFee || 1500;

  if (showPayment) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-[#1F2B6C] mb-6">Complete Payment</h2>
        <PaymentForm
          amount={consultationFee}
          appointmentId={appointmentId}
          patientId="patient_123" // TODO: Get from user context
          onPaymentSuccess={handlePaymentSuccess}
          onPaymentError={handlePaymentError}
        />
        <button
          onClick={() => setShowPayment(false)}
          className="mt-4 w-full bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition-colors"
        >
          Back to Appointment Form
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-[#1F2B6C] mb-6">Book Appointment</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Patient Name *
          </label>
          <input
            type="text"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email *
          </label>
          <input
            type="email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Phone Number *
          </label>
          <input
            type="tel"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Select Doctor *
          </label>
          <select
            name="doctorId"
            value={formData.doctorId}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Choose a doctor</option>
            {doctors.map(doctor => (
              <option key={doctor._id} value={doctor._id}>
                {doctor.user.name} - {doctor.specialization}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Date *
            </label>
            <input
              type="date"
              name="appointmentDate"
              value={formData.appointmentDate}
              onChange={handleInputChange}
              required
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Appointment Time *
            </label>
            <input
              type="time"
              name="appointmentTime"
              value={formData.appointmentTime}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Appointment Type *
          </label>
          <select
            name="appointmentType"
            value={formData.appointmentType}
            onChange={handleInputChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="in-person">In-Person</option>
            <option value="video">Video Call</option>
            <option value="phone">Phone Call</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reason for Visit *
          </label>
          <textarea
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            required
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Additional Notes
          </label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleInputChange}
            rows={2}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-700">Consultation Fee:</span>
            <span className="text-xl font-bold text-blue-600">₨{consultationFee.toLocaleString()}</span>
          </div>
          {selectedDoctor && (
            <p className="text-sm text-gray-600 mt-1">
              Dr. {selectedDoctor.user.name} - {selectedDoctor.specialization}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-[#1F2B6C] text-white py-3 px-4 rounded-lg font-medium hover:bg-[#159EEC] disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Creating Appointment...
            </div>
          ) : (
            'Book Appointment'
          )}
        </button>
      </form>
    </div>
  );
} 