var io = require("socket.io")();
var db = require("../db/db");
var SocketEvent = require("./socketEvent");
var ClientMessage = require("./clientMessage");
var ServerMessage = require("./serverMessage");

/* client sent chat message format
{
	who: "ggyy",
	body: "hello how are you"
}
*/

/* server sent message format
{
	who: "ggyy",
	body: "hello",
	date: Date.now(),
	event: SocketEvent.JOIN
}
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
	socket.on(SocketEvent.JOIN, function(data){
		if(!isValidData(data, socket.id)){ return; }
		var message = new ServerMessage(data, SocketEvent.JOIN);
		message.body = "has joined the room.";
		console.log([message.who, message.body].join(" "));
		io.emit(SocketEvent.JOIN, message);
	});
}

function registerLeaveEvent(socket){
	socket.on(SocketEvent.LEAVE, function(data){
		isValidData(data, socket.id);
		var message = new ServerMessage(data, SocketEvent.LEAVE);
		message.body = "has left the room.";
		console.log([message.who, message.body].join(" "));
		io.emit(SocketEvent.LEAVE, message);
	});
}

function registerChatEvent(socket){
	socket.on(SocketEvent.CHAT, function(data){
		if(!isValidData(data, socket.id)){ return; }
		var message = new ServerMessage(data, SocketEvent.CHAT);
		console.log([message.who, message.body].join(" : "));
		db.createMessage(message.who, message.body, SocketEvent.CHAT, message.date);
		io.emit(SocketEvent.CHAT, message);
	});
}

function isValidData(data, id){
	if(!ClientMessage.isValid(data)){
		var message = new ServerMessage();
		message.body = "'who' and 'body' fields can't be empty.";
		message.event = SocketEvent.ERROR;
		io.to(id).emit(SocketEvent.ERROR, message);
		return false;
	}
	return true;
}

module.exports = io;
