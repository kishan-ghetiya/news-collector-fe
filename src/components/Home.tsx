"use client";
import Image from "next/image";
import LatestBlogSection from "./blog/latestblog";
import BlogCardSection from "./blog/blogCard";
import CategoryMarquee from "./category/categoryMarquee";
import ArticlesSection from "./articles/articles";
import LatestNewsCategory from "./category/latestNews";
import MixedSection from "./post/post";
import { useEffect } from "react";

const categories = [
  { name: "Entertainment", img: "/post16.jpg" },
  { name: "Nature", img: "/post21.jpg" },
  { name: "Gaming", img: "/post24.jpg" },
  { name: "Business", img: "/post25.jpg" },
  { name: "Science", img: "/post1.jpg" },
  { name: "Education", img: "/post11.jpg" },
  { name: "Sport", img: "/post2.jpg" },
  { name: "Travel", img: "/post4.jpg" },
];

export default function HomeCategories() {
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
      {
        threshold: 0.1,
      }
    );

    elements.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="py-12 ">
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-6 opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
        {categories.map((category, index) => (
          <a
            key={index}
            href="/category.html"
            className="relative group block overflow-hidden rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105 border-8 border-white"
          >
            <Image
              src={category.img}
              alt={category.name}
              height={192}
              width={256}
              loading="lazy"
              className="w-full h-36 object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-xl" />
            <div className="absolute bottom-4 left-2 z-20 text-white font-normal text-lg">
              {category.name}
            </div>
            <Image
              src="/readmore.png"
              alt="arrow"
              height={192}
              width={256}
              loading="lazy"
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-6 transition-all duration-500 z-20 w-5 h-5"
            />
          </a>
        ))}
      </div>

      <LatestBlogSection />

      <BlogCardSection />

      <CategoryMarquee />

      <ArticlesSection />

      <LatestNewsCategory />

      <MixedSection />
    </section>
  );
}
