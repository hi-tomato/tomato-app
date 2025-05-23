export interface User {
  id: number;
  name: string;
  email: string;
}
export interface Post {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  likeCount: number;
  isLiked: boolean;
  user: User;
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
