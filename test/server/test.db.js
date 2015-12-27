var expect = require("chai").expect;
var db = require("../../server/db/db");
var User = require("../../server/db/user");
var Message = require("../../server/db/message");

function printUser(err, result){
	if(err){return console.log(err);}
	console.log(result);
}

var user1 = new User({
	username: "aaaa",
	password: "abcd"
});
var user2 = new User({
	username: "bbbb",
	password: "1234"
});
var user3 = new User({
	username: "cccc",
	password: "ggyy"
});
var users = [user1, user2, user3];

var message1 = new Message({
	who: "ggyy",
	body: "hello there"
});
var message2 = new Message({
	who: "not so gy",
	body: "hi"
});
var message3 = new Message({
	who: "very gy",
	body: "fuck you all"
});
var messages = [message1, message2, message3];

describe("Test db functionalities", function(){
	beforeEach(function(){
		User.find({}).remove().exec();
		Message.find({}).remove().exec();
		users.forEach(function(ele){
			ele.save();
		});
		messages.forEach(function(ele){
			ele.save();
		});
	});

	describe("getUsers", function(){
		it("should work", function(){
			var expectResult = [];
			users.forEach(function(ele){
				expectResult.push({username: ele.username});
			});
			db.getUsers(function(err, docs){
				if(err){throw new Error(err);}
				expect(docs).to.eql(expectResult);
			});
		});
	});

	describe("createUser", function(){
		it("should work", function(){
			db.createUser("dddd", "qweqwe", function(err, docs){
				if(err){throw new Error(err);}
				expect(docs).to.eql([{username: validUser.username}]);
			});
		});
		it("should throw", function(){
			function exec1(){
				db.createUser("1", "qweqwe", function(err){
					expect(err).not.to.be.null;
				});
			}
			function exec2(){
				db.createUser("1234", "q", function(err){
					expect(err).not.to.be.null;
				});
			}
			exec1();
			exec2();
		});
	});

	describe("getMessages", function(){
		it("should work", function(){
			var expectResult = [];
			messages.forEach(function(ele){
				expectResult.push({who: ele.who, message: ele.message});
			});
			db.getMessages(function(err, docs){
				if(err){throw new Error(err);}
				expect(docs).to.eql(expectResult);
			});
		});
	});

	describe("createMessage", function(){
		it("should work", function(){
			var message = {
				who: "i am a cat",
				body: "meowmeowmeow"
			}
			db.createMessage(message.who, message.body);
			Message.find({who: message.who, body: message.body}).exec(function(err, docs){
				if(err){throw new Error(err)};
				expect(docs).to.eql([message]);
			});
		});
	});
});
