import { HandlerContext } from "$fresh/server.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    const res = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(req.url.replace("music-via-proxy", "music"))}`
    );

    return res;
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
