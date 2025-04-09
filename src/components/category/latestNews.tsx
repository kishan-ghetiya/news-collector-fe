"use client";

import Image from "next/image";

const mainPost = {
  title: "Beyond Books: Practical Learning Adventures",
  image: "/post11.jpg",
  link: "/singleblog.html",
};

const subPosts = [
  {
    title: "Teacher's Toolbox: Strategies for Success",
    image: "/post19.jpg",
    link: "/singleblog.html",
  },
  {
    title: "EdTech Explorations: Transformative Tools",
    image: "/post1.jpg",
    link: "/singleblog.html",
  },
  {
    title: "Student Chronicles: Life in the Academic Lane",
    image: "/post19.jpg",
    link: "/singleblog.html",
  },
  {
    title: "Knowledge Quest: Exploring Academic Frontiers",
    image: "/post11.jpg",
    link: "/singleblog.html",
  },
];

const LatestNewsCategory = () => {
  return (
    <section className="bg-[#dce6f6] py-20">
      <div className="max-w-7xl mx-auto px-4">
        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 capitalize">
            Education
          </h2>
          <p className="text-gray-500 mt-2 text-lg">
            latest news about technology
          </p>
        </div>

        {/* Layout: One big post left + stacked posts right */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Main Post */}
          <a
            href={mainPost.link}
            className="block group relative overflow-hidden rounded-xl shadow-md hover:shadow-xl transition"
          >
            <Image
              src={mainPost.image}
              alt={mainPost.title}
              width={800}
              height={500}
              className="w-full h-[400px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 bg-black/60 text-white p-6 w-full">
              <h2 className="text-xl font-semibold">{mainPost.title}</h2>
            </div>
          </a>

          {/* Sub Posts List */}
          <div className="flex flex-col gap-6">
            {subPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                className="flex items-center gap-4 group hover:bg-gray-50 p-2 rounded-lg transition"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-medium text-gray-800 group-hover:text-blue-600 transition">
                  {post.title}
                </h4>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestNewsCategory;
