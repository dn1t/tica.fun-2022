import { HandlerContext } from "$fresh/server.ts";
import getAudioUrls from "../../lib/music/getAudioUrls.ts";
import { searchTrack } from "../../lib/music/searchYoutube.ts";

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const url = new URL(req.url);
  const _name = url.searchParams.get("name");
  const artist = url.searchParams.get("artist");

  if (!_name || !artist)
    return Response.json({
      success: false,
      message: "some parameters are not provided.",
    });

  try {
    const { videoId, name, artists, cover } = await searchTrack(_name, [
      artist,
    ]);
    const streams = await getAudioUrls(videoId);
    if (!streams)
      return Response.json({ success: false, message: "stream not found" });

    const stream = streams.sort((a, b) => b.bitrate - a.bitrate)[0];

    // return Response.json({ success: true, data: stream.url });

    const html = await Deno.readTextFile("music.html");

    return new Response(
      html
        .replace("$0$", stream.url)
        .replace("$1$", cover)
        .replace("$2$", name)
        .replace("$3$", artists.join(",")),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
