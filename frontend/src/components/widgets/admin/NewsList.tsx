'use client';

import React, { useState, useEffect } from 'react';
import { NewspaperIcon, PencilIcon, TrashIcon, EyeIcon, CalendarIcon } from '@heroicons/react/24/outline';

interface News {
  id: string;
  title: string;
  category: string;
  author: string;
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  publishedDate: string;
}

export default function NewsList() {
  const [news, setNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data for now
    const mockNews: News[] = [
      {
        id: '1',
        title: 'New Medical Breakthrough in Cardiology',
        category: 'Medical Research',
        author: 'Dr. John Smith',
        isPublished: true,
        isFeatured: true,
        views: 1234,
        publishedDate: '2024-01-15'
      },
      {
        id: '2',
        title: 'Hospital Expansion Plans Announced',
        category: 'Hospital News',
        author: 'Admin',
        isPublished: true,
        isFeatured: false,
        views: 856,
        publishedDate: '2024-01-14'
      },
      {
        id: '3',
        title: 'Tips for Better Heart Health',
        category: 'Health Tips',
        author: 'Dr. Sarah Johnson',
        isPublished: false,
        isFeatured: false,
        views: 0,
        publishedDate: ''
      }
    ];
    
    setTimeout(() => {
      setNews(mockNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">All News Articles</h2>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Article
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Author
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Views
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
            {news.map((article) => (
              <tr key={article.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <NewspaperIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900 max-w-xs truncate">
                        {article.title}
                      </div>
                      <div className="text-sm text-gray-500">
                        {article.isPublished ? (
                          <span className="flex items-center">
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {article.publishedDate}
                          </span>
                        ) : (
                          'Draft'
                        )}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {article.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {article.author}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <EyeIcon className="h-4 w-4 text-gray-400 mr-1" />
                    <span className="text-sm text-gray-900">{article.views}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex flex-col space-y-1">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      article.isPublished 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {article.isPublished ? 'Published' : 'Draft'}
                    </span>
                    {article.isFeatured && (
                      <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
                        Featured
                      </span>
                    )}
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
                    <button className="text-red-600 hover:text-red-900">
                      <TrashIcon className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 