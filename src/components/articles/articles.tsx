"use client";

import Image from "next/image";

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
      className="py-40 bg-cover bg-no-repeat bg-center opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in"
      style={{ backgroundImage: "url('/post-bg.jpg')" }}
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 flex items-center gap-4">
          <h2 className="text-[90px] font-normal text-black">Tech</h2>
          <p className="text-lg text-black/70 mt-2">
            latest news about technology
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Articles.map((article, index) => (
            // <div className="flex items-center bg-white rounded-[40px] p-4 shadow-md space-x-4 w-full max-w-xl" key={index}>
            //   <div className="flex-shrink-0 flex items-center break-words w-full">
            //     <Image
            //       src={article.image}
            //       alt={article.title}
            //       width={600}
            //       height={400}
            //       className="w-20 h-20 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"
            //     />
            //       <div className="ml-4">
            //       <h4 className="text-lg font-normal text-gray-900 ">
            //         {article.title}
            //       </h4>
            //       <p className="text-sm text-gray-500">{article.date}</p>
            //     </div>
            //   </div>
            // </div>
            <a
              href="/singleblog.html"
              className="relative group overflow-hidden rounded-[40px] shadow-lg"
              key={index}
            >
              {/* Animated image zoom-in */}
              <div className="relative w-full h-64 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-[400ms] ease-in-out"
                />

                {/* Overlay that fades in on hover */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>

              {/* Text content sliding in */}
              <div className="absolute bottom-6 left-6 right-6 z-10 transform translate-y-10 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <h4 className="text-white text-xl font-semibold">
                  Future Forward: Technology’s Evolution Unveiled
                </h4>
                <p className="text-white text-sm mt-1">December 12, 2023</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
