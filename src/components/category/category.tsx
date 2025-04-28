"use client";

import { blogService } from "@/app/services";
import { BlogItem, RawArticle } from "@/types";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

export default function BlogSection() {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);

  const transformArticles = useCallback(
    (articles: RawArticle[]): BlogItem[] => {
      return articles.map((article) => ({
        id: article.id,
        category: article.category ?? "General",
        readingTime: article.readingTime ?? "5 MIN READ",
        title: article.title,
        image: "/post24.jpg", // You can customize logic here
        tags: article.tags ?? ["General"],
      }));
    },
    []
  );

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getBlogList(1, 30);
      const rawArticles: RawArticle[] = response?.results ?? [];
      const transformed = transformArticles(rawArticles);
      setBlogData(transformed);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    fetchBlogs();
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [transformArticles]);

  return (
    <section className="py-16 pb-40 bg-[#dce6f6] opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href="/singleblog"
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.image ?? ""}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item?.tags?.map((tag, idx) => (
                    <span
                      className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase"
                      key={idx}
                    >
                      {tag ?? "General"}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {item.readingTime}
                </span>
                <h4 className="text-lg font-semibold text-gray-900 leading-snug mt-2">
                  {item.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
