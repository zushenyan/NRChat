var express = require("express");
var db = require("redis").createClient(process.env.REDIS_URL || null);

var app = express();

db.on("err", function(err){
	console.log(err);
});

db.on("connect", function(err, reply){
	console.log("connect to db");
});

var port = process.env.PORT || 8080;

app.get("/", function(req, res, next){
	res.send("hello");
	db.set(["test", "does it work?"]);
});

app.listen(port, function(){
	console.log("server is running");
});
