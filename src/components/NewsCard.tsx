import { NewsArticle } from "@/types";
import Image from "next/image";

export default function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 ease-out overflow-hidden">
      <div className="relative h-60">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          placeholder="blur"
          blurDataURL="/placeholder.jpg"
        />
      </div>

      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="px-3 py-1 text-sm font-medium rounded-full bg-accent/10 text-accent">
            {article.category}
          </span>
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm text-onSurface/60 hover:text-secondary transition-colors"
          >
            {article.source}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>

        <h3 className="text-xl font-semibold leading-7 hover:text-secondary transition-colors">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h3>

        <div className="flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs font-medium rounded-full bg-surface border border-gray-200"
            >
              #{tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-onSurface/60">{article.date}</p>
      </div>
    </article>
  );
}
