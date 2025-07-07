"use client"
import React from "react";
import { useNewsContext } from "@/context/NewsContext";
import NewsCard from "./NewsCard";

const NewsList: React.FC = () => {
  const { news, totalPages, currentPage, setPage, loading, error } = useNewsContext();

  return (
    <div>
      {loading && <div className="text-center py-8">Loading...</div>}
      {error && <div className="text-center text-red-500 py-8">{error}</div>}
      {!loading && !error && (
        <>
          <div className="flex flex-col gap-6">
            {news.length === 0 && <div className="text-center text-gray-500">No news found.</div>}
            {news.map((item) => (
              <NewsCard key={item._id} news={item} />
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              className={`px-4 py-2 rounded font-semibold border border-blue-500 text-blue-500 transition ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"}`}
              onClick={() => setPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-sm text-gray-700">
              Page {currentPage} of {totalPages}
            </span>
            <button
              className={`px-4 py-2 rounded font-semibold border border-blue-500 text-blue-500 transition ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-50"}`}
              onClick={() => setPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NewsList; 