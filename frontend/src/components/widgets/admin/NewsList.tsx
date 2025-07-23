'use client';

import React, { useState } from 'react';
import { NewspaperIcon, PencilIcon, TrashIcon, EyeIcon, CalendarIcon } from '@heroicons/react/24/outline';
import { useNewsContext } from '@/context/NewsContext';
import AddNewsButton from './AddNewsButton';

const CATEGORIES = [
  'Medical Research',
  'Hospital News',
  'Health Tips',
  'Events',
  'Announcements',
];

export default function NewsList() {
  const { news, loading, error, deleteNews } = useNewsContext();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [minViews, setMinViews] = useState('');
  const [maxViews, setMaxViews] = useState('');

  // Stats
  
  const totalNews = news.length;
  const published = news.filter(n => n.isPublished).length;
  const drafts = news.filter(n => !n.isPublished).length;
  const totalViews = news.reduce((sum, n) => sum + (n.views || 0), 0);

  // Filter logic
  const filteredNews = news.filter(article => {
    const matchesSearch =
      article.title.toLowerCase().includes(search.toLowerCase()) ||
      (article.author?.toLowerCase().includes(search.toLowerCase()) ?? false);
    const matchesCategory = category ? article.category === category : true;
    const matchesStatus = status ? (status === 'published' ? article.isPublished : !article.isPublished) : true;
    const matchesMinViews = minViews ? (article.views || 0) >= parseInt(minViews) : true;
    const matchesMaxViews = maxViews ? (article.views || 0) <= parseInt(maxViews) : true;
    return matchesSearch && matchesCategory && matchesStatus && matchesMinViews && matchesMaxViews;
  });

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
      <div className="flex justify-end px-6 pt-6">
        <AddNewsButton />
      </div>
      <h2 className="text-lg font-medium text-gray-900 px-6 pt-2">Manage News</h2>
      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-6 pt-6">
        <div className="bg-blue-50 rounded-lg p-4 flex flex-col items-center">
          <span className="text-xs text-blue-700 font-semibold">Total News</span>
          <span className="text-2xl font-bold text-blue-900">{totalNews}</span>
        </div>
        <div className="bg-green-50 rounded-lg p-4 flex flex-col items-center">
          <span className="text-xs text-green-700 font-semibold">Published</span>
          <span className="text-2xl font-bold text-green-900">{published}</span>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4 flex flex-col items-center">
          <span className="text-xs text-yellow-700 font-semibold">Drafts</span>
          <span className="text-2xl font-bold text-yellow-900">{drafts}</span>
        </div>
        <div className="bg-purple-50 rounded-lg p-4 flex flex-col items-center">
          <span className="text-xs text-purple-700 font-semibold">Total Views</span>
          <span className="text-2xl font-bold text-purple-900">{totalViews}</span>
        </div>
      </div>
      {/* Filter/Search Bar */}
      <div className="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between gap-4 mt-4">
        <h2 className="text-lg font-medium text-gray-900">All News Articles</h2>
        <div className="flex flex-wrap gap-2 items-center">
          <input
            type="text"
            placeholder="Search title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <select
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Categories</option>
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={status}
            onChange={e => setStatus(e.target.value)}
            className="border rounded px-2 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <input
            type="number"
            min={0}
            placeholder="Min Views"
            value={minViews}
            onChange={e => setMinViews(e.target.value)}
            className="border rounded px-2 py-1 w-20 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="number"
            min={0}
            placeholder="Max Views"
            value={maxViews}
            onChange={e => setMaxViews(e.target.value)}
            className="border rounded px-2 py-1 w-20 text-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
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
            {filteredNews.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center py-8 text-gray-400">No news articles found.</td>
              </tr>
            ) : (
              filteredNews.map((article) => (
                <tr key={article._id || article.id} className="hover:bg-gray-50">
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
                      <span className="text-sm text-gray-900">{article.views || 0}</span>
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
                      <button
                        className="text-red-600 hover:text-red-900"
                        onClick={() => {
                          if (article._id && window.confirm('Are you sure you want to delete this news article?')) {
                            deleteNews(article._id);
                          }
                        }}
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