import { HandlerContext } from "$fresh/server.ts";
import getAudioUrls from "../../lib/music/getAudioUrls.ts";

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId");
  const name = url.searchParams.get("name");
  const artists = url.searchParams.get("artists");
  const cover = url.searchParams.get("cover");

  if (!(videoId && name && artists && cover))
    return Response.json({
      success: false,
      message: "some parameters are not provided.",
    });

  try {
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
