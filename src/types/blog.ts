export interface EditBlogPayload {
  title?: string;
  tags?: string[];
}

export interface BlogResponse {
  _id: string;
  title: string;
  tags: string[];
  authorId: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookmarkPayload {
  linkId: string[];
  status: boolean;
}

export interface Blog {
  id: string;
  title: string;
  link: string;
  tags: string[];
  summary: string;
  createdAt: string;
}

export interface BlogListResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
}
