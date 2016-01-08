var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var flash = require("connect-flash");
var io = require("./socket/socket");

var passport = require("./mypassport");
var api = require("./api");
var routes = require("./routes");

var PORT = process.env.PORT || 8080;

var handler = express()
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
	.use(routes)
	.use(api);

var server;

if(process.argv.length < 3){
	open();
}
else {
	module.exports = {
		open: open,
		close: close
	};
}

function open(){
	server = handler.listen(PORT, function(){
		console.log("server is running...");
	});
	io.listen(server);
}

function close(callback){
	io.httpServer.close();
	callback();
}
