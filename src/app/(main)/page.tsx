"use client";
import PostList from "@/components/post/PostList";
import { usePost } from "@/hooks/useMockPost";
import React from "react";

export default function MainPage() {
  const { data: posts, isLoading } = usePost();

  return (
    <div>
      <PostList posts={posts || []} isLoading={isLoading} />
    </div>
  );
}
