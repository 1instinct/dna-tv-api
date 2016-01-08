var express = require('express'),
	app = express(),

	request = require('superagent'),
	cloudinary = require('cloudinary'),
	port = 80,

	maxResults = '33',
	
	listVintage1 = 'PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b',
	listVintage2 = 'PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr',
	listVintage3 = 'PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH',
	listVintage4 = 'PLPp3tIzLUEwaWgJtRGfkzkSot2ELUCR-l',
	listVintage5 = 'PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD',

	listFeatured = 'PLx0X0-cKhSOBYY6KXhQZg4dmK5pyGQk-o',
	listLiveFrom = 'PLx0X0-cKhSOChWAkkEvSDv1nWfdIzXr9M',
	listAskPush = 'PLx0X0-cKhSOAgUD3PjNTnEh4Unqgz1MxL',
	listModel20 = 'PLx0X0-cKhSOAnlBpACK4BF2zR1MAZ4vLY',
	listTeachMe = 'PLx0X0-cKhSOCCIGzz4vEy-KVhJ5JYuTFQ',
	listGirls = 'PLx0X0-cKhSOCDflvS223SK4XELsHhuCCg',
	listInBed = 'PLx0X0-cKhSOAr0sep7jVg4Yya7IU-Q-zv',
	listBombshells = 'PLx0X0-cKhSOAmazTrHEZHSSc3RLQC6tQT',
	listExclusives = 'PLx0X0-cKhSOBXGK3Yr11j1HLa_ccrNO2G',

	accessToken = '1/Dt5cBhLxKG_EjyWZxYEJ7oADupiaJmrl_G_846BZ1mZIgOrJDtdun6zK6XiATCKT',
	apiKey = 'AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s',
	chanID = 'UCyzzsgpNlmLBKYcXLM3Ro3g',

	featured = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listFeatured+'&key='+apiKey,
	shows = 'https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId='+chanID+'&key='+apiKey+'&maxResults='+maxResults,
	theLatest = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet&order=date&maxResults='+maxResults,
	mostPopular = 'https://www.googleapis.com/youtube/v3/search?key='+apiKey+'&channelId='+chanID+'&part=snippet&order=viewCount&maxResults='+maxResults,

// Get Playlists by Channel Id
// https://www.googleapis.com/youtube/v3/playlists?part=snippet&channelId=UCyzzsgpNlmLBKYcXLM3Ro3g&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s&maxResults=33

// GaloreTV 1
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwaZfRUCuw1aJbDrTdgdm07b&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 2
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwYySnVu0xLsKr13quhabBGr&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 3
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwbkwSfDML6R12DCI5XwG6LH&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';
// Galore TV 4
	vintage = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listVintage4+'&key='+apiKey,
// Galore TV 5
// var vids = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=33&playlistId=PLPp3tIzLUEwbukcmLprg-s4qOdw9mCEPD&key=AIzaSyA0Ts8r7AdSbimwPQFKmbjQM8QKitGE95s';

	liveFrom = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listLiveFrom+'&key='+apiKey,
	askPush = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listAskPush+'&key='+apiKey,
	model20 = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listModel20+'&key='+apiKey,
	teachMe = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listTeachMe+'&key='+apiKey,
	girls = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listGirls+'&key='+apiKey,
	inBed = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listInBed+'&key='+apiKey,
	bombshells = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listBombshells+'&key='+apiKey,
	exclusives = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults='+maxResults+'&playlistId='+listExclusives+'&key='+apiKey;

cloudinary.config({ 
  cloud_name: 'galore', 
  api_key: '789423776114718', 
  api_secret: 'BXCCmMwEuhohSFCpz7QL-gUV3oY' 
});

function process(arr) {
	return arr.map(function(items) {
		return {
			url: items.id.videoId,
			_id: items.id.videoId,
			title: items.snippet.title,
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			thumb: items.snippet.thumbnails.medium.url
		}
	});
};

function processShow(arr) {
	return arr.map(function(items) {
		return {
			url: items.id,
			_id: items.id,
			title: items.snippet.title,
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			thumb: cloudinary.url("Galore TV Shows/model20-01.jpg", {secure: true, width: 320, height: 180, crop: 'fill'})
		}
	});
};

function processList(arr) {
	return arr.map(function(items) {
		return {
			url: items.snippet.resourceId.videoId,
			_id: items.snippet.resourceId.videoId,
			title: items.snippet.title,
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			list: items.snippet.playlistId,
			thumb: items.snippet.thumbnails.medium.url
		}
	});
};

function processOther(arr) {
	return arr.map(function(items) {
		return {
			url: items.snippet.resourceId.videoId,
			_id: items.snippet.resourceId.videoId,
			title: items.snippet.title,
			desc: items.snippet.description,
			date: items.snippet.publishedAt,
			list: items.snippet.playlistId,
			thumb: 'https://i.ytimg.com/vi/' + items.snippet.resourceId.videoId + '/mqdefault.jpg'
		}
	});
};

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/shows', function (req, res) {
	request.get(shows).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var shows = processShow(response.body.items);
			res.status(200).send(shows);
		}
	});
});

app.get('/theLatest', function (req, res) {
	request.get(theLatest).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var theLatest = process(response.body.items);
			res.status(200).send(theLatest);
		}
	});
});

app.get('/featured', function (req, res) {
	request.get(featured).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var featured = processList(response.body.items);
			res.status(200).send(featured);
		}
	});
});

app.get('/mostPopular', function (req, res) {
	request.get(theLatest).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var theLatest = process(response.body.items);
			res.status(200).send(theLatest);
		}
	});
});

app.get('/vintage', function (req, res) {
	request.get(vintage).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var vintage = processOther(response.body.items);
			res.status(200).send(vintage);
		}
	});
});

app.get('/liveFrom', function (req, res) {
	request.get(liveFrom).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var liveFrom = processList(response.body.items);
			res.status(200).send(liveFrom);
		}
	});
});

app.get('/askPush', function (req, res) {
	request.get(askPush).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var askPush = processList(response.body.items);
			res.status(200).send(askPush);
		}
	});
});

app.get('/model20', function (req, res) {
	request.get(model20).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var model20 = processList(response.body.items);
			res.status(200).send(model20);
		}
	});
});

app.get('/teachMe', function (req, res) {
	request.get(teachMe).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var teachMe = processList(response.body.items);
			res.status(200).send(teachMe);
		}
	});
});

app.get('/girls', function (req, res) {
	request.get(girls).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var girls = processList(response.body.items);
			res.status(200).send(girls);
		}
	});
});

app.get('/inBed', function (req, res) {
	request.get(inBed).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var inBed = processList(response.body.items);
			res.status(200).send(inBed);
		}
	});
});

app.get('/bombshells', function (req, res) {
	request.get(bombshells).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var bombshells = processList(response.body.items);
			res.status(200).send(bombshells);
		}
	});
});

app.get('/exclusives', function (req, res) {
	request.get(exclusives).end(function(err,response) {
		if (err) {
			console.log(err);
			res.status(404).send(err);
		} else {
			var exclusives = processOther(response.body.items);
			res.status(200).send(exclusives);
		}
	});
});

var server = app.listen(port, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});

// app.listen(port, function() {
// 	console.log("Node app is running at localhost:" + port);
// });