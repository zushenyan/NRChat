var express = require("express");

var app = express();

var port = process.env.PORT || 8080;

app.get("/", function(req, res, next){
	res.send("hello");
});

app.listen(port, function(){
	console.log("server is running");
});
