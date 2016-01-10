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

	describe("send join info", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				expect(messageHistory).to.have.length(1);
				expect(messageHistory[0].who).to.eql("ggyy");
				expect(messageHistory[0].body).to.eql("has joined the room.");
				expect(messageHistory[0].event).to.eql(SocketEvent.JOIN);
				done();
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendJoinInfo());
		})
	});

	describe("send leave info", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				expect(messageHistory).to.have.length(1);
				expect(messageHistory[0].who).to.eql("ggyy");
				expect(messageHistory[0].body).to.eql("has left the room.");
				expect(messageHistory[0].event).to.eql(SocketEvent.LEAVE);
				done();
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendLeaveInfo());
		})
	});

	describe("send chat message", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				expect(messageHistory).to.have.length(1);
				expect(messageHistory[0].who).to.eql("ggyy");
				expect(messageHistory[0].body).to.eql("weeeeeeeee");
				expect(messageHistory[0].event).to.eql(SocketEvent.CHAT);
				done();
			});
			store2.dispatch(Actions.setUsername("ggyy"));
			store2.dispatch(Actions.sendMessage("weeeeeeeee"));
		})
	});

	describe("fetch message", function(){
		it("shuold work", function(done){
			store1.subscribe(() => {
				let messageHistory = store1.getState().NRChatReducer.messageHistory;
				expect(messageHistory).to.have.length(3);
				done();
			});
			store1.dispatch(Actions.fetchMessageHistory());
		})
	});

	describe("login", function(){
		it("login failed", function(done){
			store1.subscribe(() => {
				console.log("wqeeq");
				done();
			});
			store1.dispatch(Actions.requestLogin("ggyy", "123123", null));
		});

		// it("login failed", function(){
		//
		// });
	});
});
