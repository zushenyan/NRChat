var User = require("./user");
var Message = require("./message");

var db = {};

db.getUsers = function(callback){
	User.find({})
		.select({username: true, _id: false})
		.exec(callback);
};

db.createUser = function(username, password, callback){
	var newUser = new User({
		username: username,
		password: password
	});
	newUser.save(callback);
};

db.getMessages = function(callback){
	Message.find({})
		.select({_id: false, __v: false})
		.exec(callback);
};

db.createMessage = function(who, body, event, date, callback){
	var newMessage = new Message({
		who: who,
		body: body,
		event: event,
		date: date
	});
	newMessage.save(callback);
};

module.exports = db;
