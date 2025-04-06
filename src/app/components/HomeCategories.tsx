// components/HomeCategories.tsx

import Image from "next/image";

const categories = [
  { name: "Entertainment", img: "/post16.jpg" },
  { name: "Nature", img: "/post21.jpg" },
  { name: "Gaming", img: "/post24.jpg" },
  { name: "Business", img: "/post25.jpg" },
  { name: "Science", img: "/post1.jpg" },
  { name: "Education", img: "/post11.jpg" },
  { name: "Sport", img: "/post2.jpg" },
  { name: "Travel", img: "/post4.jpg" },
];

export default function HomeCategories() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <a
            key={index}
            href="/category.html"
            className="relative group block overflow-hidden rounded-xl shadow-md transition-transform duration-300 transform hover:scale-105"
          >
            <Image
              src={category.img}
              alt={category.name}
              height={192}
              width={256}
              loading="lazy"
              className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
            <div className="absolute bottom-4 left-4 z-20 text-white font-semibold text-lg">
              {category.name}
            </div>
            <Image
              src="/readmore.png"
              alt="arrow"
              height={192}
              width={256}
              loading="lazy"
              className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-y-0 translate-y-6 transition-all duration-500 z-20 w-5 h-5"
            />
          </a>
        ))}
      </div>
    </section>
  );
}
