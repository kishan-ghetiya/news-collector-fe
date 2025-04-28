import { BlogListResponse } from "@/types/blog";
import apiClient from "../lib/apiClient";

export const categoryService = {
  getCategoryList: (page: number = 1, limit: number = 10) =>
    apiClient<BlogListResponse>("category/list", {
      method: "GET",
      params: { page, limit },
    }),
};
