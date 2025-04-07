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
