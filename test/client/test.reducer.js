import {expect} from "chai";
import resetDB from "../resetDB";
import {createMainStore} from "../../client/src/js/reducers/MainReducer";
import * as Actions from "../../client/src/js/actions/Actions";
import server from 	"../../server/server";

describe("test client reducer", () => {
	let store;

	before("setup server", (done) => {
		resetDB(() => {
			server.open();
			store = createMainStore();
			done();
		});
	});

	after("close server", (done) => {
		server.close(done);
	});

	describe("set username", () => {
		it("shuold work", () => {
			store.dispatch(Actions.setUsername("ggyy"));
			expect(store.getState().NRChatReducer.username).to.eql("ggyy");
		})
	});

	describe("send join info", () => {
		it("shuold work", () => {
			store.dispatch(Actions.sendJoinInfo());
			console.log(store.getState().NRChatReducer.messages);
		})
	});
});
