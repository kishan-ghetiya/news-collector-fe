// components/LatestBlogSection.tsx
import Image from "next/image";

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
  return (
    <section className="bg-[#dce6f6] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post, index) => (
              <a
                key={index}
                href="/singleblog"
                className="flex flex-col items-center text-center hover:scale-[1.02] transition-transform duration-300"
              >
                <div className="w-28 h-28 relative mb-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
                <h4 className="font-semibold text-lg text-gray-900">
                  {post.title}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{post.date}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogSection;
