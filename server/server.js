var bodyParser = require("body-parser");
var express = require("express");
var path = require("path");
var db = require("./database");
var io = require("./socket");

var PORT = process.env.PORT || 8080;

var route = express.Router();

route.get("/", function(req, res, next){
	var p = path.join(__dirname, "..", "client/dist/html/index.html");
	res.sendFile(p);
	// res.sendFile(__dirname + "/views/index.html");
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
	.use(express.static(path.join(__dirname, "..", "client/dist")))
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(route)
	.listen(PORT, function(){
		console.log("server is listening on " + PORT);
	});

io.listen(server);
