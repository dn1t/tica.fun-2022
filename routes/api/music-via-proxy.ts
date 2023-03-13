import { HandlerContext } from "$fresh/server.ts";
import getAudioUrls from "../../lib/music/getAudioUrls.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  try {
    const trackRes = await fetch(
      `https://api.allorigins.win/raw?url=${encodeURIComponent(
        req.url.replace("http://localhost:8000", "https://tica.fun").replace("music-via-proxy", "track")
      )}`
    );

    const {
      data: { videoId, name, artists, cover },
    }: { data: { videoId: string; name: string; artists: string; cover: string } } = await trackRes.json();

    console.log(videoId);

    const streams = await getAudioUrls(videoId);
    if (!streams) return Response.json({ success: false, message: "stream not found" });

    const stream = streams.sort((a, b) => b.bitrate - a.bitrate)[0];

    const html = await Deno.readTextFile("music.html");

    return new Response(
      html.replace("$0$", stream.url).replace("$1$", cover).replace("$2$", name).replace("$3$", artists),
      { headers: { "Content-Type": "text/html" } }
    );
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: "error" });
  }
};
