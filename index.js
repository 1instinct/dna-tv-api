var express = require('express');
var app = express();
var Youtube = require("youtube-api");
// GaloreTV 1
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b?v=2&alt=jsonc&max-results=49";
// Galore TV 2
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr?v=2&alt=jsonc&max-results=49";
// GaloreTV 3
var vids = "https://www.googleapis.com/youtube/v3/playlists?part=id%2C+player&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&maxResults=33&key=AIzaSyD4GXoUQHtAEhNxKm40YkwOR1hPs1EKZhU";
var request = require('superagent');
var port = 8080;

Youtube.authenticate({
    type: "key",
	key: "AIzaSyD4GXoUQHtAEhNxKm40YkwOR1hPs1EKZhU"
});

function process(arr) {
	return arr.map(function(item) {
		return {
			url: item.video.id,
			_id: item.id
			// title: item.video.title
		}
	});
}

app.get('/vids', function (req, res) {
	request.get(vids).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vids = process(response.body.data.items);
			res.status(200).send(vids);
		}
	});
});

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});