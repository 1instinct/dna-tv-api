const config = require("../config/config.json");
const API_KEY = process.env.API_KEY;

const BASE_URL = "https://www.googleapis.com/youtube/v3";
const PLAYLIST_ITEMS = `${BASE_URL}/playlistItems?part=snippet`;
const SEARCH = `${BASE_URL}/search?part=snippet`;

const buildUrl = (type, playlistId) => {
  if (type === "search") {
    return `${SEARCH}&key=${API_KEY}&channelId=${config.channelId}&order=viewCount&maxResults=${config.maxResults}`;
  } else if (type === "latest") {
    return `${SEARCH}&key=${API_KEY}&channelId=${config.channelId}&order=date&maxResults=${config.maxResults}`;
  } else {
    return `${PLAYLIST_ITEMS}&maxResults=${config.maxResults}&playlistId=${playlistId}&key=${API_KEY}`;
  }
};

module.exports = {
  beautyConfessionalUrl: buildUrl(
    "playlist",
    config.playlists.beautyConfessional
  ),
  bombshellOnStreetUrl: buildUrl(
    "playlist",
    config.playlists.bombshellOnStreet
  ),
  etceteraUrl: buildUrl("playlist", config.playlists.etcetera),
  exclusivesUrl: buildUrl("playlist", config.playlists.exclusives),
  featuredUrl: buildUrl("playlist", config.playlists.featured),
  girlsUrl: buildUrl("playlist", config.playlists.girls),
  liveFromUrl: buildUrl("playlist", config.playlists.liveFrom),
  model20Url: buildUrl("playlist", config.playlists.model20),
  mostPopularUrl: buildUrl("search"),
  originalsUrl: buildUrl("playlist", config.playlists.originals),
  originalsTwoUrl: buildUrl("playlist", config.playlists.originalsTwo),
  showsUrl: `${BASE_URL}/playlists?part=snippet&channelId=${config.channelId}&key=${API_KEY}&maxResults=${config.maxResults}`,
  specialsUrl: buildUrl("playlist", config.playlists.specials),
  teachMeUrl: buildUrl("playlist", config.playlists.teachMe),
  theLatestUrl: buildUrl("latest"),
  uncoveredUrl: buildUrl("playlist", config.playlists.uncovered),
  vintage1Url: buildUrl("playlist", config.playlists.vintage1),
  vintage2Url: buildUrl("playlist", config.playlists.vintage2),
  vintage3Url: buildUrl("playlist", config.playlists.vintage3),
  vintage4Url: buildUrl("playlist", config.playlists.vintage4),
  vintage5Url: buildUrl("playlist", config.playlists.vintage5),
};
