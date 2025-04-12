"use client";
import Image from "next/image";
import { useEffect } from "react";

const blogPosts = [
  {
    title: "Laugh Lounge: Comedy Capers and Chuckles",
    date: "Dec 12, 2023",
    image: "/post16.jpg",
  },
  {
    title: "Oceans Unexplored: Secrets of the Deep",
    date: "Dec 12, 2023",
    image: "/post21.jpg",
  },
  {
    title: "Console Corner: Exploring Gaming Platforms",
    date: "Dec 12, 2023",
    image: "/post24.jpg",
  },
  {
    title: "Startup Spotlight: Unveiling Business Triumphs",
    date: "Dec 12, 2023",
    image: "/post25.jpg",
  },
];

const LatestBlogSection = () => {
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
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <a
                key={index}
                href="/singleblog"
                className="flex items-center text-center hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-56 h-28 relative">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start ml-5">
                  <h4 className="font-bold text-base text-start text-gray-900">
                    {post.title}
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">{post.date}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogSection;
