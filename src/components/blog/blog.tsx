"use client";

import { addBlogSchema } from "@/app/lib/validation/blogSchema";
import { blogService } from "@/app/services";
import { BlogItem, RawArticle } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "../input/Input";
import Button from "../ui/Button";
import { useAuth } from "@/context/auth-context";
import toast from "react-hot-toast";
import { categoryService } from "@/app/services/categoryService";
import { Select } from "../Select";

interface FormValues {
  title: string;
  link: string;
  tags: string;
  categoryId: string;
  summary: string;
}

interface Category {
  id: string;
  name: string;
}

export default function BlogSection() {
  const [blogData, setBlogData] = useState<BlogItem[]>([]);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(addBlogSchema),
  });

  const transformArticles = useCallback(
    (articles: RawArticle[]): BlogItem[] => {
      return articles.map((article) => ({
        id: article.id,
        category: article.category ?? "General",
        title: article.title,
        image: "/post24.jpg",
        tags: article.tags ?? ["General"],
        readingTime: "5 MIN READ",
      }));
    },
    []
  );

  const fetchBlogs = async () => {
    try {
      const response = await blogService.getBlogList(1, 30);
      const rawArticles: RawArticle[] = response?.results ?? [];
      const transformed = transformArticles(rawArticles);
      setBlogData(transformed);
    } catch (error) {
      console.error("Error fetching blog data:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategoryList(1, 8);
      const results = response?.results || [];
      const categories = results.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
      }));
      setCategoryList(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll(".scroll-fade-in");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-10");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      { threshold: 0.1 }
    );

    fetchBlogs();
    fetchCategories();
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [transformArticles]);

  const onSubmit = async (data: FormValues) => {
    try {
      const formData = {
        title: data.title,
        link: data.link,
        tags: data.tags
          .split(",")
          .map((tag) => tag.trim())
          .join(","),
        category: data.categoryId,
        summary: data.summary,
      };

      await blogService.addBlog(formData);

      toast.success("Blog post created successfully!");

      setIsModalOpen(false);
      reset();
      fetchBlogs();
    } catch (err: any) {
      console.error("Create blog post error", err);
      toast.error(err?.message || "Failed to create blog post.");
    }
  };

  const resetModalState = () => {
    setIsModalOpen(false);
    reset();
    clearErrors();
  };

  return (
    <section className="pb-40 bg-[#dce6f6] opacity-0 translate-y-10 transition-all duration-700 ease-in-out scroll-fade-in">
      {/* Modal */}
      <Transition show={isModalOpen} as="div">
        <Dialog onClose={resetModalState} className="relative z-50">
          <Transition.Child
            enter="transition-opacity duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Transition.Child
              enter="transition-all duration-300 ease-out"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-all duration-200 ease-in"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-lg max-w-md w-full space-y-4 relative">
                <button
                  onClick={resetModalState}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                <Dialog.Title className="text-lg font-semibold">
                  Add New Blog Post
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Title"
                    type="text"
                    {...register("title")}
                    variant="solid"
                    error={errors.title?.message}
                  />
                  <Input
                    label="Link"
                    type="text"
                    {...register("link")}
                    variant="solid"
                    error={errors.link?.message}
                  />
                  <Select
                    label="Category"
                    options={categoryList.map((cat) => ({
                      label: cat.name,
                      value: cat.id,
                    }))}
                    placeholder="Select a category"
                    {...register("categoryId")}
                    variant="solid"
                    error={errors.categoryId?.message}
                  />
                  <Input
                    label="Tags (comma separated)"
                    type="text"
                    {...register("tags")}
                    variant="solid"
                    error={errors.tags?.message}
                  />
                  <Input
                    label="Summary"
                    type="text"
                    {...register("summary")}
                    variant="solid"
                    error={errors.summary?.message}
                  />
                  <div className="flex justify-end gap-2 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={resetModalState}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSubmitting}
                    >
                      Create
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {/* Add Blog Button */}
      {user && (
        <div className="container mx-auto pt-4 flex justify-end">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add Blog Post
          </Button>
        </div>
      )}

      {/* Blog Grid */}
      <div className="container mx-auto px-4 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href="/singleblog"
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.image ?? ""}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-5">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  {item?.tags?.map((tag, idx) => (
                    <span
                      className="bg-black text-white text-xs px-3 py-1 rounded-full uppercase"
                      key={idx}
                    >
                      {tag ?? "General"}
                    </span>
                  ))}
                </div>
                <h4 className="text-lg font-semibold text-gray-900 leading-snug mt-2">
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
