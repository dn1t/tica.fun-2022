import { HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { getPosts } from "../lib/post.ts";
import Nav from "../islands/Nav.tsx";

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const blogPosts = await getPosts();

  return ctx.render({ blogPosts: blogPosts.filter((post) => !post.hidden) });
};

export default function Home(
  props: PageProps<{
    blogPosts: {
      title: string;
      date: Date;
      abstract: string;
      hidden?: boolean;
      issueNumber: number;
      slug: string;
    }[];
  }>,
) {
  return (
    <div class="bg-black text-white min-h-screen">
      <Head>
        <title>Blog | David Lee</title>
        <meta
          name="description"
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta property="og:title" content="David Lee" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta property="og:url" content={props.url.href} />
        <meta
          property="og:image"
          content={`${
            new URL(props.url).origin
          }/api/thumbnail?title=David%20Lee`}
        />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="David Lee" />
        <meta
          name="twitter:description"
          content="I'm a developer & designer. Love building beautiful websites & apps. Currently 15-years-old (17 in Korean Age). Programming since 2017."
        />
        <meta
          name="twitter:image"
          content={`${
            new URL(props.url).origin
          }/api/thumbnail?title=David%20Lee`}
        />
      </Head>
      <Nav />
      <div class="px-6 xs:px-10 mx-auto max-w-screen-xl">
        <section class="pt-32 pb-8">
          <h1 class="text-3xl xxs:text-4xl xs:text-5xl md:text-6xl font-semibold font-display">
            Blog
          </h1>
        </section>
        <section>
          <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-[repeat(3,minmax(0,1fr))] gap-10 py-4">
            {props.data.blogPosts &&
              props.data.blogPosts.map((post) => (
                <a href={`/blog/${post.slug}`} class="inline-block">
                  <div
                    class="w-full bg-center bg-cover rounded-xl"
                    style={{
                      backgroundImage: `url(/api/thumbnail?title=${
                        encodeURIComponent(
                          post.title,
                        )
                      })`,
                      aspectRatio: "16 / 9",
                    }}
                  />
                  <h2 class="text-2xl font-semibold mt-4">{post.title}</h2>
                  <p class="text-base md:text-lg text-gray-400 font-light mt-2">
                    {post.abstract}
                  </p>
                </a>
              ))}
          </div>
        </section>
        <div class="h-40" />
      </div>
    </div>
  );
}
