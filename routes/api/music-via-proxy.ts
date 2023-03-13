import { HandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(req.url);

  url.hostname = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    `${url.protocol}//${url.hostname}/api/music${url.search}`
  )}`;

  try {
    const res = await fetch(url);

    return res;
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
