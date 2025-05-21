export interface Comment {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  content: string;
  writer: string;
}

export interface CreateCommentRequest {
  content: string;
}

export interface UpdateCommentRequest {
  content: string;
}
