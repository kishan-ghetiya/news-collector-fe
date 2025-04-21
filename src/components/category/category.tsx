"use client";

import { categoryService } from "@/app/services/categoryService";
import Image from "next/image";
import { useEffect, useState } from "react";
import { RawArticle } from "../blog/blog";
import { CategoryItem } from "../Home";

export default function CategoriesSection() {
  const [categoryData, setCategoryData] = useState<CategoryItem[]>();

  const addImageToArticles = (articles: RawArticle[]) => {
    return articles?.map((article) => ({
      ...article,
      image: `/post21.jpg`,
    }));
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
      {
        threshold: 0.1,
      }
    );

    const fetchData = async () => {
      try {
        const data = await categoryService.getCategoryList(1, 30); // Replace with your actual async call
        const categoryData = addImageToArticles(data?.results);
        setCategoryData(categoryData);
        // Do something with the data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();

    elements.forEach((el) => observer.observe(el));

    // Cleanup observer on component unmount
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section className="bg-[#dce6f6] py-10 pb-44 opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {categoryData?.map((category, index) => (
            <a
              key={index}
              // href={category.link}
              className="relative rounded-lg overflow-hidden shadow-lg group transition-transform hover:scale-105"
            >
              <Image
                src={category.image ?? ""}
                alt={category.name ?? ""}
                width={500}
                height={300}
                className="w-full h-[300px] object-cover border-8 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity border-8 border-white rounded-lg"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-normal text-sm tracking-wide bg-black px-4 py-2 rounded-full">
                {category?.name ? category?.name.toUpperCase() : ""}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
