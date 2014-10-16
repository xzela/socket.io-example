var app = require('express')();
var http = require('http');
var path = require('path');

app.listen(3001, function () {
	console.log('[socket.io]', "creating listner for Socket.io on port:", 3001);
});

// inital route
app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// start up the server
var server = require('http').createServer(app).listen(3000, function () {
	console.log('[express]', "creating listener for Express on port:", 3000);
});

var io = require('socket.io')(server);

// connection event
io.on('connection', function (socket) {
	// log which socket has connected
	console.log('[socket.io]', 'socket:', socket.id, 'has connected');
	// listen for `chatmessage` event
	socket.on('chatmessage', function (msg) {
		console.log('[socket.io]', 'socket:', socket.id, 'sez:', msg);
		// broadcast 'chatmessage' event to everyone
		io.emit('chatmessage', msg);
	});
	// clean up
	socket.on('disconnect', function () {
		console.log('[socket.io]', 'socket:', socket.id, 'has disconnected');
	})
});
