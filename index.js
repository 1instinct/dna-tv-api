var express = require('express');
var app = express();
var google = require('googleapis');
var urlshortener = google.urlshortener('v1');
var params = { shortUrl: 'http://goo.gl/xKbRu3' };
var Youtube = require("youtube-api");
var API_KEY = 'AIzaSyBVG4a32otoscjnNXbuw9lg1LwC2AvWss0';
var channelId = 'UCyzzsgpNlmLBKYcXLM3Ro3g';
var plid = 'PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G'
var maxResults = '33';

// GaloreTV 1
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b?v=2&alt=jsonc&max-results=49";
// Galore TV 2
// var vids = "https://gdata.youtube.com/feeds/api/playlists/PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr?v=2&alt=jsonc&max-results=49";
// GaloreTV 3
// var vids = "https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Cid%2Cplayer&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&maxResults=33&key=AIzaSyBLyj8zZcwPLTtQeTvA9j-fXCGZrMoz6TI";
var vids = 'https://www.googleapis.com/youtube/v3/playlists?part=contentDetails%2Cid%2Cplayer&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&maxResults=33&key=AIzaSyBVG4a32otoscjnNXbuw9lg1LwC2AvWss0';

var request = require('superagent');
var port = 80;

Youtube.authenticate({
    type: "key",
	key: "AIzaSyD4GXoUQHtAEhNxKm40YkwOR1hPs1EKZhU"
});

Youtube.channels.list({
    "part": "PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b",
    "mySubscribers": true,
    "maxResults": 50
}, function (err, data) {
    console.log(err, data);
});

// YouTube.Videos.List listVideosRequest = youtube.videos().list("snippet").setId(videoId);
//           listVideosRequest.setKey(API_KEY);
//           VideoListResponse listResponse = listVideosRequest.execute();

// get the long url of a shortened url
urlshortener.url.get(params, function (err, response) {
  if (err) {
    console.log('Encountered error', err);
  } else {
    console.log('Long url is', response.longUrl);
  }
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

// List your subcribers 
// Youtube.playlists.list({
//     "part": "contentDetails",
// 	"mySubscribers": true,
// 	"maxResults": 50
// 	}, function (err, data) {
//     	console.log(err || data);
// });

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