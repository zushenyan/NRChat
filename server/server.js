var express = require("express");

var app = express();

app.get("/", function(req, res, next){
	res.send("hello");
});

app.listen(process.env.port, function(){
	console.log("server is running");
});
