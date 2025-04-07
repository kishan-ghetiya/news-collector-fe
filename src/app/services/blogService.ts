import axios from "axios";
import { BlogResponse, BookmarkPayload, EditBlogPayload } from "../types/blog";


export const getBlog = (blogId: string) =>
    axios.get<BlogResponse>(`/v1/blog/${blogId}`);

export const editBlog = (blogId: string, data: EditBlogPayload) =>
    axios.patch<BlogResponse>(`/v1/blog/edit/${blogId}`, data);

export const deleteBlog = (blogId: string) =>
    axios.delete(`/v1/blog/delete/${blogId}`);

export const listBlogs = (page = 1, limit = 10) =>
    axios.get(`/v1/blog/list?page=${page}&limit=${limit}`);

export const bookmarkBlog = (data: BookmarkPayload) =>
    axios.post(`/v1/blog/bookmark`, data);

export const getBookmarks = (page = 1, limit = 10) =>
    axios.post(`/v1/blog/bookmarks/get?page=${page}&limit=${limit}`);
