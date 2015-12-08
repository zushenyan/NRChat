var bodyParser = require("body-parser");
var db = require("redis").createClient(process.env.REDIS_URL);
var app = require("express")();

// constants
var EVENT_HELLO = "hello";
var EVENT_BEFORE_DISCONNECT = "before disconnect";
var EVENT_CHAT_MESSAGE = "chat message";
var EVENT_SERVER_MESSAGE = "server message";

var PORT = process.env.PORT || 8080;

// start listening
var server = app.listen(PORT, function(){
	console.log("server is listening on " + PORT);
});

// db setup
db.on("err", function(err){ console.log(err); });

// socket io area
var io = require("socket.io")(server);

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
		var username = makeName(data);
		console.log(username + " has joined");
		if(!isValidData(data, checkUser)){ return; }
		data.message = username + " has joined the room.";
		data.from = "server";
		broadcastMessage(data);
	});
}

function registerBeforeDisconnectEvent(socket){
	socket.on(EVENT_BEFORE_DISCONNECT, function(data){
		var username = makeName(data);
		console.log(username + " has disconnected");
		data.message = username + " has left the room.";
		data.from = "server";
		broadcastMessage(data);
	});
}

function registerTransferMessageEvent(socket){
	socket.on(EVENT_CHAT_MESSAGE, function(data){
		data.from = "client";
		if(!isValidData(data, checkUser)){ return; }
		if(!isValidData(data, checkMessage)){ return; }
		saveMessageToDB(data);
		broadcastMessage(data);
	});
}

function broadcastMessage(data){
	io.emit(EVENT_CHAT_MESSAGE, data);
}

function saveMessageToDB(data){
	var json = JSON.stringify(data);
	db.rpush(["messages", json], function(err, reply){
		if(err){
			return console.log(err);
		}
	});
}

function makeName(data){
	return data.user + "#" + data.id;
}

function isValidData(data, checkWhatFunc){
	var response = {};
	checkWhatFunc(data, response);
	if(response.message){
		io.to(data.id).emit(EVENT_SERVER_MESSAGE, response);
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

// express area
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.get("/", function(req, res, next){
	res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/messages", function(req, res, next){
	db.lrange(["messages", 0, -1], function(err, reply){
		if(err){
			console.log(err);
		}
		res.json(reply);
	});
});
