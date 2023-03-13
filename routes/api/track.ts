import { HandlerContext } from "$fresh/server.ts";
import { searchTrack } from "../../lib/music/searchYoutube.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(req.url);
  const _name = url.searchParams.get("name");
  const artist = url.searchParams.get("artist");

  if (!(_name && artist))
    return Response.json({
      success: false,
      message: "some parameters are not provided.",
    });

  try {
    const { videoId, name, artists, cover } = await searchTrack(_name, [artist]);

    return Response.json({ success: true, data: { videoId, name, artists: artists.join(","), cover } });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
