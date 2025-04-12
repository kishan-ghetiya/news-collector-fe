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

export interface Blog {
  id: string;
  title: string;
  link: string;
  tags: string[];
  summary: string;
  createdAt: string;
}

export interface BlogListResponse {
  results: {
    results: {
      id: string;
      title: string;
      link: string;
      tags: string[];
      summary: string;
      createdAt: string;
    }[];
  };
}
