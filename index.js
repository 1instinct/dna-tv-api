var express = require('express');
var app = express();

// var Youtube = require("youtube-api");

// var API_KEY = 'AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// var channelId = 'UCyzzsgpNlmLBKYcXLM3Ro3g';
// var plid = 'PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G';
var maxResults = '33';

// GaloreTV 1
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b?v=2&alt=jsonc&max-results=49";
// Galore TV 2
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr?v=2&alt=jsonc&max-results=49";
// GaloreTV 3
// var vids = "https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Cid%2Cplayer&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&maxResults=33&key=AIzaSyBLyj8zZcwPLTtQeTvA9j-fXCGZrMoz6TI";
// var vids = 'https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Cid%2Cplayer&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&maxResults=33&key=AIzaSyBVG4a32otoscjnNXbuw9lg1LwC2AvWss0';
var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

var request = require('superagent');
var port = 8080;

// Youtube.authenticate({
//     type: "key",
// 	key: "AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s"
// });

// YouTube.Videos.List listVideosRequest = youtube.videos().list("snippet").setId(videoId);
//           listVideosRequest.setKey(API_KEY);
//           VideoListResponse listResponse = listVideosRequest.execute();

function process(arr) {
	return arr.map(function(items) {
		return {
			url: items.snippet.resourceId.videoId,
			_id: items.id,
			title: items.snippet.title
		}
	});
}

app.get('/vids', function (req, res) {
	request.get(vids).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vids = process(response.body.items);
			res.status(200).send(vids);
		}
	});
});

// app.get('/vids', function (req, res) {
// 	Youtube.playlists.list({
// 		"id": "PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b",
// 	    "part": "contentDetails",
// 		// "mySubscribers": true,
// 		"maxResults": 50
// 		}, function (err, data) {
// 	    	console.log(err, data);
// 	});
// });

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});