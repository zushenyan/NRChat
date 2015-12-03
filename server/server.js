var express = require("express");
var login = require("./login");

var port = process.env.PORT || 8080;

express()
	.set("view engine", "html")
	.use(login.router)
	.listen(port, function(){
		console.log("server is running...");
	});
