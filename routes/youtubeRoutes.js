const express = require("express");
const router = express.Router();
const request = require("superagent");

const {
  showsUrl,
  beautyConfessionalUrl,
  bombshellOnStreetUrl,
  etceteraUrl,
  exclusivesUrl,
  featuredUrl,
  girlsUrl,
  theLatestUrl,
  liveFromUrl,
  model20Url,
  mostPopularUrl,
  originalsUrl,
  originalsTwoUrl,
  specialsUrl,
  teachMeUrl,
  uncoveredUrl,
  vintage1Url,
  vintage2Url,
  vintage3Url,
  vintage4Url,
  vintage5Url,
} = require("../config/constants");

const {
  process,
  processLatest,
  processShows,
  processList,
  processFeatures,
  processSpecials,
  processDifferent,
  processVideo,
} = require("../parsers/youtubeParser");

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

router.get("/shows", (req, res) => handleRequest(showsUrl, processShows, res));
router.get("/beautyConfessional", (req, res) =>
  handleRequest(beautyConfessionalUrl, processList, res)
);
router.get("/bombshellOnStreet", (req, res) =>
  handleRequest(bombshellOnStreetUrl, processList, res)
);
router.get("/etcetera", (req, res) =>
  handleRequest(etceteraUrl, processSpecials, res)
);
router.get("/exclusives", (req, res) =>
  handleRequest(exclusivesUrl, processSpecials, res)
);
router.get("/featured", (req, res) =>
  handleRequest(featuredUrl, processFeatures, res)
);
router.get("/girls", (req, res) => handleRequest(girlsUrl, processList, res));
router.get("/latest", (req, res) =>
  handleRequest(theLatestUrl, processLatest, res)
);
router.get("/liveFrom", (req, res) =>
  handleRequest(liveFromUrl, processSpecials, res)
);
router.get("/model20", (req, res) =>
  handleRequest(model20Url, processSpecials, res)
);
router.get("/mostPopular", (req, res) =>
  handleRequest(mostPopularUrl, processDifferent, res)
);
router.get("/originals", (req, res) =>
  handleRequest(originalsUrl, processList, res)
);
router.get("/originalsTwo", (req, res) =>
  handleRequest(originalsTwoUrl, processList, res)
);
router.get("/specials", (req, res) =>
  handleRequest(specialsUrl, processSpecials, res)
);
router.get("/teachMe", (req, res) =>
  handleRequest(teachMeUrl, processList, res)
);
router.get("/uncovered", (req, res) =>
  handleRequest(uncoveredUrl, processList, res)
);
router.get("/vintage/1", (req, res) =>
  handleRequest(vintage1Url, processList, res)
);
router.get("/vintage/2", (req, res) =>
  handleRequest(vintage2Url, processList, res)
);
router.get("/vintage/3", (req, res) =>
  handleRequest(vintage3Url, processList, res)
);
router.get("/vintage/4", (req, res) =>
  handleRequest(vintage4Url, processList, res)
);
router.get("/vintage/5", (req, res) =>
  handleRequest(vintage5Url, processList, res)
);
router.get("/video/:id", (req, res) => {
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

module.exports = router;
