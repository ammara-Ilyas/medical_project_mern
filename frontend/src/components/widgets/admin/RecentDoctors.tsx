'use client';

import React from 'react';
import { UserGroupIcon, StarIcon } from '@heroicons/react/24/outline';

const recentDoctors = [
  {
    id: '1',
    name: 'Dr. John Smith',
    specialization: 'Cardiology',
    rating: 4.8,
    joinedDate: '2 days ago'
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    specialization: 'Neurology',
    rating: 4.9,
    joinedDate: '1 week ago'
  },
  {
    id: '3',
    name: 'Dr. Michael Brown',
    specialization: 'Orthopedics',
    rating: 4.7,
    joinedDate: '2 weeks ago'
  }
];

export default function RecentDoctors() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent Doctors</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {recentDoctors.map((doctor) => (
          <div key={doctor.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <UserGroupIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-500">{doctor.specialization}</p>
                  </div>
                  <div className="flex items-center">
                    <StarIcon className="h-4 w-4 text-yellow-400" />
                    <span className="ml-1 text-sm text-gray-900">{doctor.rating}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Joined {doctor.joinedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 