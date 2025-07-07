import React from "react";
import Link from "next/link";

interface NewsCardProps {
  news: {
    _id: string;
    title: string;
    description: string;
    image: string;
    categories: string[];
    date: string;
    author: string;
    commentsCount: number;
    likesCount: number;
    // Add more fields if needed
  };
}

const NewsCard: React.FC<NewsCardProps> = ({ news }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4">
      <div className="md:w-48 w-full flex-shrink-0">
        <img
          src={news.image}
          alt={news.title}
          className="w-full h-32 md:h-40 object-cover rounded-md"
        />
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <div className="flex flex-wrap gap-2 mb-2">
            {news.categories.map((cat) => (
              <span
                key={cat}
                className="bg-blue-400 text-white text-xs px-2 py-0.5 rounded-full font-semibold"
              >
                {cat}
              </span>
            ))}
          </div>
          <h2 className="text-lg md:text-xl font-bold text-blue-900 mb-1 leading-tight">
            {news.title}
          </h2>
          <div className="flex items-center text-xs text-gray-500 gap-4 mb-2">
            <span>{news.date}</span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" className="inline"><circle cx="7" cy="7" r="7"/></svg>
              {news.commentsCount} Comments
            </span>
            <span className="flex items-center gap-1">
              <svg width="14" height="14" fill="currentColor" className="inline"><circle cx="7" cy="7" r="7"/></svg>
              {news.likesCount} Likes
            </span>
            <span>By {news.author}</span>
          </div>
          <p className="text-gray-600 mb-2 line-clamp-2">{news.description}</p>
        </div>
        <div>
          <Link
            href={`/news/${news._id}`}
            className="text-blue-500 hover:underline text-sm font-semibold"
          >
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCard; 