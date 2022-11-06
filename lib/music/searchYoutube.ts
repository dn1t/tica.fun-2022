export async function searchTrack(name: string, artists: string[]) {
  const searchQuery = `${artists.join(", ")} - ${name}`;

  const res = await fetch(
    `https://music.youtube.com/youtubei/v1/search?alt=json&key=AIzaSyC9XL3ZjWddXya6X74dJoCTL-WEYFDNX30`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent":
          "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)",
        origin: "https://music.youtube.com",
      },
      body: JSON.stringify({
        context: {
          capabilities: {},
          client: {
            clientName: "WEB_REMIX",
            clientVersion: "0.1",
          },
        },
        params: "EgWKAQIIAWoKEAoQCRADEAQQBQ%3D%3D",
        query: searchQuery,
      }),
    }
  );
  const data = await res.json();
  const videos: {
    videoId: string;
    name: string;
    artists: string[];
    cover: string;
  }[] = data.contents.tabbedSearchResultsRenderer.tabs[0].tabRenderer.content.sectionListRenderer.contents[0].musicShelfRenderer.contents.map(
    // deno-lint-ignore no-explicit-any
    (content: any) => {
      const videoId =
        content.musicResponsiveListItemRenderer.flexColumns[0]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[0]
          .navigationEndpoint.watchEndpoint.videoId;

      const name =
        content.musicResponsiveListItemRenderer.flexColumns[0]
          .musicResponsiveListItemFlexColumnRenderer.text.runs[0].text;

      const artists =
        content.musicResponsiveListItemRenderer.flexColumns[1].musicResponsiveListItemFlexColumnRenderer.text.runs
          // deno-lint-ignore no-explicit-any
          .map((item: any) => {
            if (
              item.navigationEndpoint?.browseEndpoint
                .browseEndpointContextSupportedConfigs
                .browseEndpointContextMusicConfig.pageType ===
              "MUSIC_PAGE_TYPE_ARTIST"
            )
              return item.text;
            else return;
          })
          // deno-lint-ignore no-explicit-any
          .filter((item: any) => item !== undefined);

      const cover = (
        Object.values(
          content.musicResponsiveListItemRenderer.thumbnail
            .musicThumbnailRenderer.thumbnail.thumbnails
        ).reverse()[0] as { url: string }
      ).url;

      return { videoId, name, artists, cover };
    }
  );

  // const { bestMatchIndex } = findBestMatch(
  //   searchQuery,
  //   videos.map((video) => `${video.artists.join(", ")} - ${video.name}`)
  // );

  return videos[0];
}
