"use client";

import Image from "next/image";
import Link from "next/link";

const Articles = [
  {
    title: "Future Forward: Technology's Evolution Unveiled",
    date: "December 12, 2023",
    image: "/post1.jpg",
    href: "/singleblog",
  },
  {
    title: "Tech Trends: Navigating the Digital Frontier",
    date: "December 12, 2023",
    image: "/post10.jpg",
    href: "/singleblog",
  },
  {
    title: "Tech Talk: Advancements in Science and Tech",
    date: "December 12, 2023",
    image: "/post2.jpg",
    href: "/singleblog",
  },
  {
    title: "Bio Wonders: Nature's Marvels Explored",
    date: "December 12, 2023",
    image: "/post23.jpg",
    href: "/singleblog",
  },
  {
    title: "Lab Diaries: Cutting-edge Scientific Discoveries",
    date: "December 12, 2023",
    image: "/post12.jpg",
    href: "/singleblog",
  },
  {
    title: "Cosmic Curiosities: Exploring the Universe",
    date: "December 12, 2023",
    image: "/post16.jpg",
    href: "/singleblog",
  },
];

export default function ArticlesSection() {
  return (
    <section
      className="py-16 bg-cover bg-no-repeat bg-center"
      style={{ backgroundImage: "url('/post-bg.jpg')" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-bold text-white">Tech</h2>
          <p className="text-lg text-white/70 mt-2">
            latest news about technology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Articles.map((article, index) => (
            <a
              key={index}
              href="/singleblog.html"
              className="relative group overflow-hidden rounded-xl shadow-lg"
            >
              <Image
                src={article.image}
                alt={article.title}
                width={600}
                height={400}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 z-10">
                <h4 className="text-white text-lg font-semibold">
                  {article.title}
                </h4>
                <p className="text-white text-sm">{article.date}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
