import * as blogService from '../services/blogService';
import { useMutation, useQuery } from '@tanstack/react-query';
import { BlogResponse, BookmarkPayload, EditBlogPayload } from '../types/blog';

export const useGetBlog = (blogId: string) =>
    useQuery<BlogResponse, Error>({
        queryKey: ['blog', blogId],
        queryFn: async () => (await blogService.getBlog(blogId)).data,
        enabled: !!blogId,
    });

export const useEditBlog = (blogId: string) =>
    useMutation<BlogResponse, Error, EditBlogPayload>({
        mutationFn: async (data) => (await blogService.editBlog(blogId, data)).data,
    });

export const useDeleteBlog = (blogId: string) =>
    useMutation<void, Error, void>({
        mutationFn: async () => {
            await blogService.deleteBlog(blogId);
        },
    });

export const useListBlogs = (page = 1, limit = 10) =>
    useQuery({
        queryKey: ['blogs', page, limit],
        queryFn: () => blogService.listBlogs(page, limit),
    });

export const useBookmarkBlog = () =>
    useMutation<void, Error, BookmarkPayload>({
        mutationFn: async (data) => {
            await blogService.bookmarkBlog(data);
        },
    });

export const useGetBookmarks = (page = 1, limit = 10) =>
    useQuery({
        queryKey: ['bookmarks', page, limit],
        queryFn: () => blogService.getBookmarks(page, limit),
    });
