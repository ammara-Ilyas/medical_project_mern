'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/context/UserContext';

export default function AdminHeader() {
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center text-xl font-bold text-blue-900 tracking-wide">
            <span className="text-blue-900">MEDD</span><span className="text-blue-500">ICAL</span>
            <span className="ml-2 text-base font-semibold text-gray-900">Center</span>
          </Link>
          <span className="text-gray-400">|</span>
          <span className="text-sm text-gray-600">Admin Panel</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-2 text-gray-400 hover:text-gray-600 relative focus:outline-none"
              onClick={() => setShowDropdown((prev) => !prev)}
            >
              <BellIcon className="h-6 w-6" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded z-50 p-4 border">
                <div className="text-gray-700">No notifications yet.</div>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <UserCircleIcon className="h-8 w-8 text-gray-400" />
            <div className="text-sm">
              <p className="font-medium text-gray-900">{user?.name || 'Admin User'}</p>
              <p className="text-gray-500">{user?.email || 'admin@medical.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 