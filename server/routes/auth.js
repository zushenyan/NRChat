var express = require("express");
var jwt = require("jsonwebtoken");
var db = require("../db/db");
var User = require("../db/user");

var secret = "shh i am a secret";

var router = express.Router();

router.post("/authenticate", isValidToken, createToken);

router.post("/signup", createUser, createToken);

function createUser(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	db.createUser(username, password, function(err){
		if(err){
			var message = "This name has already been taken!";
			if(err.errors){
				if(err.errors.username){ message = "Username should be equal or longer than 4 characters!"; }
				else if(err.errors.password){ message = "Password should be equal or longer than 4 characters!"; }
			}
			return res.status(400).json({
				success: false,
				message: message
			});
		}
		next();
	});
};

function isValidToken(req, res, next){
	var token = req.body.token;
	if(token){
		try{
			var decoded = jwt.verify(token, secret);
			res.json({
				success: true,
				username: decoded.username,
				token: token,
				message: "OK"
			});
		}
		catch(err){
			res.status(400).json({
				success: false,
				message: "Invalid token!"
			});
		}
	}
	else{
		next();
	}
}

function createToken(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	User.findOne({username: username}).exec(function(err, doc){
		if(err){
			res.status(500).json({
				sucess: false,
				message: "Server side error."
			});
			return console.log(err);
		}
		if(doc && doc.checkPassword(password)){
			var token = jwt.sign({username: doc.username}, secret);
			res.json({
				success: true,
				username: username,
				token: token,
				message: "OK"
			});
		}
		else{
			res.status(400).json({
				success: false,
				message: "Invalid username or password!"
			});
		}
	});
}

module.exports = router;
