'use client';

import React, { useState } from 'react';
import { UserGroupIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { doctorsAPI } from '@/services/api';

interface Doctor {
  _id: string;
  name: string;
  email: string;
  specialization: string;
  experience: number;
  isActive: boolean;
  rating: {
    average: number;
    count: number;
  };
}

const SPECIALIZATIONS = [
  'Cardiology',
  'Neurology',
  'Orthopedics',
  'Dermatology',
  'Pediatrics',
  'General Medicine',
];

export default function DoctorsList() {
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [status, setStatus] = useState('');
  const [minExp, setMinExp] = useState('');
  const [maxExp, setMaxExp] = useState('');

  React.useEffect(() => {
    setLoading(true);
    setError(null);
    doctorsAPI.getAll()
      .then(res => {
        const docs = res.data?.doctors || res.data || res.doctors || [];
        setDoctors(docs);
      })
      .catch(err => {
        setError(err.message || 'Failed to fetch doctors');
      })
      .finally(() => setLoading(false));
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const name = doctor.name || doctor.user?.name || '';
    const email = doctor.email || doctor.user?.email || '';
    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialization = specialization ? doctor.specialization === specialization : true;
    const matchesStatus = status ? (status === 'active' ? doctor.isActive : !doctor.isActive) : true;
    const matchesMinExp = minExp ? (doctor.experience || 0) >= parseInt(minExp) : true;
    const matchesMaxExp = maxExp ? (doctor.experience || 0) <= parseInt(maxExp) : true;
    return matchesSearch && matchesSpecialization && matchesStatus && matchesMinExp && matchesMaxExp;
  });
  console.log("filteredDoctors",filteredDoctors);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-red-500 py-8">{error}</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <h2 className="text-lg font-medium text-gray-900">All Doctors</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={specialization}
            onChange={e => setSpecialization(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Specializations</option>
            {SPECIALIZATIONS.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <input
            type="number"
            min={0}
            placeholder="Min Exp"
            value={minExp}
            onChange={e => setMinExp(e.target.value)}
            className="border rounded px-2 py-1 w-20 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            min={0}
            placeholder="Max Exp"
            value={maxExp}
            onChange={e => setMaxExp(e.target.value)}
            className="border rounded px-2 py-1 w-20 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Doctor
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Specialization
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Experience
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredDoctors.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-400">No doctors found.</td>
              </tr>
            ) : (filteredDoctors &&
              filteredDoctors.map((doctor) => (
                <tr key={doctor._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <UserGroupIcon className="h-10 w-10 text-gray-400" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-500">{doctor.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.specialization}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {doctor.experience} years
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      doctor.isActive 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {doctor.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-blue-600 hover:text-blue-900">
                        <EyeIcon className="h-4 w-4" />
                      </button>
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <PencilIcon className="h-4 w-4" />
                      </button>
                      <button className="text-red-600 hover:text-red-900">
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