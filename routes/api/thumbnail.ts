import { HandlerContext } from "$fresh/server.ts";
import CanvasKit, { createCanvas, loadImage } from "canvas";
import { create } from "random-seed";

const measureText = (text: string, fontInfo: { fontData: Uint8Array; fontSize: number }) => {
  const { fontData, fontSize } = fontInfo;
  const fontMgr = CanvasKit.FontMgr.FromData(fontData);
  if (fontMgr === null) throw new Error("idk why but fontMgr is null");
  const paraStyle = new CanvasKit.ParagraphStyle({
    textStyle: {
      color: CanvasKit.BLACK,
      fontFamilies: [fontMgr.getFamilyName(0)],
      fontSize,
    },
  });
  const builder = CanvasKit.ParagraphBuilder.Make(paraStyle, fontMgr);
  builder.addText(text);
  const paragraph = builder.build();
  paragraph.layout(Infinity);
  const left = Math.max(...paragraph.getLineMetrics().map((l) => l.left));
  const right = paragraph.getLongestLine() + left;
  const ascent = Math.max(...paragraph.getLineMetrics().map((l) => l.ascent));
  const descent = Math.max(...paragraph.getLineMetrics().map((l) => l.descent));
  const height = ascent + descent;
  const width = right;
  const metrics = { ascent, descent, left, right, width, height };
  paragraph.delete();
  fontMgr.delete();
  return metrics;
};

export const handler = async (req: Request, _ctx: HandlerContext): Promise<Response> => {
  const url = new URL(req.url);
  const title = url.searchParams.get("title");

  const canvas = createCanvas(720, 246);
  const ctx = canvas.getContext("2d");

  const randomIndex = create(title ?? Date.now())(34) + 1;

  const background = await loadImage(`./backgrounds/bg${randomIndex}.png`);
  ctx.drawImage(background, 0, 0, 720, 246);

  if (title) {
    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, 720, 246);

    const pretendard = await Deno.readFile("./fonts/Pretendard-ExtraBold.ttf");

    canvas.loadFont(pretendard, { family: "Pretendard" });

    ctx.font = "3rem Pretendard";
    ctx.fillStyle = "red";

    const metrics = measureText(title, { fontData: pretendard, fontSize: 3 * 16 });

    ctx.fillStyle = "white";
    const height = canvas.height / 2 - 5 + 40 / 2;

    console.log(metrics);

    if (metrics.width > 350) {
      const words = title.split(" ");
      const slice = Math.ceil(words.length / 2);

      ctx.font = "2.7rem Pretendard";

      if (words.slice(0, slice).join(" ") === "" || words.slice(slice).join(" ") === "") {
        ctx.fillText(
          title,
          canvas.width / 2 - measureText(title, { fontData: pretendard, fontSize: 2.7 * 16 }).width / 2,
          height
        );
      } else {
        ctx.fillText(
          words.slice(0, slice).join(" "),
          canvas.width / 2 -
            measureText(words.slice(0, slice).join(" "), { fontData: pretendard, fontSize: 2.7 * 16 }).width / 2,
          height - 40 / 2 - 6
        );
        ctx.fillText(
          words.slice(slice).join(" "),
          canvas.width / 2 -
            measureText(words.slice(slice).join(" "), { fontData: pretendard, fontSize: 2.7 * 16 }).width / 2,
          height + 40 / 2 + 6
        );
      }
    } else {
      ctx.fillText(title, canvas.width / 2 - metrics.width / 2, height);
    }
  }

  return new Response(canvas.toBuffer());
};
