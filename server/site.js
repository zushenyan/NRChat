var express = require("express");
var db = require("./db/db");
var url = require("./url");
var passport = require("./mypassport");
var path = require("path");

var router = express.Router();

router.get("/", function(req, res, next){
	var name = req.user ? req.user.username : "anonymous";
	res.send("hello " + name);
});

router.get("/login", function(req, res, next){
	console.log(req.flash());
	var page = path.join(__dirname, "view/login.html");
	res.sendFile(page);
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login",
	failureFlash: "invalid username or password"
}));

router.get("/logout", function(req, res, next){
	req.logout();
	res.redirect("/");
});

module.exports = router;
