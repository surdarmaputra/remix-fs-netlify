import fs from 'fs/promises';
import path from 'path';

const postsPath = path.join(__dirname, '../posts');

export interface Post {
  title: string;
  content: string;
}

export async function getDir(): Promise<Record<string, string>> {
  const cwd = process.cwd()
  const netlifyContent = await fs.readdir(path.join(cwd, '.netlify'));
  return {
    cwd,
    netlifyContent: JSON.stringify(netlifyContent),
  }
}


export async function getPosts(): Promise<Post[]> {
  let files: string[];

  try {
    files = await fs.readdir(postsPath);
  } catch (error) {
    files = [];
  }

  const posts = await Promise.all(
    files.map((fileName) => {
      const fileContent = require(path.join(postsPath, fileName));
      return fileContent;
    }),
  );

  return posts;
}