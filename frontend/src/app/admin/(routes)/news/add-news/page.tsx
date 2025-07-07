import React from 'react';
import AddNewsForm from '@/components/widgets/admin/AddNewsForm';

export default function AddNewsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Add New Article</h1>
      </div>
      
      <AddNewsForm />
    </div>
  );
} 