// components/MixedSection.tsx
import Image from "next/image";
import Link from "next/link";

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
  return (
    <section className="py-16 bg-[#dce6f6]">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase text-gray-900">
            Mixed
          </h2>
          <p className="text-gray-500 mt-2">
            Exploring a tapestry of topics and ideas
          </p>
        </div>

        {/* Grid of Posts */}
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          {mixedPosts.map((post) => (
            <Link
              href={post.href}
              key={post.id}
              className="group relative block overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={post.image}
                  alt={post.title}
                  layout="fill"
                  objectFit="cover"
                  className="transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300" />
              </div>
              <div className="absolute bottom-0 p-4 text-white z-10">
                <span className="text-sm uppercase tracking-wide font-semibold text-yellow-400">
                  {post.category}
                </span>
                <h4 className="text-lg font-bold mt-1">{post.title}</h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MixedSection;
