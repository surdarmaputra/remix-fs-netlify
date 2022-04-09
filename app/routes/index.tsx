import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/services/post.server";
import { getPosts } from "~/services/post.server";

interface LoaderData {
  posts: Post[];
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  return {posts};
}

export default function Index() {
  const { posts} = useLoaderData<LoaderData>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Posts</h1>
      {posts.map(({ title, content }) => (
        <div key={title}>
          <div>{title}</div>
          <div>{content}</div>
        </div>
      ))}
    </div>
  );
}
