var express = require("express");
var db = require("../db/db");

var router = express.Router();

router.get("/messages", function(req, res, next){
	db.getMessages(function(err, docs){
		if(err){return res.json(err);}
		res.json(docs);
	});
});

router.get("/id", function(req, res, next){
	var username = "Guest#" + req.session.id.substr(0,5);
	res.json({username: username});
});

module.exports = router;
