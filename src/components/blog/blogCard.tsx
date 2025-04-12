// components/BlogSection.tsx
import Image from "next/image";

const BlogCardSection = ({ blogData }) => {
  return (
    <section className="bg-[#dce6f6] py-10 pb-40 opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      <div className="container mx-auto px-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData?.map((blog, index) => (
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
              <div className="grid items-center gap-3 mb-3 over">
                {blog?.tags?.map((item, index) => (
                  <span
                    className="bg-black text-white text-xs px-3 py-1 rounded-md uppercase"
                    key={index}
                  >
                    {item ?? "General"}
                  </span>
                ))}
                <span className="text-sm text-gray-500">
                  {blog.readingTime}
                </span>
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
