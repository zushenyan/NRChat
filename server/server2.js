var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var flash = require("connect-flash");

var passport = require("./mypassport");
var api = require("./api");
var site = require("./site");

var PORT = process.env.PORT || 8080;

var server = express()
	// .use(express.static(path.join(__dirname, "..", "server/view")))
	.use(bodyParser.urlencoded({ extended: true }))
	.use(bodyParser.json())
	.use(cookieParser())
	.use(session({
		secret: "shhhhh i am a secret",
		resave: false,
		saveUninitialized: true
	}))
	.use(flash())
	.use(passport.initialize())
	.use(passport.session())
	.use(site)
	.listen(PORT, function(){
		console.log("server is running....");
	});
