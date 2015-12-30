var expect = require("chai").expect;
var ioClient = require("socket.io-client");
var ioServer = require("../../server/socket/socket");
var socketEvent = require("../../server/socket/socketEvent");
var ClientMessage = require("../../server/socket/clientMessage");
var resetDB = require("../resetDB");
var mongoose = require("mongoose");
var User = require("../../server/db/user");
var Message = require("../../server/db/message");

var URL = "http://localhost:5000";

function createClient(){
	var socket = ioClient.connect(URL, {
		"force new connection": true
	});
	socket.on(socketEvent.ERROR, function(data){
		throw new Error(data);
	});
	return socket;
}

describe("test socket", function(){
	var client1, client2;

	before("setup server", function(done){
		resetDB(function(){
			mongoose.connect("mongodb://localhost:27017");
			ioServer.listen(5000);
			done();
		});
	});

	beforeEach("setup clients", function(done){
		client1 = createClient();
		client2 = createClient();
		done();
	});

	afterEach("disconnect clients", function(done){
		client1.disconnect();
		client2.disconnect();
		done();
	});

	describe("test communication functions", function(){
		it("should broadcast join event", function(done){
			client1.on(socketEvent.JOIN, function(data){
				expect(data).to.eql("cat has joined the room.")
				done();
			});

			client2.on("connect", function(){
				client2.emit(socketEvent.JOIN, new ClientMessage("cat", "hello", client1.id).toJson());
			});
		});

		it("should broadcast leave event", function(done){
			client1.on(socketEvent.LEAVE, function(data){
				expect(data).to.eql("cat has left the room.")
				done();
			});

			client2.on("connect", function(){
				client2.emit(socketEvent.LEAVE, new ClientMessage("cat", "bye", client2.id).toJson());
			});
		});

		it("should broadcast chat event", function(done){
			var message = new ClientMessage("cat", "i am a cat watch me meowmeowmeowmeowmeowmeow!");

			client1.on(socketEvent.CHAT, function(data){
				expect(data.who).to.eql(message.who);
				expect(data.body).to.eql(message.body);
				expect(data.id).to.eql(client2.id);

				Message.find({who: message.who, body: message.body}, function(err, docs){
					if(err){throw new Error(err);}
					var source = {
						who: docs[0].who,
						body: docs[0].body
					};
					var target = {
						who: message.who,
						body: message.body
					};
					delete message.id;
					expect(docs).to.have.length(1);
					expect(source).to.eql(target);
					done();
				});
			});

			client2.on("connect", function(){
				message.id = client2.id;
				client2.emit(socketEvent.CHAT, message.toJson());
			});
		});

		it("should send error to the one who mess up", function(done){
			var client3 = ioClient.connect(URL, { "force new connection": true });

			client1.on(socketEvent.CHAT, function(data){
				expect(data).to.be.null;
				done();
			});

			client2.on(socketEvent.CHAT, function(data){
				expect(data).to.be.null;
				done();
			});

			client3.on(socketEvent.ERROR, function(data){
				expect(data).to.eql("'who', 'body' and 'id' fields can be empty.");
				client3.disconnect();
				done();
			});

			client3.on("connect", function(){
				client3.emit(socketEvent.CHAT, new ClientMessage("bad user", "", client3.id).toJson());
			});
		});
	});
});
