'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';

interface NewsFormData {
  title: string;
  content: string;
  summary: string;
  category: string; // This will now be ObjectId
  tags: string[];
  image: File | null;
  isPublished: boolean;
  isFeatured: boolean;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
}

interface Category {
  _id: string;
  name: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/news`;
const CATEGORIES_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/categories`;

export default function AddNewsForm() {
  const router = useRouter();
  const { token } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<NewsFormData>({
    title: '',
    content: '',
    summary: '',
    category: '', // Will be set to first category's ObjectId
    tags: [],
    image: null,
    isPublished: false,
    isFeatured: false,
    seoTitle: '',
    seoDescription: '',
    seoKeywords: []
  });

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(CATEGORIES_URL);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          // Set default category to first category's ObjectId
          if (data.length > 0 && !formData.category) {
            setFormData(prev => ({ ...prev, category: data[0]._id }));
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag);
    setFormData(prev => ({
      ...prev,
      tags
    }));
  };

  const handleKeywordsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const keywords = e.target.value.split(',').map(keyword => keyword.trim()).filter(keyword => keyword);
    setFormData(prev => ({
      ...prev,
      seoKeywords: keywords
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      // Add text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('summary', formData.summary);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('isPublished', formData.isPublished.toString());
      formDataToSend.append('isFeatured', formData.isFeatured.toString());
      formDataToSend.append('seoTitle', formData.seoTitle);
      formDataToSend.append('seoDescription', formData.seoDescription);
      
      // Add arrays
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      formDataToSend.append('seoKeywords', JSON.stringify(formData.seoKeywords));
      
      // Add image file if selected
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const headers: Record<string, string> = {};
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const response = await fetch(API_URL, {
        method: 'POST',
        headers,
        body: formDataToSend,
      });

      if (response.ok) {
        router.push('/admin/news');
        router.refresh();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to add news');
      }
    } catch (error: any) {
      console.error('Error adding news:', error);
      alert(error.message || 'Failed to add news. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow">
        {/* Basic Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Article Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              maxLength={200}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Summary</label>
            <textarea
              name="summary"
              value={formData.summary}
              onChange={handleInputChange}
              rows={3}
              maxLength={500}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              rows={10}
              required
              maxLength={10000}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category and Tags */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              {categories.length === 0 ? (
                <option value="">Loading categories...</option>
              ) : (
                categories.map(category => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))
              )}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={handleTagsChange}
              placeholder="health, medical, wellness"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Article Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-sm text-gray-500">
            Supported formats: JPG, PNG, GIF. Max size: 5MB
          </p>
          {formData.image && (
            <div className="mt-2">
              <p className="text-sm text-green-600">✓ {formData.image.name} selected</p>
            </div>
          )}
        </div>

        {/* Publishing Options */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">Publishing Options</h3>
          
          <div className="flex items-center space-x-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="isPublished"
                checked={formData.isPublished}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Publish immediately</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="isFeatured"
                checked={formData.isFeatured}
                onChange={handleInputChange}
                className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-700">Featured article</span>
            </label>
          </div>
        </div>

        {/* SEO Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-medium text-gray-900">SEO Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Title</label>
            <input
              type="text"
              name="seoTitle"
              value={formData.seoTitle}
              onChange={handleInputChange}
              maxLength={60}
              placeholder="SEO optimized title (max 60 characters)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Description</label>
            <textarea
              name="seoDescription"
              value={formData.seoDescription}
              onChange={handleInputChange}
              rows={3}
              maxLength={160}
              placeholder="SEO description for search engines (max 160 characters)"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">SEO Keywords (comma-separated)</label>
            <input
              type="text"
              value={formData.seoKeywords.join(', ')}
              onChange={handleKeywordsChange}
              placeholder="medical, health, doctor, hospital"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? 'Adding...' : 'Add Article'}
          </button>
        </div>
      </form>
    </div>
  );
} 