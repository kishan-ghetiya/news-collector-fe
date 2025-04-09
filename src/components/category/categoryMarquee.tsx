const categories = [
  { name: "Business", icon: "/categories/business.png" },
  { name: "Sport", icon: "/categories/sport.png" },
  { name: "Lifestyle", icon: "/categories/lifestyle.png" },
  { name: "Design", icon: "/categories/design.png" },
  { name: "TechFood", icon: "/categories/techfood.png" },
  { name: "Fashion", icon: "/categories/fashion.png" },
  { name: "Health", icon: "/categories/health.png" },
  { name: "Entertainment", icon: "/categories/entertainment.png" },
  { name: "Science", icon: "/categories/science.png" },
  { name: "Finance", icon: "/categories/finance.png" },
  { name: "Music", icon: "/categories/music.png" },
  { name: "Art", icon: "/categories/art.png" },
  { name: "Environment", icon: "/categories/environment.png" },
  { name: "Education", icon: "/categories/education.png" },
  { name: "Politics", icon: "/categories/politics.png" },
  { name: "Culture", icon: "/categories/culture.png" },
  { name: "Gaming", icon: "/categories/gaming.png" },
  { name: "Wellness", icon: "/categories/wellness.png" },
  { name: "Automotive", icon: "/categories/automotive.png" },
  { name: "Photography", icon: "/categories/photography.png" },
  { name: "Innovation", icon: "/categories/innovation.png" },
];

const CategoryMarquee = () => {
  return (
    <section className="bg-black overflow-hidden py-3">
      <div className="whitespace-nowrap animate-marquee flex gap-8 items-center">
        {categories.concat(categories).map((cat, idx) => (
          <div
            key={idx}
            className="flex items-center gap-2 text-white text-sm font-medium"
          >
            {/* <Image src={cat.icon} alt={cat.name} width={20} height={20} className="rounded-sm" /> */}
            <span>{cat.name}</span>
            <span className="text-gray-500">-</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategoryMarquee;
