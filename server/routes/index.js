var express = require("express");
var path = require("path");

var router = express.Router();

router.get("/", function(req, res, next){
	// var name = req.user ? req.user.username : "anonymous";
	// res.send("hello " + name);
	var page = path.join(__dirname, "..", "..", "client/dist/html/index.html");
	res.sendFile(page);
});

router.get("*", function(req, res, next){
	var page = path.join(__dirname, "..", "..", "client/dist/html/index.html");
	res.sendFile(page);
});

module.exports = router;
