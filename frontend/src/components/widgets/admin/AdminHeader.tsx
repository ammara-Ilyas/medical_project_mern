'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BellIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useUser } from '@/context/UserContext';

export default function AdminHeader() {
  const { user } = useUser();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-[#1F2B6C] border-2 shadow-sm border-b border-blue-700 fixed top-0 left-0 w-full h-16 z-40 lg:pl-64 flex items-center">
      <div className="flex items-center justify-between px-6 w-full ">
        <div className="flex items-center space-x-4">
          <Link href="/admin" className="flex items-center text-xl font-bold text-white tracking-wide">
            <span className="text-white">MEDD</span><span className="text-[#159EEC]">ICAL</span>
            <span className="ml-2 text-base font-semibold text-white">Admin</span>
          </Link>
          <span className="text-blue-300">|</span>
          <span className="text-sm text-blue-100">Admin Panel</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <button
              className="p-2 text-blue-100 hover:text-white relative focus:outline-none"
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
            <UserCircleIcon className="h-8 w-8 text-blue-100" />
            <div className="text-sm">
              <p className="font-medium text-white">{user?.name || 'Admin User'}</p>
              <p className="text-blue-100">{user?.email || 'admin@medical.com'}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 