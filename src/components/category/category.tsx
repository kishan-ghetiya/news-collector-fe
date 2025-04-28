"use client";

import { addCategorySchema } from "@/app/lib/validation/categorySchema";
import { categoryService } from "@/app/services/categoryService";
import { useAuth } from "@/context/auth-context";
import { CategoryObj } from "@/types";
import { Dialog, Transition } from "@headlessui/react";
import { joiResolver } from "@hookform/resolvers/joi";
import { Edit2, Trash2, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Input } from "../input/Input";
import Button from "../ui/Button";

interface FormValues {
  name: string;
  slug: string;
  description: string;
}

export default function CategorySection() {
  const [categories, setCategories] = useState<CategoryObj[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<CategoryObj | null>(
    null
  );
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: joiResolver(addCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryService.getCategoryList(1, 100);
      setCategories(response?.results ?? []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load categories");
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const onSubmit = async (data: FormValues) => {
    try {
      if (currentCategory) {
        await categoryService.editCategory(currentCategory.id, {
          name: data.name,
          description: data.description,
          slug: generateSlug(data.name),
        });
        toast.success("Category updated successfully!");
      } else {
        await categoryService.createCategory({
          name: data.name,
          description: data.description,
          slug: generateSlug(data.name),
        });
        toast.success("Category created successfully!");
      }
      closeModals();
      fetchCategories();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to save category");
    }
  };
  const handleDelete = async () => {
    if (!currentCategory) return;
    try {
      await categoryService.deleteCategory(currentCategory.id);
      toast.success("Category deleted successfully!");
      closeModals();
      fetchCategories();
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to delete category");
    }
  };

  const openEditModal = (category: CategoryObj) => {
    setCurrentCategory(category);
    setValue("name", category.name);
    setValue("slug", category.slug);
    setValue("description", category.description);
    setIsModalOpen(true);
  };

  const closeModals = () => {
    setIsModalOpen(false);
    setIsDeleteModalOpen(false);
    setTimeout(() => {
      setCurrentCategory(null);
      reset();
    }, 300);
  };

  return (
    <section className="pb-40">
      <Transition show={isModalOpen} as="div">
        <Dialog onClose={closeModals} className="relative z-50">
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
              enter="transition-all duration-300"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-all duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md relative">
                <button
                  onClick={closeModals}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                <Dialog.Title className="text-lg font-bold mb-4">
                  {currentCategory ? "Edit Category" : "New Category"}
                </Dialog.Title>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <Input
                    label="Name"
                    type="text"
                    {...register("name")}
                    variant="solid"
                    error={errors.name?.message}
                  />
                  <Input
                    label="Slug"
                    type="text"
                    {...register("slug")}
                    variant="solid"
                    error={errors.slug?.message}
                  />
                  <Input
                    label="Description"
                    type="textarea"
                    variant="solid"
                    {...register("description")}
                    error={errors.description?.message}
                  />
                  <div className="flex justify-end space-x-2 pt-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={closeModals}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      variant="primary"
                      loading={isSubmitting}
                    >
                      {currentCategory ? "Update" : "Create"}
                    </Button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      <Transition show={isDeleteModalOpen} as="div">
        <Dialog onClose={closeModals} className="relative z-50">
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
              enter="transition-all duration-300"
              enterFrom="scale-90 opacity-0"
              enterTo="scale-100 opacity-100"
              leave="transition-all duration-200"
              leaveFrom="scale-100 opacity-100"
              leaveTo="scale-90 opacity-0"
            >
              <Dialog.Panel className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-sm relative">
                <button
                  onClick={closeModals}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                >
                  <X size={20} />
                </button>
                <Dialog.Title className="text-lg font-bold mb-2">
                  Delete Category
                </Dialog.Title>
                <p className="text-gray-600 mb-4">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{currentCategory?.name}</span>
                  ?
                </p>
                <div className="flex justify-end space-x-2 pt-2">
                  <Button variant="outline" onClick={closeModals}>
                    Cancel
                  </Button>
                  <Button
                    variant="danger"
                    onClick={handleDelete}
                    loading={isSubmitting}
                  >
                    Delete
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>

      {user && (
        <div className="container mx-auto px-4 pt-6 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Categories</h2>
          <Button
            variant="primary"
            onClick={() => {
              setCurrentCategory(null);
              reset(); //
              setIsModalOpen(true);
            }}
          >
            Add Category
          </Button>
        </div>
      )}

      <div className="container mx-auto px-4 py-6 space-y-4">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="border rounded-lg p-4 flex justify-between items-center bg-white"
            >
              <div>
                <h4 className="font-semibold text-gray-800">{category.name}</h4>
                <p className="text-sm text-gray-500">{category.description}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => openEditModal(category)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => {
                    setCurrentCategory(category);
                    setIsDeleteModalOpen(true);
                  }}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            No categories found.
          </div>
        )}
      </div>
    </section>
  );
}
