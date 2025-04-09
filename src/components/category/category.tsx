// components/CategoriesSection.tsx

import Image from "next/image";

const categories = [
  {
    name: "Entertainment",
    image: "/post16.jpg",
    link: "/category",
  },
  {
    name: "Nature",
    image: "/post21.jpg",
    link: "/category",
  },
  {
    name: "Gaming",
    image: "/post24.jpg",
    link: "/category",
  },
];

export default function CategoriesSection() {
  return (
    <section className="bg-[#dce6f6] py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <a
              key={index}
              href={category.link}
              className="relative rounded-2xl overflow-hidden shadow-lg group transition-transform hover:scale-105"
            >
              <Image
                src={category.image}
                alt={category.name}
                width={500}
                height={300}
                className="w-full h-[300px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white font-bold text-sm tracking-wide">
                {category.name.toUpperCase()}
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
