"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";

interface Category {
  _id: string;
  name: string;
}

interface CategoryTableProps {
  onEdit: (cat: Category) => void;
  refresh: boolean;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/categories`;

const CategoryTable: React.FC<CategoryTableProps> = ({ onEdit, refresh }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { token } = useUser();

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(API_URL, { headers });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch categories");
      }
      const data = await res.json();
      setCategories(data);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
    // eslint-disable-next-line
  }, [refresh, token]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Delete this category?")) return;
    setLoading(true);
    setError("");
    try {
      const headers: Record<string, string> = { "Content-Type": "application/json" };
      if (token) {
        headers["Authorization"] = `Bearer ${token}`;
      }

      const res = await fetch(`${API_URL}/${id}`, { 
        method: "DELETE",
        headers
      });
      
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete category");
      }
      
      fetchCategories();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading && <div className="text-center py-4">Loading...</div>}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}
      <table className="w-full border mt-2">
        <thead>
          <tr className="bg-blue-50">
            <th className="py-2 px-4 text-left">Name</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((cat) => (
            <tr key={cat._id} className="border-b">
              <td className="py-2 px-4">{cat.name}</td>
              <td className="py-2 px-4 flex gap-2 justify-center">
                <button
                  className="text-blue-600 hover:underline text-sm"
                  onClick={() => onEdit(cat)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline text-sm"
                  onClick={() => handleDelete(cat._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {categories.length === 0 && !loading && (
            <tr>
              <td colSpan={2} className="text-center text-gray-500 py-4">
                No categories found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable; 