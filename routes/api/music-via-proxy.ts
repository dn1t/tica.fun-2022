import { HandlerContext } from "$fresh/server.ts";
import getAudioUrls from "../../lib/music/getAudioUrls.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    const trackRes = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(req.url.replace("music-via-proxy", "track"))}`
    );
    if (!trackRes.ok)
      return Response.json({
        success: false,
        message: "error",
      });
    const { videoId, name, artists, cover }: { videoId: string; name: string; artists: string; cover: string } =
      await trackRes.json();

    const streams = await getAudioUrls(videoId);
    if (!streams) return Response.json({ success: false, message: "stream not found" });

    const stream = streams.sort((a, b) => b.bitrate - a.bitrate)[0];

    // return Response.json({ success: true, data: stream.url });

    const html = await Deno.readTextFile("music.html");

    // console.log(encodeURIComponent(stream.url));

    return new Response(
      html
        .replace("$0$", encodeURIComponent(stream.url))
        .replace("$1$", cover)
        .replace("$2$", name)
        .replace("$3$", artists),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
