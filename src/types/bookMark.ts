export interface BookMarkPayload {
  linkId: string[]; // array of MongoDB ObjectIDs (strings)
  status: boolean;
}

export interface BookMarkResponse {
  message: string;
}

export interface SubmittedBy {
  _id: string;
  email: string;
}

export interface BookmarkItem {
  submittedBy: SubmittedBy;
}

export interface BookmarkListResponse {
  results: BookmarkItem[];
  totalResults: number;
  page: number;
  limit: number;
  totalPages: number;
}
