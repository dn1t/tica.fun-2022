export interface AudioInfo {
  bitrate: number;
  size: number;
  url: string;
}

async function getPageSource(url: string): Promise<string> {
  try {
    const res = await fetch(url);
    const html = await res.text();

    return html;
  } catch (_) {
    return '';
  }
}

function getPlayer(source: string): string {
  if (!source) return '';

  const matches = source.match(/ytInitialPlayerResponse = (.*)}}};/);
  return matches ? matches[1] + '}}}' : '';
}

async function buildDecoder(
  source: string
): Promise<((signatureCipher: string) => string) | null> {
  if (!source) return null;

  const jsMatches = source.match(
    /\/s\/player\/[A-Za-z0-9]+\/[A-Za-z0-9_.]+\/[A-Za-z0-9_]+\/base\.js/
  );
  if (!jsMatches) return null;

  const jsContent = await getPageSource(
    `https://www.youtube.com${jsMatches[0]}`
  );

  const decodeFuncMatches = jsContent.match(
    /function.*\.split\(\"\"\).*\.join\(\"\"\)}/
  );
  if (!decodeFuncMatches) return null;

  const decodeFunc = decodeFuncMatches[0];

  const varNameMatches = decodeFunc.match(/\.split\(\"\"\);([a-zA-Z0-9]+)\./);
  if (!varNameMatches) return null;

  const varDeclareMatches = jsContent.match(
    new RegExp(
      `(var ${varNameMatches[1]}={[\\s\\S]+}};)[a-zA-Z0-9]+\\.[a-zA-Z0-9]+\\.prototype`
    )
  );
  if (!varDeclareMatches) return null;

  return function (signatureCipher: string) {
    // deno-lint-ignore no-explicit-any
    const params: any = new URLSearchParams(signatureCipher);
    const {
      s: signature,
      sp: signatureParam = 'signature',
      url,
    } = Object.fromEntries(params);
    const decodedSignature = eval(`
        "use strict";
        ${varDeclareMatches[1]}
        (${decodeFunc})("${signature}")
    `);

    return `${url}&${signatureParam}=${encodeURIComponent(decodedSignature)}`;
  };
}

async function getAudioUrls(videoId: string): Promise<AudioInfo[] | null> {
  const params = new URLSearchParams();
  params.append('v', videoId);

  const source = await getPageSource(
    `https://www.youtube.com/watch?${params.toString()}`
  );

  try {
    const player = JSON.parse(getPlayer(source));
    const audioData = player.streamingData ?? {};
    let formats = [
      ...(audioData?.formats ?? []),
      ...(audioData?.adaptiveFormats ?? []),
    ].filter((format) => format.mimeType.includes('audio/webm'));

    if (formats.find((format) => format.signatureCipher)) {
      const decoder = await buildDecoder(source);
      if (!decoder) return null;

      formats = formats.map((format) => {
        if (format.url || !format.signatureCipher) return format;

        format.url = decoder(format.signatureCipher);
        delete format.signatureCipher;

        return format;
      });
    }

    return formats.map((format) => ({
      bitrate: format.bitrate,
      size: Number.parseInt(format.contentLength),
      url: format.url,
    }));
  } catch (_) {
    return null;
  }
}

export default getAudioUrls;
