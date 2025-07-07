import React from 'react';
import NewsList from '@/components/widgets/admin/NewsList';
import AddNewsButton from '@/components/widgets/admin/AddNewsButton';

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Manage News</h1>
        <AddNewsButton />
      </div>
      
      <NewsList />
    </div>
  );
} 