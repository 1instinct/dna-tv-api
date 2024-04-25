function isPrivate(video) {
  if (video.snippet.title.indexOf("Private video") > -1) {
    return true;
  }
  return false;
}

function hiRes(img, video) {
  if ("maxres" in img) {
    return video.snippet.thumbnails.maxres.url;
  } else if ("standard" in img) {
    return video.snippet.thumbnails.standard.url;
  } else if ("high" in img) {
    return video.snippet.thumbnails.high.url;
  } else if ("medium" in img) {
    return video.snippet.thumbnails.medium.url;
  } else if ("default" in img) {
    return null;
  } else {
    return null;
  }
}

function makeSlug(title) {
  let str = title;
  str = str.replace(/[^a-zA-Z0-9\s]/g, "");
  str = str.toLowerCase();
  str = str.replace(/\s/g, "-");
  str = str.replace(/^-+|-+$|(-)+/g, "$1");
  return str;
}

function escapeRegExp(str) {
  return str.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(str, find, replace) {
  return str.replace(new RegExp(escapeRegExp(find), "g"), replace);
}

function processLatest(videos) {
  // console.log("VIDEOS: ", videos);
  return videos
    .filter((video) => !isPrivate(video))
    .map(function (video) {
      // console.log("VIDEO: ", video);
      const videoId = video.id.videoId;
      const cleanTitle = replaceAll(video.snippet.title, " | Galore TV", "");

      return {
        id: videoId,
        url: videoId,
        title: cleanTitle,
        slug: makeSlug(cleanTitle),
        desc: video.snippet.description,
        date: video.snippet.publishedAt,
        thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_sddefault: hiRes(video.snippet.thumbnails, video),
      };
    });
}

function processShows(playlists) {
  return playlists
    .filter((playlist) => !isPrivate(playlist))
    .map(function (playlist) {
      function makeSlug(title) {
        var str = title;
        str = str.replace(/[^a-zA-Z0-9\s]/g, "");
        str = str.toLowerCase();
        str = str.replace(/\s/g, "-");
        str = str.replace(/^-+|-+$|(-)+/g, "$1");
        return str;
      }
      const cleanTitle = replaceAll(playlist.snippet.title, " | Galore TV", "");

      return {
        id: playlist.id,
        url: playlist.id,
        title: cleanTitle,
        slug: makeSlug(cleanTitle),
        desc: playlist.snippet.description,
        date: playlist.snippet.publishedAt,
        thumb_mqdefault: hiRes(playlist.snippet.thumbnails, playlist),
        thumb_hqdefault: hiRes(playlist.snippet.thumbnails, playlist),
        thumb_sddefault: hiRes(playlist.snippet.thumbnails, playlist),
      };
    });
}

function processList(videos) {
  return videos
    .filter((video) => !isPrivate(video))
    .map(function (video) {
      const cleanTitle = replaceAll(video.snippet.title, " | Galore TV", "");

      return {
        url: video.snippet.resourceId.videoId,
        id: video.snippet.resourceId.videoId,
        title: cleanTitle,
        slug: makeSlug(cleanTitle),
        desc: video.snippet.description,
        date: video.snippet.publishedAt,
        listId: video.snippet.playlistId,
        thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_sddefault: hiRes(video.snippet.thumbnails, video),
      };
    });
}

function processDifferent(videos) {
  return videos
    .filter((video) => !isPrivate(video))
    .map(function (video) {
      const cleanTitle = replaceAll(video.snippet.title, " | Galore TV", "");

      return {
        url: video.id.videoId,
        id: video.id.videoId,
        title: cleanTitle,
        slug: makeSlug(cleanTitle),
        desc: video.snippet.description,
        date: video.snippet.publishedAt,
        listId: video.snippet.playlistId,
        thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_sddefault: hiRes(video.snippet.thumbnails, video),
      };
    });
}
function processFeatures(videos) {
  return videos
    .filter((video) => !isPrivate(video))
    .map(function (video) {
      function hiRes(img) {
        if ("maxres" in img == true) {
          return video.snippet.thumbnails.maxres.url;
        } else {
          return video.snippet.thumbnails.high.url;
        }
      }
      const cleanTitle = replaceAll(video.snippet.title, " | Galore TV", "");

      return {
        url: video.snippet.resourceId.videoId,
        title: replaceAll(video.snippet.title, " | Galore TV", ""),
        id: video.snippet.resourceId.videoId,
        featured: true,
        hero: hiRes(video.snippet.thumbnails),
        slug: makeSlug(cleanTitle),
      };
    });
}

function processSpecials(videos) {
  return videos
    .filter((video) => !isPrivate(video))
    .map(function (video) {
      return {
        url: video.snippet.resourceId.videoId,
        id: video.snippet.resourceId.videoId,
        title: replaceAll(video.snippet.title, " | Galore TV", ""),
        desc: video.snippet.description,
        date: video.snippet.publishedAt,
        special: true,
        listId: video.snippet.playlistId,
        thumb_mqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_hqdefault: hiRes(video.snippet.thumbnails, video),
        thumb_sddefault: hiRes(video.snippet.thumbnails, video),
      };
    });
}

function processVideo(video) {
  console.log("SINGLE: ", video);
  const cleanTitle = replaceAll(video[0].snippet.title, " | Galore TV", "");

  return {
    id: video[0].id,
    url: video[0].id,
    title: cleanTitle,
    slug: makeSlug(cleanTitle),
    desc: video[0].snippet.description,
    date: video[0].snippet.publishedAt,
    thumb_mqdefault: video[0].snippet.thumbnails.medium.url,
    thumb_hqdefault: video[0].snippet.thumbnails.high.url,
    thumb_sddefault: video[0].snippet.thumbnails.standard.url,
  };
}

module.exports = {
  processDifferent: processDifferent,
  processLatest: processLatest,
  processList: processList,
  processFeatures: processFeatures,
  processSpecials: processSpecials,
  processShows: processShows,
  processVideo: processVideo,
};
