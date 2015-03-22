var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var vids = "http://gdata.youtube.com/feeds/api/playlists/PLUfG5WpANuJpIm62ldjjpunTRb3hABEA4?v=2&alt=jsonc";
var request = require('superagent');
var port = 5000;

app.use(express.static(__dirname + '/public'));

function process(arr) {
	return arr.map(function(item) {
		return {
			title: item.video.title,
			url: 'www.youtube.com/watch?v=' + item.video.id
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