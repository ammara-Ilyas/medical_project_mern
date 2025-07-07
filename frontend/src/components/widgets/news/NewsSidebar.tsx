"use client";
import React, { useRef, useState } from "react";
import { useNewsContext } from "@/context/NewsContext";

const RecentPosts: React.FC = () => {
  const { news } = useNewsContext();
  // Sort by date descending (assuming ISO string)
  const sorted = [...news].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const top5 = sorted.slice(0, 5);
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Recent Posts</h3>
      <ul className="space-y-2">
        {top5.map((item) => (
          <li key={item._id} className="flex gap-2 items-center">
            <img src={item.image} alt={item.title} className="w-10 h-10 object-cover rounded" />
            <a href={`/news/${item._id}`} className="text-sm text-blue-900 hover:underline line-clamp-2">{item.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

const CategoriesWidget: React.FC = () => {
  const [categories, setCategories] = useState<{ _id: string; name: string }[]>([]);
  React.useEffect(() => {
    fetch(process.env.NEXT_PUBLIC_API_URL + "/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data));
  }, []);
  return (
    <div>
      <h3 className="font-bold text-lg mb-2">Categories</h3>
      <ul className="space-y-2">
        {categories.map((cat) => (
          <li key={cat._id} className="flex items-center justify-between">
            <span>{cat.name}</span>
            <span className="bg-blue-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold">•</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const NewsSidebar: React.FC = () => {
  const { search, setSearch } = useNewsContext();
  const [showInput, setShowInput] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleIconClick = () => {
    setShowInput((v) => !v);
    setTimeout(() => inputRef.current?.focus(), 100);
  };
  const handleBlur = () => setShowInput(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowInput(false);
  };

  return (
    <aside className="w-full md:w-80 flex-shrink-0">
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="mb-6">
          <div className="relative">
            {!showInput && (
              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-900"
                onClick={handleIconClick}
                aria-label="Open search"
              >
                <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            )}
            {showInput && (
              <form onSubmit={handleSubmit}>
                <input
                  ref={inputRef}
                  type="text"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  onBlur={handleBlur}
                  placeholder="Search news..."
                  className="w-full border rounded px-3 py-2 pr-10 focus:outline-blue-400"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-900"
                  aria-label="Search"
                >
                  <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                </button>
              </form>
            )}
          </div>
        </div>
        <RecentPosts />
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <CategoriesWidget />
      </div>
    </aside>
  );
};

export default NewsSidebar; 