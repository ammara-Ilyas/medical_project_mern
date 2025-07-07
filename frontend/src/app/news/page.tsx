import { NewsProvider } from "@/context/NewsContext";
import NewsList from "@/components/widgets/news/NewsList";
import NewsSidebar from "@/components/widgets/news/NewsSidebar";

export const metadata = {
  title: "Latest News | MEDDICAL",
  description: "Stay updated with the latest news from MEDDICAL hospital.",
};

export default function Page() {
  return (
    <NewsProvider>
      <section className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Latest News</h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 min-w-0">
            <NewsList />
          </div>
          <NewsSidebar />
        </div>
      </section>
    </NewsProvider>
  );
} 