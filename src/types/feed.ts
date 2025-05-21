export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  writer: string;
  likeCount: number;
  isLiked: boolean;
  comments: Comment[];
}

export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  writer: string;
}

export interface CreatePostRequest {
  content: string;
}

export interface UpdatePostRequest {
  content: string;
}

export type FeedResponse = Post[];
