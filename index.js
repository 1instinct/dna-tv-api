const express = require("express");
const request = require("superagent");

// const pingdomApi = require('pingdom-api')({
//   user: 'aaron@instinct.is',
//   pass: 'goU6e?QV0efwHL0nwe',
//   // appkey: 'ji2zs0uh04olzkfhgc6l6h2r1qe6essq'
//   apiKey: 'cZt54UaHSE_HbmkIFz8XJyCkHzA77_v_N5UfOU4pq5xK7FT9YMftaqHxMafOEWQUMVyBuAw'
// });

const app = express();
const port = 8000;
// const port = 3001;

const config = require("./config.json");

const youTubePlaylistItems =
  "https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=";

const maxResults = config.maxResults;
const apiKey = config.apiKey;

// Get Playlists by Channel Id
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s&maxResults=33

// const askPushUrl = youTubePlaylistItems+maxResults+'&playlistId='+config.playlists.askPush+'&key='+apiKey;
const beautyConfessionalUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.beautyConfessional +
  "&key=" +
  apiKey;
const bombshellOnStreetUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.bombshellOnStreet +
  "&key=" +
  apiKey;
const etceteraUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.etcetera +
  "&key=" +
  apiKey;
const exclusivesUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.exclusives +
  "&key=" +
  apiKey;
const featuredUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.featured +
  "&key=" +
  apiKey;
const girlsUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.girls +
  "&key=" +
  apiKey;
// const inBedUrl = youTubePlaylistItems+maxResults+'&playlistId='+config.playlists.inBed+'&key='+apiKey;
const liveFromUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.liveFrom +
  "&key=" +
  apiKey;
const model20Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.model20 +
  "&key=" +
  apiKey;
const mostPopularUrl =
  "https://www.googleapis.com/youtube/v3/search?key=" +
  apiKey +
  "&channelId=" +
  config.channelId +
  "&part=snippet&order=viewCount&maxResults=" +
  maxResults;
const originalsUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.originals +
  "&key=" +
  apiKey;
const originalsTwoUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.originalsTwo +
  "&key=" +
  apiKey;
const showsUrl =
  "https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=" +
  config.channelId +
  "&key=" +
  apiKey +
  "&maxResults=" +
  maxResults;
const specialsUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.specials +
  "&key=" +
  apiKey;
const teachMeUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.teachMe +
  "&key=" +
  apiKey;
const theLatestUrl =
  "https://www.googleapis.com/youtube/v3/search?key=" +
  apiKey +
  "&channelId=" +
  config.channelId +
  "&part=snippet&order=date&maxResults=" +
  maxResults;
const uncoveredUrl =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.uncovered +
  "&key=" +
  apiKey;
const vintage1Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.vintage1 +
  "&key=" +
  apiKey;
const vintage2Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.vintage2 +
  "&key=" +
  apiKey;
const vintage3Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.vintage3 +
  "&key=" +
  apiKey;
const vintage4Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.vintage4 +
  "&key=" +
  apiKey;
const vintage5Url =
  youTubePlaylistItems +
  maxResults +
  "&playlistId=" +
  config.playlists.vintage5 +
  "&key=" +
  apiKey;

const {
  process,
  processLatest,
  processIds,
  processShows,
  processList,
  processFeatures,
  processSpecials,
  processOther,
  processDifferent,
  processVideo,
} = require("./parsers");

// pingdomApi.getChecks({
//   target: 'someCheckId',
//   qs: {
//     limit: 10
//   }
// }, function (err, checks, response) {
//   console.log(err, checks);
// });

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const handleRequest = (url, processFunc, res) => {
  console.log("URL", url);
  if (!url) {
    console.log("No URL");
    res.status(404).send("No URL");
    return;
  }
  request.get(url).end((err, response) => {
    if (err) {
      console.log(err);
      res.status(404).send(err);
    } else {
      const processedData = processFunc(response.body.items);
      res.status(200).send(processedData);
    }
  });
};

console.log("Playlists:", config.playlists);

app.get("/shows", (req, res) => handleRequest(showsUrl, processShows, res));
// app.get('/askPush', (req, res) => handleRequest(askPushUrl, processDifferent, res)); // ✅
app.get("/beautyConfessional", (req, res) =>
  handleRequest(beautyConfessionalUrl, processList, res)
); // ✅
app.get("/bombshellOnStreet", (req, res) =>
  handleRequest(bombshellOnStreetUrl, processList, res)
); // ✅
app.get("/etcetera", (req, res) =>
  handleRequest(etceteraUrl, processSpecials, res)
); // ✅
app.get("/exclusives", (req, res) =>
  handleRequest(exclusivesUrl, processSpecials, res)
); // ✅
app.get("/featured", (req, res) =>
  handleRequest(featuredUrl, processFeatures, res)
);
app.get("/girls", (req, res) => handleRequest(girlsUrl, processList, res));
// app.get('/inBed', (req, res) => handleRequest(inBedUrl, processList, res));
app.get("/latest", (req, res) =>
  handleRequest(theLatestUrl, processLatest, res)
);
app.get("/liveFrom", (req, res) =>
  handleRequest(liveFromUrl, processSpecials, res)
);
app.get("/model20", (req, res) =>
  handleRequest(model20Url, processSpecials, res)
);
app.get("/mostPopular", (req, res) =>
  handleRequest(mostPopularUrl, processDifferent, res)
);
app.get("/originals", (req, res) =>
  handleRequest(originalsUrl, processList, res)
);
app.get("/originalsTwo", (req, res) =>
  handleRequest(originalsTwoUrl, processList, res)
);
app.get("/specials", (req, res) =>
  handleRequest(specialsUrl, processSpecials, res)
);
app.get("/teachMe", (req, res) => handleRequest(teachMeUrl, processList, res));
app.get("/uncovered", (req, res) =>
  handleRequest(uncoveredUrl, processList, res)
);
app.get("/vintage/1", (req, res) =>
  handleRequest(vintage1Url, processList, res)
);
app.get("/vintage/2", (req, res) =>
  handleRequest(vintage2Url, processList, res)
);
app.get("/vintage/3", (req, res) =>
  handleRequest(vintage3Url, processList, res)
);
app.get("/vintage/4", (req, res) =>
  handleRequest(vintage4Url, processList, res)
);
app.get("/vintage/5", (req, res) =>
  handleRequest(vintage5Url, processList, res)
);
app.get("/video/:id", (req, res) => {
  // console.log("RES: ", res);
  console.log("REQ: ", req);
  handleRequest(
    "https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" +
      req.params.id +
      "&key=" +
      apiKey,
    processVideo,
    res
  );
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
