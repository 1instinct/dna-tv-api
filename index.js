var express = require('express');
var app = express();
var vids = "http://gdata.youtube.com/feeds/api/playlists/PLUfG5WpANuJpIm62ldjjpunTRb3hABEA4?v=2&alt=jsonc&max-results=50";
var request = require('superagent');
var port = 8080;
var vids2 = "http://gdata.youtube.com/feeds/api/playlists/PLUfG5WpANuJpIm62ldjjpunTRb3hABEA4?v=2&alt=jsonc&max-results=50";

// Merges both arrays and gets unique items
var vidList = arrayUnique(vids.concat(vids2));

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://dev.galoremag.com');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

function process(arr) {
	return arr.map(function(item) {
		return {
			url: item.video.id,
			_id: item.id,
			title: item.video.title
		}
	});
}

function arrayUnique(array) {
    var a = arr.concat();
    for(var i=0; i<a.length; ++i) {
        for(var j=i+1; j<a.length; ++j) {
            if(a[i] === a[j])
                a.splice(j--, 1);
        }
    }
    return a;
};

app.get('/vids', function (req, res) {
	request.get(vidList).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vidList = process(response.body.data.items);
			res.status(200).send(vidList);
		}
	});
});

app.listen(port, function() {
	console.log("Node app is running at localhost:" + port);
});