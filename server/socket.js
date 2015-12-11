var io = require("socket.io")();
var db = require("./database");

var EVENT_HELLO = "hello";
var EVENT_BEFORE_DISCONNECT = "before disconnect";
var EVENT_CHAT = "chat";
var EVENT_ERROR = "error";

io.on("connection", function(socket){
	handleConnect(socket);
	registerHelloEvent(socket);
	registerBeforeDisconnectEvent(socket);
	registerTransferMessageEvent(socket);
});

function handleConnect(socket){
	console.log(socket.id + " has connected");
}

function registerHelloEvent(socket){
	socket.on(EVENT_HELLO, function(data){
		if(!isValidData(data, checkUser)){ return; }
		console.log(makeName(data) + " has joined");
		broadcastMessage(EVENT_HELLO, data);
	});
}

function registerBeforeDisconnectEvent(socket){
	socket.on(EVENT_BEFORE_DISCONNECT, function(data){
		if(!data.user){ return; }
		console.log(makeName(data) + " has disconnected");
		broadcastMessage(EVENT_BEFORE_DISCONNECT, data);
	});
}

function registerTransferMessageEvent(socket){
	socket.on(EVENT_CHAT, function(data){
		if(!isValidData(data, checkUser)){ return; }
		if(!isValidData(data, checkMessage)){ return; }
		console.log(makeName(data) + " : " + data.message);
		db.saveMessage(data);
		broadcastMessage(EVENT_CHAT, data);
	});
}

function broadcastMessage(event, data){
	io.emit(event, data, event);
}

function makeName(data){
	return data.user + "#" + data.id;
}

function isValidData(data, checkWhatFunc){
	var response = {};
	checkWhatFunc(data, response);
	if(response.message){
		io.to(data.id).emit(EVENT_ERROR, response);
		return false;
	}
	return true;
}

function checkUser(data, response){
	if(!data.user || data.user === ""){
		response.message = "username can't be empty!";
	}
}

function checkMessage(data, response){
	if(!data.message || data.message === ""){
		response.message = "message can't be empty!";
	}
}

module.exports = io;
