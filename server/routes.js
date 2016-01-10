var express = require("express");
var db = require("./db/db");
var url = require("./url");
var passport = require("./mypassport");
var path = require("path");
var User = require("./db/user");

var router = express.Router();

router.get(url.INDEX, function(req, res, next){
	// var name = req.user ? req.user.username : "anonymous";
	// res.send("hello " + name);
	var page = path.join(__dirname, "..", "client/dist/html/index.html");
	res.sendFile(page);
});

router.get("*", function(req, res, next){
	var page = path.join(__dirname, "..", "client/dist/html/index.html");
	res.sendFile(page);
});

// router.get(url.SIGN, function(req, res, next){
// 	var page = path.join(__dirname, "view/sign.html");
// 	res.sendFile(page);
// });

router.post(url.REGISTER, function(req, res, next){
	var username = req.body.username;
	var password = req.body.password;
	db.createUser(username, password, function(err){
		if(err){
			var message = "This name has already been taken!";
			if(err.errors){
				if(err.errors.username){ message = "Username should be equal or longer than 4 characters!"; }
				else if(err.errors.password){ message = "Password should be equal or longer than 4 characters!"; }
			}
			return res.json({status: 400, message: message});
		}
		login(req, res, next);
	});
});

router.post(url.LOGIN, function(req, res, next){
	login(req, res, next);
});

router.get(url.LOGOUT, function(req, res, next){
	req.logout();
});

function login(req, res, next){
	passport.authenticate("local", function(err, user, info){
		if(err){ return next(err); }
		if(!user){ return res.json({ status: 400, message: "invalid username or password!" }); }
		req.login(user, function(err){
			if(err){ return next(err); }
			return res.json({ status: 307, location: url.INDEX });
		});
	})(req, res, next);
}

module.exports = router;
