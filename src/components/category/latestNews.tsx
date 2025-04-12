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
    <section className="bg-[#dce6f6] py-20 opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4">
        {/* Title */}
        <div className="flex flex-col md:flex-row text-center mb-12  items-center">
          <h2 className="text-[90px] font-normal text-gray-800 capitalize">
            Education
          </h2>
          <p className="text-gray-500 mt-2 text-lg ml-5">
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
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute mx-5 rounded-2xl top-auto right-0 bottom-[20px] left-0 bg-white text-black p-6">
              <h2 className="text-2xl font-normal">{mainPost.title}</h2>
            </div>
          </a>

          {/* Sub Posts List */}
          <div className="flex flex-col gap-6">
            {subPosts.map((post, index) => (
              <a
                key={index}
                href={post.link}
                className="flex items-center gap-4 group hover:bg-gray-50 bg-white p-2 rounded-lg transition"
              >
                <div className="relative w-32 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h4 className="text-lg font-medium text-gray-800 transition group-hover:scale-105">
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
