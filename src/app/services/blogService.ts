import { CreatePostRequest } from "@/types";
import { Blog, BlogListResponse } from "@/types/blog";
import apiClient from "../lib/apiClient";

export const blogService = {
  addBlog: (data: CreatePostRequest) =>
    apiClient<{
      title: string;
      link: string;
      tags: string[];
      category: string;
      summary: string;
    }>("blog/create", {
      method: "POST",
      body: data,
    }),

  editBlog: (blogId: string, data: Partial<Blog>) =>
    apiClient<Blog>(`blog/edit/${blogId}`, {
      method: "PATCH",
      body: data,
    }),

  deleteBlog: (blogId: string) =>
    apiClient<void>(`blog/delete/${blogId}`, {
      method: "DELETE",
    }),

  getBlogById: (blogId: string) =>
    apiClient<Blog>(`blog/${blogId}`, {
      method: "GET",
    }),

  getBlogList: (page: number = 1, limit: number = 10) =>
    apiClient<BlogListResponse>("blog/list", {
      method: "GET",
      params: { page, limit },
    }),

  // bookmarkBlog: (data: BookmarkPayload) =>
  //   apiClient<void>("blog/bookmark", {
  //     method: "POST",
  //     body: data,
  //   }),

  getBookmarks: (page: number = 1, limit: number = 10) =>
    apiClient<BlogListResponse>("blog/bookmarks/get", {
      method: "GET",
      params: { page, limit },
    }),
};
