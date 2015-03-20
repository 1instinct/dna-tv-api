var express = require('express');
var $ = require('jquery-latest');
var app = express();
var result = '{"FirstName":"John","LastName":"Doe","Email":"johndoe@johndoe.com","Phone":"123 dead drive"}';


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response) {
	$.each($.parseJSON(result), function(k, v) {
		alert(k + ' is ' + v);
	});
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'));
});