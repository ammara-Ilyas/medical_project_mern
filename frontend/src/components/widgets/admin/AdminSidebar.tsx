'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  UserGroupIcon,
  NewspaperIcon,
  CalendarIcon,
  CogIcon,
  ChartBarIcon,
  WrenchScrewdriverIcon
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Doctors', href: '/admin/doctors/doctors-list', icon: UserGroupIcon },
  { name: 'Services', href: '/admin/services', icon: WrenchScrewdriverIcon },
  { name: 'Appointments', href: '/admin/appointments', icon: CalendarIcon },
  { name: 'News', href: '/admin/news/news-list', icon: NewspaperIcon },
  { name: 'News Category', href: '/admin/news/categories', icon: NewspaperIcon },
  { name: 'Analytics', href: '/admin/analytics', icon: ChartBarIcon },
  { name: 'Settings', href: '/admin/settings', icon: CogIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 bg-white shadow-lg lg:fixed lg:top-16 lg:left-0 lg:z-30 lg:h-[calc(100vh-4rem)] lg:overflow-y-auto min-h-screen">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Panel</h2>
      </div>

      <nav className="mt-6">
        <div className="px-3 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 ease-in-out transform hover:scale-105
                  ${isActive
                    ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg border-r-4 border-blue-700'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900 hover:shadow-md'
                  }
                `}
              >
                <item.icon
                  className={`
                    mr-3 h-5 w-5 transition-transform duration-200
                    ${isActive ? 'scale-110' : 'group-hover:scale-110'}
                  `}
                  aria-hidden="true"
                />
                <span className="transition-all duration-200">
                  {item.name}
                </span>
                {isActive && (
                  <div className="ml-auto w-2 h-2 bg-white rounded-full animate-pulse"></div>
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
} 