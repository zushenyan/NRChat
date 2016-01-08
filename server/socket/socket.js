var io = require("socket.io")();
var db = require("../db/db");
var socketEvent = require("./socketEvent");
var clientMessage = require("./clientMessage");

/* client sent chat message format
{
	who: "ggyy",
	body: "hello how are you"
	id: "this socket's ID"
}
*/

/* server sent chat message format
{
	who: "ggyy",
	body: "hello",
	date: Date.now()
}
*/

/* server sent system message format
	plain string, no json.
*/

io.on("connection", function(socket){
	handleConnect(socket);
	registerJoinEvent(socket);
	registerLeaveEvent(socket);
	registerChatEvent(socket);
});

function handleConnect(socket){
	console.log(socket.id + " has connected.");
}

function registerJoinEvent(socket){
	socket.on(socketEvent.JOIN, function(data){
		data = JSON.parse(data);
		if(!isValidData(data)){ return; }
		var message = data.who + " has joined the room.";
		console.log(message);
		io.emit(socketEvent.JOIN, message);
	});
}

function registerLeaveEvent(socket){
	socket.on(socketEvent.LEAVE, function(data){
		data = JSON.parse(data);
		isValidData(data);
		var message = data.who + " has left the room.";
		console.log(message);
		io.emit(socketEvent.LEAVE, message);
	});
}

function registerChatEvent(socket){
	socket.on(socketEvent.CHAT, function(data){
		data = JSON.parse(data);
		if(!isValidData(data)){ return; }
		console.log(data.who + " : " + data.body);
		data.date = new Date(Date.now());
		db.createMessage(data.who, data.body, data.date);
		io.emit(socketEvent.CHAT, data);
	});
}

function isValidData(data){
	if(!clientMessage.isValid(data)){
		io.to(data.id).emit(socketEvent.ERROR, "'who', 'body' and 'id' fields can't be empty.");
		return false;
	}
	return true;
}

module.exports = io;
