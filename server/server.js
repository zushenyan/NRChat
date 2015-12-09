var bodyParser = require("body-parser");
var express = require("express");
var db = require("./database");
var io = require("./socket");

var PORT = process.env.PORT || 8080;

var route = express.Router();

route.get("/", function(req, res, next){
	res.sendFile(__dirname + "/views/index.html");
});

route.get("/api/messages", function(req, res, next){
	db.getMessages(function(err, reply){
		if(err){
			console.log(err);
		}
		res.json(reply);
	});
});

var server = express()
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(route)
	.listen(PORT, function(){
		console.log("server is listening on " + PORT);
	});

io.listen(server);
