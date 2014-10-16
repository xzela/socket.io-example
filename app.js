var app = require('express')();
var http = require('http');
var path = require('path');

var server = require('http').createServer(app).listen(3000, function () {
	console.log("listening to: ", 3000);
});

var io = require('socket.io')(server);

app.listen(3001, function () {
	console.log("listening");
});


app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

io.on('connection', function (socket) {
	console.log('connection made');
});
