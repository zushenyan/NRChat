var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var path = require("path");
var mongoose = require("mongoose");

var io = require("./socket/socket");

var authRoutes = require("./routes/auth");
var apiRoutes = require("./routes/api");
var indexRoutes = require("./routes/index");

var PORT = process.env.PORT || 8080;
var DATABASE_URI = process.env.MONGOLAB_URI || "mongodb://localhost:27017";

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
	.use("/auth", authRoutes)
	.use("/api", apiRoutes)
	.use("/", indexRoutes);

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
		mongoose.connect(DATABASE_URI);
		expose.server = server;
		if(callback){ callback(); }
		console.log("server is running...");
	});
}

function close(callback){
	io.httpServer.close();
	mongoose.disconnect(callback);
}
