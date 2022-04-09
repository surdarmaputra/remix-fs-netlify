import fs from 'fs/promises';
import path from 'path';

const postsPath = path.join(__dirname, '../posts');

export interface Post {
  title: string;
  content: string;
}


export async function getPosts(): Promise<Post[]> {
  let files: string[];

  try {
    files = await fs.readdir(postsPath);
  } catch (error) {
    files = [];
  }

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const fileContent = await fs.readFile(path.join(postsPath, fileName));
      return JSON.parse(fileContent.toString());
    }),
  );

  return posts;
}