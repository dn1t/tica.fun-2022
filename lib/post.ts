import { extract } from 'front-matter';
import { join } from 'join';
import { walk } from 'walk';

export const getPosts = async () => {
  const postsDir = join('./posts');
  const posts = [];

  for await (const entry of walk(postsDir)) {
    if (entry.isFile && entry.path.endsWith('.md'))
      posts.push({
        slug: entry.name.slice(0, '.md'.length * -1),
        ...(extract(await Deno.readTextFile(entry.path)).attrs as {
          title: string;
          date: Date;
          abstract: string;
        }),
      });
  }

  return posts;
};

export const getPost = async (slug: string) => {
  console.log(slug);

  const info = extract(await Deno.readTextFile(`./posts/${slug}.md`));

  return {
    ...(info.attrs as {
      title: string;
      date: Date;
      abstract: string;
    }),
    body: info.body,
  };
};
