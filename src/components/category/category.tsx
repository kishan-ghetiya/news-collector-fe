"use client";

import Image from "next/image";
import { useEffect } from "react";

const categories = [
  {
    name: "Entertainment",
    image: "/post16.jpg",
    link: "/category",
  },
  {
    name: "Nature",
    image: "/post21.jpg",
    link: "/category",
  },
  {
    name: "Gaming",
    image: "/post24.jpg",
    link: "/category",
  },
  {
    name: "Entertainment",
    image: "/post16.jpg",
    link: "/category",
  },
  {
    name: "Nature",
    image: "/post21.jpg",
    link: "/category",
  },
  {
    name: "Gaming",
    image: "/post24.jpg",
    link: "/category",
  },
];

export default function CategoriesSection() {
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
    <section className="bg-[#dce6f6] py-10 opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="relative rounded-lg overflow-hidden shadow-lg group transition-transform hover:scale-105"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={500}
                height={300}
                className="w-full h-[300px] object-cover border-8 rounded-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity border-8 border-white rounded-lg"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-normal text-sm tracking-wide bg-black px-4 py-2 rounded-full">
                {category.name.toUpperCase()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
