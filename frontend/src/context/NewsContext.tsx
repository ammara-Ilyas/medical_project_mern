"use client";
import React, { createContext, useContext, useEffect, useState } from "react";

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/news`;
console.log("url",API_URL);
export interface NewsItem {
  _id: string;
  title: string;
  description: string;
  image: string;
  categories: string[];
  date: string;
  author: string;
  commentsCount: number;
  likesCount: number;
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
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
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
    fetchNews();
  }, [currentPage]);

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
    <NewsContext.Provider value={{ news: filteredNews, totalPages, currentPage, setPage, loading, error, search, setSearch }}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNewsContext = () => {
  const ctx = useContext(NewsContext);
  if (!ctx) throw new Error("useNewsContext must be used within NewsProvider");
  return ctx;
}; 