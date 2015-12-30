var expect = require("chai").expect;
var db = require("../../server/db/db");
var User = require("../../server/db/user");
var Message = require("../../server/db/message");

var user1 = {
	username: "aaaa",
	password: "abcd"
};
var user2 = {
	username: "bbbb",
	password: "1234"
};
var user3 = {
	username: "cccc",
	password: "ggyy"
};
var users = [user1, user2, user3];

var message1 = {
	who: "ggyy",
	body: "hello there"
};
var message2 = {
	who: "not so gy",
	body: "hi"
};
var message3 = {
	who: "very gy",
	body: "fuck you all"
};
var messages = [message1, message2, message3];

describe("Test db functionalities", function(){
	beforeEach("resetUsers", function(done){
		User.find({}).remove().exec(function(){
			User.create(users, function(){
				done();
			});
		});
	});

	beforeEach("resetMessage", function(done){
		Message.find({}).remove().exec(function(){
			Message.create(messages, function(){
				done();
			});
		});
	});

	describe("getUsers", function(){
		it("should work", function(done){
			var expectResults = [];
			users.forEach(function(ele){
				expectResults.push({username: ele.username});
			});
			db.getUsers(function(err, docs){
				if(err){return done(err);}
				var target = [];
				docs.forEach(function(ele){
					target.push({username: ele.username});
				});
				expect(target).to.eql(expectResults);
				done();
			});
		});
	});

	describe("createUser", function(){
		it("should work", function(done){
			db.createUser("dddd", "qweqwe", function(err, doc){
				if(err){return done(err);}
				var target = {username: doc.username};
				expect(target).to.eql({username: "dddd"});
				done();
			});
		});
		it("should throw when username is too short", function(done){
			db.createUser("1", "qweqwe", function(err){
				expect(err).not.to.be.null;
				done();
			});
		});
		it("should throw when password is too short", function(done){
			db.createUser("1234", "q", function(err){
				expect(err).not.to.be.null;
				done();
			});
		});
		it("should have error when duplicate username", function(done){
			db.createUser("aaaa", "anotherpassword", function(err){
				expect(err).not.to.be.null;
				done();
			});
		});
	});

	describe("getMessages", function(){
		it("should work", function(done){
			var expectResults = [];
			messages.forEach(function(ele){
				expectResults.push({who: ele.who, body: ele.body});
			});
			db.getMessages(function(err, docs){
				if(err){return done(err);}
				var target = [];
				docs.forEach(function(ele){
					target.push({
						who: ele.who,
						body: ele.body
					});
				});
				expect(target).to.eql(expectResults);
				done();
			});
		});
	});

	describe("createMessage", function(){
		it("should work", function(done){
			var message = {
				who: "i am a cat",
				body: "meowmeowmeow",
				date: new Date(Date.now())
			}
			db.createMessage(message.who, message.body, message.date);
			Message.find({who: message.who, body: message.body, date: message.date}).exec(function(err, docs){
				if(err){return done(err)};
				var target = [];
				docs.forEach(function(ele){
					target.push({
						who: ele.who,
						body: ele.body,
						date: ele.date
					});
				});
				expect(target).to.eql([message]);
				done();
			});
		});
	});
});
