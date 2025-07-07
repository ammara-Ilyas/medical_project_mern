"use client"
import React, { useState } from "react";
import CategoryForm from "./CategoryForm";
import CategoryTable from "./CategoryTable";

// Define Category type
interface Category {
  _id: string;
  name: string;
}

export default function NewsCategoriesPage() {
  const [editCategory, setEditCategory] = useState<Category | null>(null);
  const [refresh, setRefresh] = useState(false);

  // When a category is edited, setEditCategory will be called
  // When a category is added/edited/deleted, setRefresh(!refresh) to reload table

  return (
    <div className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6 text-blue-900">Manage News Categories</h1>
      <CategoryForm
        editCategory={editCategory}
        onDone={() => {
          setEditCategory(null);
          setRefresh((r) => !r);
        }}
      />
      <div className="mt-8">
        <CategoryTable
          onEdit={setEditCategory}
          refresh={refresh}
        />
      </div>
    </div>
  );
} 