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

module.exports = router;
