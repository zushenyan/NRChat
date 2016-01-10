var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var mongoose = require("mongoose");

var flash = require("connect-flash");
var io = require("./socket/socket");

var passport = require("./mypassport");
var api = require("./api");
var routes = require("./routes");

var PORT = process.env.PORT || 8080;

var app = express()
	.use(express.static(path.join(__dirname, "..", "client/dist/")))
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
	.use(api)
	.use(routes);

var server;
var expose = {
	open: open,
	close: close
};

if(process.argv.length < 3){
	open();
}
else {
	module.exports = expose;
}

function open(callback){
	server = app.listen(PORT, function(){
		io.listen(server);
		mongoose.connect("mongodb://localhost:27017");
		if(callback){ callback(); }
		expose.server = server;
		console.log("server is running...");
	});
}

function close(callback){
	io.httpServer.close();
	mongoose.disconnect(callback);
}
