"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const mixedPosts = [
  {
    id: 1,
    image: "/post9.jpg",
    category: "Travel",
    title: "Cultural Delights: A Journey Through History",
    href: "/singleblog",
  },
  {
    id: 2,
    image: "/post7.jpg",
    category: "Nature",
    title: "Wild Wonders: Exploring Nature's Tapestry",
    href: "/singleblog",
  },
  {
    id: 3,
    image: "/post6.jpg",
    category: "Entertainment",
    title: "Pop Culture Parade: Trends and Fandoms",
    href: "/singleblog",
  },
  {
    id: 4,
    image: "/post5.jpg",
    category: "Business",
    title: "Entrepreneurial Insights: Building Success Stories",
    href: "/singleblog",
  },
];

const MixedSection = () => {
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
    <section className="py-16 bg-[#dce6f6] opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12 flex items-center">
          <h2 className="uppercase text-gray-900 text-[90px] font-normal">
            Mixed
          </h2>
          <p className="text-gray-500 mt-2 ml-5">
            Exploring a tapestry of topics and ideas
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {mixedPosts.map((post) => (
            <Link
              href={post.href}
              key={post.id}
              className="group block overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 relative"
            >
              <div className="relative w-full h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 hover:opacity-60" />
              </div>
              <span className="text-sm uppercase tracking-wide text-white absolute top-4 right-4 py-2 px-3 bg-black rounded-full">
                {post.category}
              </span>
              <div className="absolute bottom-0 p-4 text-white z-10">
                <h4 className="text-base mt-1 text-white font-normal">
                  {post.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixedSection;
