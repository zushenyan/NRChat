var bodyParser = require("body-parser");
var express = require("express");
var api = require("./api");

var PORT = process.env.PORT || 8080;

var server = express()
	.use(bodyParser.urlencoded({ extended: false }))
	.use(bodyParser.json())
	.use(api)
	.listen(PORT, function(){
		console.log("server is running....");
	});
