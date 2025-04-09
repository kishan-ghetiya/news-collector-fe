"use client";

import Image from "next/image";

const authors = [
  {
    name: "Demetris Osinski",
    image: "/author1.jpg",
    bio: "A dedicated environmentalist, Demetris sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.",
  },
  {
    name: "Alex Carter",
    image: "/author2.jpg",
    bio: "A dedicated environmentalist, Alex sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.",
  },
  {
    name: "Liam Nison",
    image: "/author3.jpg",
    bio: "A dedicated environmentalist, Liam sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.",
  },
  {
    name: "Mike Ivans",
    image: "/author4.jpg",
    bio: "A dedicated environmentalist, Mike sheds light on pressing ecological issues and sustainability practices. His articles inspire action and offer practical insights for a greener future.",
  },
];

export default function AboutAndAuthors() {
  return (
    <div className="bg-[#dce6f6] text-gray-900">
      {/* About Section */}
      <section className="max-w-6xl mx-auto px-4 py-16 flex flex-col lg:flex-row items-center gap-10">
        <div className="flex-1">
          <div className="flex items-start gap-4 mb-4">
            <Image src="/socials_22.png" alt="" width={40} height={40} />
            <p className="text-2xl font-semibold">
              We're powered by our unwavering devotion to crafting engaging
              content, exploring fresh perspectives, and embracing the forefront
              of literary exploration.
            </p>
          </div>
          <p className="text-lg text-gray-700">
            We thrive on crafting compelling content, exploring new
            perspectives, and pushing literary boundaries with unwavering
            dedication.
          </p>
        </div>
        <div className="flex-1">
          <Image
            src="/about.jpg"
            alt="About"
            width={500}
            height={300}
            className="rounded-xl shadow-md w-full object-cover"
          />
        </div>
      </section>

      {/* Authors Section */}
      <section className="bg-blue-100 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="mb-10 text-center">
            <Image
              src="/dec2.jpg"
              alt="Icon"
              width={50}
              height={50}
              className="mx-auto mb-2"
            />
            <h2 className="text-4xl font-bold uppercase">Authors</h2>
            <p className="text-gray-600 mt-2">The Voices Behind Our Pages</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {authors.map((author, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
              >
                <Image
                  src={author.image}
                  alt={author.name}
                  width={100}
                  height={100}
                  className="mx-auto rounded-full mb-4"
                />
                <h5 className="text-xl font-bold">{author.name}</h5>
                <p className="text-sm text-gray-600 mt-2">{author.bio}</p>
                <a
                  href="/author.html"
                  className="inline-block mt-4 bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition"
                >
                  Profile
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
