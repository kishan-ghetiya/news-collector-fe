import { Category } from "@/types";

export default function CategoryNavigation({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <nav className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-gray-100 z-10 py-4">
      <div className="flex space-x-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            className="px-4 py-2 text-sm font-medium text-onSurface/60 hover:text-onSurface/90 transition-colors whitespace-nowrap relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-secondary after:transition-all hover:after:w-full"
          >
            {category}
          </button>
        ))}
      </div>
    </nav>
  );
}
