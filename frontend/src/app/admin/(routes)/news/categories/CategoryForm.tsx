"use client";

import React, { useEffect, useState } from "react";

interface CategoryFormProps {
  editCategory: { _id: string; name: string } | null;
  onDone: () => void;
}

const API_URL = `${process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL : "http://localhost:5000"}/api/categories`;
const CategoryForm: React.FC<CategoryFormProps> = ({ editCategory, onDone }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
    } else {
      setName("");
    }
    setError("");
    setSuccess("");
  }, [editCategory]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(
        editCategory ? `${API_URL}/${editCategory._id}` : API_URL,
        {
          method: editCategory ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name }),
        }
      );
      if (!res.ok) throw new Error("Failed to save category");
      setSuccess(editCategory ? "Category updated!" : "Category added!");
      setName("");
      onDone();
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-end">
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {editCategory ? "Edit Category" : "Add Category"}
        </label>
        <input
          type="text"
          className="w-full border rounded px-3 py-2 focus:outline-blue-400"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          maxLength={50}
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded font-semibold disabled:opacity-50"
        disabled={loading || !name.trim()}
      >
        {loading ? "Saving..." : editCategory ? "Update" : "Add"}
      </button>
      {error && <span className="text-red-500 ml-2 text-sm">{error}</span>}
      {success && <span className="text-green-600 ml-2 text-sm">{success}</span>}
    </form>
  );
};

export default CategoryForm; 