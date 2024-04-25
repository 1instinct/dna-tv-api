const request = require("superagent");

exports.getShows = async (req, res) => {
  try {
    const data = await youtubeService.getShows();
    console.log("Playlists:", data);
    res.send(data);
  } catch (error) {
    res.status(500).send(error.message);
  }
};
