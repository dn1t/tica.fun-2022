import { HandlerContext } from '$fresh/server.ts';
import Canvas, { loadImage } from 'canvas';
import { create } from 'random-seed';

export const handler = async (
  req: Request,
  _ctx: HandlerContext
): Promise<Response> => {
  const url = new URL(req.url);
  const title = url.searchParams.get('title');

  console.log(title);

  const canvas = Canvas.createCanvas(720, 246);
  const ctx = canvas.getContext('2d');

  const randomIndex = create(title ?? Date.now())(34) + 1;

  const background = await loadImage(`./backgrounds/bg${randomIndex}.png`);
  ctx.drawImage(background, 0, 0, 720, 246);

  if (title) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, 720, 246);

    canvas.loadFont(await Deno.readFile('./fonts/Pretendard-ExtraBold.ttf'), {
      family: 'Pretendard',
    });

    ctx.font = '3rem Pretendard';
    ctx.fillStyle = 'red';

    const metrics = ctx.measureText(title);

    ctx.fillStyle = 'white';
    const height = canvas.height / 2 - 5 + 40 / 2;

    if (metrics.width > 350) {
      const words = title.split(' ');
      const slice = Math.ceil(words.length / 2);

      ctx.font = '2.4rem Pretendard';

      if (
        words.slice(0, slice).join(' ') === '' ||
        words.slice(slice).join(' ') === ''
      ) {
        ctx.fillText(
          title,
          canvas.width / 2 - ctx.measureText(title).width / 2,
          height
        );
      } else {
        ctx.fillText(
          words.slice(0, slice).join(' '),
          canvas.width / 2 -
            ctx.measureText(words.slice(0, slice).join(' ')).width / 2,
          height - 40 / 2 - 3
        );
        ctx.fillText(
          words.slice(slice).join(' '),
          canvas.width / 2 -
            ctx.measureText(words.slice(slice).join(' ')).width / 2,
          height + 40 / 2 + 3
        );
      }
    } else {
      ctx.fillText(title, canvas.width / 2 - metrics.width / 2, height);
    }
  }

  console.log(randomIndex);

  return new Response(canvas.toBuffer());
};
