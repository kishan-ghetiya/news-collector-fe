import { Category } from "@/types";
import { mockNews } from "@/data/newsData";
import NewsCard from "@/components/NewsCard";
import CategoryNavigation from "@/components/CategoryNavigation";

export default function Home() {
  const categories: Category[] = [
    "Technology",
    "Sports",
    "Business",
    "Entertainment",
    "Health",
    "Science",
    "Gold",
  ];

  return (
    <div className="min-h-screen">
      <header className="bg-primary text-white py-8 border-b border-gray-200/10">
        <div className="container mx-auto px-4 max-w-7xl">
          <h1 className="text-4xl font-bold tracking-tight mb-6">
            Daily Insight
            <span className="text-secondary">.</span>
          </h1>
          <CategoryNavigation categories={categories} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockNews.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      </main>
    </div>
  );
}
