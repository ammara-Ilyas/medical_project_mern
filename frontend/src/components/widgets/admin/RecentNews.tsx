'use client';

import React from 'react';
import { NewspaperIcon, EyeIcon } from '@heroicons/react/24/outline';

const recentNews = [
  {
    id: '1',
    title: 'New Medical Breakthrough in Cardiology',
    category: 'Medical Research',
    views: 1234,
    publishedDate: '3 hours ago'
  },
  {
    id: '2',
    title: 'Hospital Expansion Plans Announced',
    category: 'Hospital News',
    views: 856,
    publishedDate: '1 day ago'
  },
  {
    id: '3',
    title: 'Tips for Better Heart Health',
    category: 'Health Tips',
    views: 2341,
    publishedDate: '2 days ago'
  }
];

export default function RecentNews() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Recent News</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {recentNews.map((news) => (
          <div key={news.id} className="px-6 py-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <NewspaperIcon className="h-10 w-10 text-gray-400" />
              </div>
              <div className="ml-4 flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2">{news.title}</p>
                    <p className="text-sm text-gray-500">{news.category}</p>
                  </div>
                  <div className="flex items-center ml-4">
                    <EyeIcon className="h-4 w-4 text-gray-400" />
                    <span className="ml-1 text-sm text-gray-500">{news.views}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">Published {news.publishedDate}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 