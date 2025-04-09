// components/BlogSection.tsx
import Image from "next/image";

interface BlogItem {
  id: number;
  category: string;
  readingTime: string;
  title: string;
  imageSrc: string;
}

const blogData: BlogItem[] = [
  {
    id: 1,
    category: "Entertainment",
    readingTime: "5 MIN READ",
    title: "Laugh Lounge: Comedy Capers and Chuckles",
    imageSrc: "/post16.jpg",
  },
  {
    id: 2,
    category: "Nature",
    readingTime: "5 MIN READ",
    title: "Oceans Unexplored: Secrets of the Deep",
    imageSrc: "/post21.jpg",
  },
  {
    id: 3,
    category: "Gaming",
    readingTime: "5 MIN READ",
    title: "Console Corner: Exploring Gaming Platforms",
    imageSrc: "/post24.jpg",
  },
];

export default function BlogSection() {
  return (
    <section className="py-16 bg-[#dce6f6]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((item) => (
            <a
              key={item.id}
              href="/singleblog"
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.imageSrc}
                  alt={item.title}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-black text-white text-xs px-3 py-1 rounded-md uppercase">
                    {item.category}
                  </span>
                  <span className="text-sm text-gray-500">
                    {item.readingTime}
                  </span>
                </div>
                <h4 className="text-lg font-semibold text-gray-800 leading-snug">
                  {item.title}
                </h4>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
