import {
  BookmarkListResponse,
  BookMarkPayload,
  BookMarkResponse,
} from "@/types/bookMark";
import apiClient from "../lib/apiClient";

export const bookMark = {
  bookmarkCreate: (data: BookMarkPayload) => {
    apiClient<BookMarkResponse>("blog/bookmark", {
      method: "POST",
      body: data,
    });
  },

  bookmarkGet: (page = 1, limit = 10) =>
    apiClient<BookmarkListResponse>(
      `blog/bookmarks/get?page=${page}&limit=${limit}`,
      {
        method: "GET",
      }
    ),
};
