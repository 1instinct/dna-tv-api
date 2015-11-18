var express = require('express');
var app = express();

var maxResults = '33';

// Define some variables used to remember state.
// var playlistId, nextPageToken, prevPageToken;

var apiKey = 'AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

var chanID = 'UCyzzsgpNlmLBKYcXLM3Ro3g';

var allVidsID = 'UCyzzsgpNlmLBKYcXLM3Ro3g';

var allVids = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet,id&order=date&maxResults=20
'

// GaloreTV 1
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 2
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 3
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 4
var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwaWgJtRGfkzkSot2ELUCR-l&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 5
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

var request = require('superagent');
var port = 80;

function process(arr) {
	return map(function(items) {
		return {
			url: items.snippet.resourceId.videoId,
			_id: items.id,
			title: items.snippet.title
		}
	});
}

///////

// Call the Data API to retrieve the playlist ID that uniquely identifies the
// list of videos uploaded to the currently authenticated user's channel.
// function requestUserUploadsPlaylistId() {
//   // See https://developers.google.com/youtube/v3/docs/channels/list
//   var request = gapi.client.youtube.channels.list({
//     mine: true,
//     part: 'contentDetails'
//   });
//   request.execute(function(response) {
//     playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
//     requestVideoPlaylist(playlistId);
//   });
// }

///////

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
	request.get(allVids).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var allVids = process(response.body.items);
			res.status(200).send(allVids);
		}
	});
});

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});