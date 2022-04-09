import type { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type { Post } from "~/services/post.server";
import { getPosts, getDir } from "~/services/post.server";

interface LoaderData {
  posts: Post[];
  dir: Record<string, string>;
}

export const loader: LoaderFunction = async () => {
  const posts = await getPosts();
  const dir = await getDir();
  return {posts, dir};
}

export default function Index() {
  const { posts, dir } = useLoaderData<LoaderData>()
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Posts</h1>
      {posts.map(({ title, content }) => (
        <div key={title}>
          <div>{title}</div>
          <div>{content}</div>
        </div>
      ))}
      <hr />
      {Object.entries(dir).map(([key, value]) => (
        <div key={key}>
          <div>{key} : </div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
}
