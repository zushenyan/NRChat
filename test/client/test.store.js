import {expect} from "chai";
import resetDB from "../resetDB";
import {createAnotherStore, createSingletonStore} from "../../client/src/js/store/Store";
import * as Actions from "../../client/src/js/actions/Actions";
import server from 	"../../server/server";
import SocketEvent from "../../server/socket/socketEvent";

describe("test client reducer", function(){
	let store1, store2;

	before("setup server", function(done){
		resetDB(() => {
			server.open(done);
		});
	});

	after("close server", function(done){
		server.close(done);
	});

	beforeEach("setup store", function(done){
		store1 = createAnotherStore();
		store2 = createAnotherStore();
		resetDB(done, false);
	});

	afterEach("disconnect sockets", function(done){
		store1.getState().NRChatReducer.socket.disconnect();
		store2.getState().NRChatReducer.socket.disconnect();
		done();
	});

	describe("test createSingletonStore", function(){
		let store3, store4;

		before("setup stores", function(){
			store3 = createSingletonStore();
			store4 = createSingletonStore();
		});

		it("should be equal", function(){
			expect(store3).to.deep.equal(store4);
		});

		after("clear stores", function(){
			store3.getState().NRChatReducer.socket.disconnect();
		});
	});

	describe("set username", function(){
		it("shuold work", function(){
			store1.dispatch(Actions.setUsername("123"));
			expect(store1.getState().NRChatReducer.username).to.eql("123");
		})
	});

	/*
		TODO - need to figure out how to test session without supertest
	 */
	// describe("fetch guest name", function(){
	// 	it("shuold work", function(){
	// 		store1.dispatch(Actions.fetchGuestName());
	// 		let username = store1.getState().NRChatReducer.username;
	// 		console.log(username);
	// 		// expect(store1.getState().NRChatReducer.username).to.eql("123");
	// 	})
	// });

	describe("send join info", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				try{
					expect(messageHistory).to.have.length(1);
					expect(messageHistory[0].who).to.eql("ggyy");
					expect(messageHistory[0].body).to.eql("has joined the room.");
					expect(messageHistory[0].event).to.eql(SocketEvent.JOIN);
					done();
				}
				catch(e){
					done(e);
				}
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendJoinInfo());
		})
	});

	describe("send leave info", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				try{
					expect(messageHistory).to.have.length(1);
					expect(messageHistory[0].who).to.eql("ggyy");
					expect(messageHistory[0].body).to.eql("has left the room.");
					expect(messageHistory[0].event).to.eql(SocketEvent.LEAVE);
					done();
				}
				catch(e){
					done(e);
				}
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendLeaveInfo());
		})
	});

	describe("send chat message", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				try{
					expect(messageHistory).to.have.length(1);
					expect(messageHistory[0].who).to.eql("ggyy");
					expect(messageHistory[0].body).to.eql("weeeeeeeee");
					expect(messageHistory[0].event).to.eql(SocketEvent.CHAT);
					done();
				}
				catch(e){
					done(e);
				}
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendMessage("weeeeeeeee"));
		})
	});

	describe("fetch message history", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				try{
					expect(messageHistory).to.have.length(3);
					done();
				}
				catch(e){
					done(e);
				}
			});
			store1.dispatch(Actions.fetchMessageHistory());
		})
	});

	describe("auth", function(){
		it("request authentication successfully", function(done){
			store1.subscribe(() => {
				try{
					let token = store1.getState().NRChatReducer.token;
					let username = store1.getState().NRChatReducer.username;
					let lastResponse = store1.getState().NRChatReducer.lastResponse;
					expect(token).to.be.not.empty;
					expect(username).to.eql("ggyy");
					expect(lastResponse).to.have.any.keys({
						success: true,
						username: "ggyy",
						message: "OK"
					});
					done();
				}
				catch(e){
					done(e);
				}
			});
			store1.dispatch(Actions.requestAuth("ggyy", "1234"));
		});

		it("request authentication failed", function(done){
			store1.subscribe(() => {
				try{
					let token = store1.getState().NRChatReducer.token;
					let username = store1.getState().NRChatReducer.username;
					let lastResponse = store1.getState().NRChatReducer.lastResponse;
					expect(token).to.be.empty;
					expect(username).to.be.empty;
					expect(lastResponse).to.eql({
						success: false,
						message: "Invalid username or password!"
					});
					done();
				}
				catch(e){
					done(e);
				}
			});
			store1.dispatch(Actions.requestAuth("ggyy", "12345"));
		});

		describe("validate token", function(){
			let token;
			it("setup token", function(done){
				store1.subscribe(() => {
					token = store1.getState().NRChatReducer.token;
					done();
				});
				store1.dispatch(Actions.requestAuth("ggyy", "1234"));
			});

			it("should succeed", function(done){
				store1.subscribe(() => {
					try{
						let token = store1.getState().NRChatReducer.token;
						let username = store1.getState().NRChatReducer.username;
						let lastResponse = store1.getState().NRChatReducer.lastResponse;
						expect(token).to.be.not.empty;
						expect(username).to.eql("ggyy");
						expect(lastResponse).to.have.any.keys({
							success: true,
							username: "ggyy",
							message: "OK"
						});
						done();
					}
					catch(e){
						done(e);
					}
				});
				store1.dispatch(Actions.checkAuth(token));
			});

			it("should fail", function(done){
				store1.subscribe(() => {
					try{
						let token = store1.getState().NRChatReducer.token;
						let username = store1.getState().NRChatReducer.username;
						let lastResponse = store1.getState().NRChatReducer.lastResponse;
						expect(token).to.be.empty;
						expect(username).to.be.empty;
						expect(lastResponse).to.eql({
							success: false,
							message: "Invalid token!"
						});
						done();
					}
					catch(e){
						done(e);
					}
				});
				store1.dispatch(Actions.checkAuth("no suck token"));
			});
		});

		describe("test signup", function(){
			it("shuold work", function(done){
				store1.subscribe(() => {
					try{
						let token = store1.getState().NRChatReducer.token;
						let username = store1.getState().NRChatReducer.username;
						let lastResponse = store1.getState().NRChatReducer.lastResponse;
						expect(token).to.be.not.empty;
						expect(username).to.eql("newUser");
						expect(lastResponse).to.have.any.keys({
							success: true,
							username: "newUser",
							message: "OK"
						});
						done();
					}
					catch(e){
						done(e);
					}
				});
				store1.dispatch(Actions.requestSignup("newUser", "qqqq"));
			});

			it("should fail when username collision", function(done){
				store1.subscribe(() => {
					try{
						let token = store1.getState().NRChatReducer.token;
						let username = store1.getState().NRChatReducer.username;
						let lastResponse = store1.getState().NRChatReducer.lastResponse;
						expect(token).to.be.empty;
						expect(username).to.be.empty;
						expect(lastResponse).to.have.any.keys({
							success: false,
							message: "This name has already been taken!"
						});
						done();
					}
					catch(e){
						done(e);
					}
				});
				store1.dispatch(Actions.requestSignup("ggyy", "qwerty"));
			})
		});

		describe("logout", function(){
			it("should logout", function(){
				let counter = 0;
				store1.subscribe(() => {
					counter++;
					if(counter > 1){
						try{
							let token = store1.getState().NRChatReducer.token;
							expect(token).to.be.empty;
							done();
						}
						catch(e){
							done(e);
						}
					}
				});
				store1.dispatch(Actions.requestAuth("ggyy", "1234"))
				store1.dispatch(Actions.logout());
			});
		});

	});

});
