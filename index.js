var express = require('express');
var app = express();

var maxResults = '33',
	playlist4 = 'PLPp3tIzLUEwaWgJtRGfkzkSot2ELUCR-l',
	apiKey = 'AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

// GaloreTV 1
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 2
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 3
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 4
var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId='+playlist4+'&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key='+apiKey;
// Galore TV 5
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails%2C+snippet&maxResults=33&playlistId=PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD&fields=items(contentDetails%2Cetag%2Cid%2Csnippet%2Cstatus)&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

var request = require('superagent');
var port = 80;

function process(arr) {
	return arr.map(function(items) {
		return {
			url: items.snippet.resourceId.videoId,
			_id: items.id,
			title: items.snippet.title
		}
	});
}

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', function (req, res) {
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

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});