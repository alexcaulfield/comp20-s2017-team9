var express = require('express');
var app = express();
var path = require('path');

app.use(express.static(path.join(__dirname)));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

// add other routes below
app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/about.html'));
});

app.get('/index', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/index.html'));
});

app.get('/game', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/game.html'));
});

app.get('/scoreboard', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/scoreboard.html'));
});

// add other routes below
app.get('/howto', function (req, res) {
  res.sendFile(path.join(__dirname + 'views/howto.html'));
});

app.listen(process.env.PORT || 8080);