// components/BlogSection.tsx
import Image from "next/image";

type BlogCard = {
  image: string;
  category: string;
  readTime: string;
  title: string;
  link: string;
};

const blogData: BlogCard[] = [
  {
    image: "/post16.jpg",
    category: "Entertainment",
    readTime: "5 min Read",
    title: "Laugh Lounge: Comedy Capers and Chuckles",
    link: "/singleblog",
  },
  {
    image: "/post21.jpg",
    category: "Nature",
    readTime: "5 min Read",
    title: "Oceans Unexplored: Secrets of the Deep",
    link: "/singleblog",
  },
  {
    image: "/post24.jpg",
    category: "Gaming",
    readTime: "5 min Read",
    title: "Console Corner: Exploring Gaming Platforms",
    link: "/singleblog",
  },
];

const BlogCardSection = () => {
  return (
    <section className="bg-[#dce6f6] py-10">
      <div className="max-w-7xl mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog, index) => (
          <a
            key={index}
            href={blog.link}
            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden"
          >
            <div className="relative w-full h-56">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-sm mb-3">
                <span className="bg-black text-white px-2 py-0.5 rounded font-semibold uppercase text-xs">
                  {blog.category}
                </span>
                <span className="text-gray-500">{blog.readTime}</span>
              </div>
              <h4 className="text-lg font-semibold text-gray-900 leading-snug">
                {blog.title}
              </h4>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default BlogCardSection;
