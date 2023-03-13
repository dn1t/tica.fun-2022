import { HandlerContext } from "$fresh/server.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const url = new URL(req.url);
  const stream = url.searchParams.get("stream");

  if (!stream)
    return Response.json({
      success: false,
      message: "some parameters are not provided.",
    });

  try {
    const res = await fetch(stream);

    return res;
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
