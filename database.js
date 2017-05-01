console.log("database.js")
var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/mydatabase' || 'mongodb://DJTrac:Cones69@ds121091.mlab.com:21091/heroku_wlx3nln5';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
	if(error){
		console.log(error);
	} 
	db = databaseConnection;
});

app.post('/addScore', function(request, response){
	response.header("Access-Control-Allow-Origin", "*");
	response.header("Access-Control-Allow-Headers", "X-Requested-With");

	var username = request.body.username;
	var score = request.body.score;
	var results = {};

	score = parseFloat(score);

	var toInsert = {
		"username":username,
		"score":score
	}

	console.log(toInsert);

	db.collection('scores', function(error, collection) {
		collection.insert(toInsert, function(errorUpdate, result){
			db.collection('scores', function(errorCollection, scoresCollection){
				scoresCollection.find({}).toArray(function(errorFind, scores) {
					results.scores = scores;
					response.send(results);	
				});
			});
		});
	});

});

app.get('/getScore', function(request, response){
	var usernameRequest = undefined;
	if(request.query.username){
		usernameRequest = request.query.username;
		console.log("username:" + usernameRequest)
	}
	if(usernameRequest == undefined || usernameRequest == null){
		db.collection('scores', function(error, collection){
			collection.find({}, function(error, result){
				console.log(result);
				if(!result){
					response.send("{}");
				} else {
					response.send(result);
				}
			});
		});
		response.send("{}");
	} else {
		db.collection('scores', function(error, collection){
			console.log("second username:"+usernameRequest);
			collection.findOne({username:usernameRequest}, function(error, result) {
				if(!result) {
					response.send("{}");
				} else {
					response.send(result);
				}
			});
		});
	}
}); 

app.listen(process.env.PORT || 3000, function(){
	console.log("listening");
});
