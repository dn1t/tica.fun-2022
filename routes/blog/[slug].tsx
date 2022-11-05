import { HandlerContext, PageProps } from "$fresh/server.ts";
import { Head } from "$fresh/runtime.ts";
import { DOMParser, Element } from "deno-dom";
import format from "format-date";
import { render } from "gfm";
import Nav from "../../components/Nav.tsx";
import Comments from "../../components/Comments.tsx";
import { getPost } from "../../lib/post.ts";

export const handler = async (
  _req: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  const post = await getPost(ctx.params.slug);
  const html = render(post.body, { allowIframes: true });

  const doc = new DOMParser().parseFromString(html, "text/html");
  const headingElements = Array.from(
    doc?.querySelectorAll("h1, h2, h3, h4, h5, h6") ?? [],
  ) as Element[];

  const headings = headingElements.map((el) => ({
    level: Number.parseInt(el.tagName[1]),
    id: el.id,
    title: el.textContent,
  }));

  const stylesheet = await Deno.readTextFile("./article.css");

  return ctx.render({ ...post, html, headings, stylesheet });
};

export default function BlogPost(
  props: PageProps<{
    html: string;
    title: string;
    date: Date;
    abstract: string;
    hidden?: boolean;
    issueNumber: number;
    headings: { level: 1 | 2 | 3 | 4 | 5 | 6; id: string; title: string }[];
    stylesheet: string;
  }>,
) {
  return (
    <div class="bg-black text-white min-h-screen">
      <Head>
        <title>{props.data.title} | David Lee</title>
        <meta name="description" content={props.data.abstract} />
        <meta property="og:title" content={`${props.data.title} | David Lee`} />
        <meta property="og:type" content="article" />
        <meta property="og:description" content={props.data.abstract} />
        <meta property="og:url" content={props.url.href} />
        <meta
          property="og:image"
          content={`${new URL(props.url).origin}/api/thumbnail?title=${
            encodeURIComponent(props.data.title)
          }`}
        />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content={`${props.data.title} | David Lee`}
        />
        <meta name="twitter:description" content={props.data.abstract} />
        <meta
          name="twitter:image"
          content={`${new URL(props.url).origin}/api/thumbnail?title=${
            encodeURIComponent(props.data.title)
          }`}
        />
        <link href="/ocs-ui.css" rel="stylesheet" />
        <style
          dangerouslySetInnerHTML={{
            __html: props.data.stylesheet,
          }}
        />
      </Head>
      <Nav />
      <div class="px-6 xs:px-10 mx-auto max-w-screen-xl">
        <section class="pt-16 md:pt-32">
          <div class="relative">
            <a
              class="px-4 py-1.5 leading-none xs:leading-none rounded-full bg-blue-500 bg-opacity-20 text-blue-500 text-sm xs:text-[15px] font-semibold leading-none px-2.5 py-1.5 xs:px-3 rounded-lg absolute -top-9"
              href="/blog"
            >
              Blog
            </a>
          </div>
          <h1 class="text-3xl xxs:text-4xl xs:text-5xl md:text-6xl font-semibold break-words font-display">
            {props.data.title}
          </h1>
          <p class="text-lg xs:text-xl text-gray-400 font-light mt-8">
            {props.data.abstract}
          </p>
          <p class="mt-4 text-gray-400">
            {format(props.data.date, "yyyy-MM-dd", {})}
          </p>
        </section>
        <section class="flex flex-col-reverse slg:grid slg:grid-cols-[minmax(1px,1fr)18rem]">
          <div class="my-8 max-w-full slg:mr-10">
            <article class="w-full max-w-full">
              <img
                class="w-full"
                src={`/api/thumbnail?title=${
                  encodeURIComponent(
                    props.data.title,
                  )
                }`}
              />
              <div
                id="article"
                class="mt-6 text-lg"
                dangerouslySetInnerHTML={{ __html: props.data.html }}
              />
            </article>
            <div>
              <h2 class="text-white text-xl font-semibold mt-14 mb-6">
                Comments
              </h2>
              <Comments issueNumber={props.data.issueNumber} />
            </div>
          </div>
          <div class="mt-10 mb-6 slg:m-0 slg:sticky slg:top-48 slg:self-start">
            <h2 class="text-sm text-gray-500 font-bold pl-6">
              Table of Contents
            </h2>
            <div class="flex flex-col mt-2 pl-6 border-l border-gray-800">
              {props.data.headings.length > 0
                ? (
                  props.data.headings.map((heading) => {
                    return (
                      <a
                        href={`#${heading.id}`}
                        class="my-0.5 text-gray-300"
                        style={{
                          paddingLeft: (heading.level - 1) * 16,
                        }}
                      >
                        {heading.title}
                      </a>
                    );
                  })
                )
                : <span class="text-gray-300">...</span>}
            </div>
          </div>
        </section>
        <div class="h-40" />
      </div>
    </div>
  );
}
