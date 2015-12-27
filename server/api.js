var express = require("express");
var mongoose = require("mongoose");
var db = require("./db/db");

var router = express.Router();

router.get("/users", function(req, res, next){
	db.getUsers(function(err, docs){
		if(err){ return res.json(err); }
		res.json(docs);
	});
});

router.post("/createUser", function(req, res, next){
	db.createUser(
		req.body.username,
		req.body.password,
		function(err, result){
			if(err){return res.json(err);}
			res.send(result);
		}
	);
});

router.get("/messages", function(req, res, next){
	db.getMessages(function(err, docs){
		if(err){return res.json(err);}
		res.json(docs);
	});
});

module.exports = router;
