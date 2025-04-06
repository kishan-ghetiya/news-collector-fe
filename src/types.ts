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
  | "Science";
