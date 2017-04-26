var express = require('express');
var bodyParser = require('body-parser');
var validator = require('validator');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var mongoUri = process.env.MONGODB_URI || process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://DJTrac:Cones69@ds121091.mlab.com:21091/heroku_wlx3nln5';
var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var db = MongoClient.connect(mongoUri, function(error, databaseConnection) {
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
		"username":username;
		"score":score;
	}

	db.collection('scores', function(error, collection) {
		collection.update({"username":username}, toInsert, {upsert: true}, function(errorUpdate, result){
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
	var usernameRequest = request.query.username;
	if(usernameRequest == undefined || usernameRequest == null){
		response.send("{}");
	} else {
		db.collection('scores', function(error, collection){
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













function displayScore(){
  var scoreTable = document.getElementById(scoretable);
  for (var i = db.score.length - 1; i >= 0; i--) {
    currPlayer = db.score.find();
    scoreTable[i].username = currPlayer.username;
    scoretable[i].score = currPlayer.score;
  };
}
  