'use client';

import React from 'react';
import { UserGroupIcon, NewspaperIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';

const stats = [
  {
    name: 'Total Doctors',
    value: '24',
    change: '+12%',
    changeType: 'increase',
    icon: UserGroupIcon,
    color: 'bg-blue-500'
  },
  {
    name: 'Total Patients',
    value: '1,234',
    change: '+8%',
    changeType: 'increase',
    icon: CalendarIcon,
    color: 'bg-green-500'
  },
  {
    name: 'News Articles',
    value: '45',
    change: '+15%',
    changeType: 'increase',
    icon: NewspaperIcon,
    color: 'bg-purple-500'
  },
  {
    name: 'Revenue',
    value: '$45,678',
    change: '+23%',
    changeType: 'increase',
    icon: CurrencyDollarIcon,
    color: 'bg-yellow-500'
  }
];

export default function AdminStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6 text-white" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.name}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </div>
          <div className="mt-4">
            <span className={`text-sm font-medium ${
              stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
            }`}>
              {stat.change}
            </span>
            <span className="text-sm text-gray-500 ml-1">from last month</span>
          </div>
        </div>
      ))}
    </div>
  );
} 