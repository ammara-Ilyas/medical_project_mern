import { useNewsContext } from "@/context/NewsContext";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function NewsDetailPage() {
  const params = useParams();
  const { id } = params;
  const { news } = useNewsContext();

  // Find current news item
  const currentIndex = news.findIndex((item) => String(item._id) === String(id));
  const currentNews = news[currentIndex];

  if (!currentNews) {
    return <div className="container mx-auto py-12 px-4">News not found.</div>;
  }

  // Get previous and next news IDs
  const prevNews = news[currentIndex - 1];
  const nextNews = news[currentIndex + 1];

  return (
    <div className="container mx-auto py-12 px-4 flex flex-col items-center">
      <img
        src={currentNews.image}
        alt={currentNews.title}
        className="w-full max-w-lg rounded-lg mb-6"
      />
      <h2 className="text-2xl font-bold mb-4">{currentNews.title}</h2>
      <p className="mb-8 text-justify">{currentNews.description}</p>
      <div className="flex gap-4">
        <Link
          href={prevNews ? `/news/${prevNews._id}` : "#"}
          className={`px-4 py-2 rounded bg-blue-100 text-blue-900 font-semibold ${!prevNews && "opacity-50 pointer-events-none"}`}
        >
          Previous Article
        </Link>
        <Link
          href={nextNews ? `/news/${nextNews._id}` : "#"}
          className={`px-4 py-2 rounded bg-blue-100 text-blue-900 font-semibold ${!nextNews && "opacity-50 pointer-events-none"}`}
        >
          Next Article
        </Link>
      </div>
    </div>
  );
} 