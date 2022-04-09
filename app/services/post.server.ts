import fs from 'fs/promises';
import path from 'path';

const postsPath = './posts';

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
    files.map(async (fileName) => {
      const fileContent = await fs.readFile(path.join(postsPath, fileName));
      return JSON.parse(fileContent.toString());
    }),
  );

  return posts;
}