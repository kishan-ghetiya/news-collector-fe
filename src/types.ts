export interface NewsArticle {
  id: string;
  title: string;
  source: string;
  category: string;
  tags: string[];
  date: string;
  image: string;
  url: string;
}

export type Category =
  | "Technology"
  | "Sports"
  | "Business"
  | "Entertainment"
  | "Health"
  | "Science"
  | "Gold";

export interface CookieOptions {
  name: string;
  value: string;
  days?: number;
}

export interface CreatePostRequest {
  title: string;
  link: string;
  tags: string;
  summary: string;
}

export interface RawArticle {
  id: string;
  category?: string;
  readingTime?: string;
  title: string;
  tags?: string[];
}

export interface BlogItem {
  id: string;
  category?: string;
  readingTime?: string;
  title: string;
  image?: string;
  tags?: string[];
}
