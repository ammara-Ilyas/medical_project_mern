"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { newsAPI } from '@/services/api';

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/news`;
console.log("url",API_URL);
export interface NewsItem {
  _id: string;
  id?: string; // for compatibility
  title: string;
  description?: string;
  image?: string;
  category?: string;
  author?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
  views?: number;
  publishedDate?: string;
  tags?: string[];
  commentsCount?: number;
  likesCount?: number;
}

interface NewsContextType {
  news: NewsItem[];
  totalPages: number;
  currentPage: number;
  setPage: (page: number) => void;
  loading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  createNews: (data: any) => Promise<void>;
  updateNews: (id: string, data: any) => Promise<void>;
  deleteNews: (id: string) => Promise<void>;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_URL}?page=${currentPage}&limit=4`);
      if (!res.ok) throw new Error("Failed to fetch news");
      const data = await res.json();
      setNews(data.news || []);
      setTotalPages(data.totalPages || 1);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [currentPage]);

  const createNews = async (data: any) => {
    setLoading(true);
    setError(null);
    try {
      await newsAPI.create(data);
      await fetchNews();
    } catch (err: any) {
      setError(err.message || 'Failed to create news');
    } finally {
      setLoading(false);
    }
  };

  const updateNews = async (id: string, data: any) => {
    setLoading(true);
    setError(null);
    try {
      await newsAPI.update(id, data);
      await fetchNews();
    } catch (err: any) {
      setError(err.message || 'Failed to update news');
    } finally {
      setLoading(false);
    }
  };

  const deleteNews = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      await newsAPI.delete(id);
      await fetchNews();
    } catch (err: any) {
      setError(err.message || 'Failed to delete news');
    } finally {
      setLoading(false);
    }
  };

  // Filter news by search term (title)
  const filteredNews = search
    ? news.filter((item) =>
        item.title.toLowerCase().includes(search.toLowerCase())
      )
    : news;

  const setPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <NewsContext.Provider value={{ news: filteredNews, totalPages, currentPage, setPage, loading, error, search, setSearch, createNews, updateNews, deleteNews }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNewsContext must be used within NewsProvider");
  return ctx;
}; 