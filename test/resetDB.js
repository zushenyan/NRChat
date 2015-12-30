var db = require("../server/db/db");
var User = require("../server/db/user");
var Message = require("../server/db/message");
var mongoose = require("mongoose");

var users = [
	{
		username: "ggyy",
		password: "1234"
	},
	{
		username: "qwerty",
		password: "zxcv"
	}
];

var messages = [
	{
		who: "ggyy",
		body: "hello there"
	},
	{
		who: "qwerty",
		body: "meow"
	},
	{
		who: "guest#1234",
		body: "woooooooooo"
	}
];

function resetDB(callback){
	User.find({}).remove().exec(function(){
		Message.find({}).remove().exec(function(){
			User.create(users, function(){
				Message.create(messages, function(){
					mongoose.disconnect(callback);
					console.log("reset DB done");
				})
			});
		});
	});
}

if(process.argv[2] === "1"){
	console.log("running reset DB...");
	resetDB();
}
else {
	module.exports = resetDB;
}
