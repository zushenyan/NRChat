var express = require("express");
var db = require("./db/db");
var url = require("./url");

var Message = require("./db/message");

var router = express.Router();

router.get(url.API_MESSAGES, function(req, res, next){
	db.getMessages(function(err, docs){
		if(err){return res.json(err);}
		res.json(docs);
	});
});

router.get(url.API_SESSION, function(req, res, next){
	var username = req.user ? req.user.username : "Guest#" + req.session.id.substr(0,5);
	res.json({
		username: username,
		id: req.session.id
	});
});

module.exports = router;
