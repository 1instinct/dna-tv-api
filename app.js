require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const corsMiddleware = require("./middlewares/corsMiddleware");
const youtubeRoutes = require("./routes/youtubeRoutes");

app.use(corsMiddleware);

app.use(bodyParser.json());

app.use("/api/youtube", youtubeRoutes);

// console.log("Playlists:", config.playlists);

app.use("/api/youtube", youtubeRoutes);

const port = process.env.PORT || 3001;
// const port = 3001;
// console.log("PORT: ", port);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
