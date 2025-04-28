import { CategoryResponse, CategoryObj } from "@/types";
import apiClient from "../lib/apiClient";

export const categoryService = {
  getCategoryList: (page: number = 1, limit: number = 10) =>
    apiClient<CategoryResponse>("category/list", {
      method: "GET",
      params: { page, limit },
    }),

  createCategory: (data: { name: string; slug: string; description: string }) =>
    apiClient("category/create", {
      method: "POST",
      body: data,
    }),

  editCategory: (
    id: string,
    data: Partial<
      Pick<
        CategoryObj,
        "name" | "slug" | "description" | "parentCategory" | "isActive"
      >
    >
  ) =>
    apiClient(`category/edit/${id}`, {
      method: "PATCH",
      body: data,
    }),

  deleteCategory: (id: string) =>
    apiClient(`category/delete/${id}`, {
      method: "DELETE",
    }),

  getCategoryById: (id: string) =>
    apiClient<CategoryObj>(`category/get/${id}`, {
      method: "GET",
    }),
};
