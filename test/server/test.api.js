import {expect} from "chai";
import request from "supertest";
import resetDB from "../resetDB";
import server from 	"../../server/server";

describe("test api", function(){
	let req = request("http://localhost:8080");

	before("open server", function(done){
		resetDB(function(){
			server.open(done);
		});
	});

	after("close server", function(done){
		server.close(done);
	});

	describe("test get messages api", function(){
		it("should work", function(done){
			req.get("/api/messages")
				.set("Accept", "application/json")
				.expect(200)
				.end((err, res) => {
					if(err){ throw new Error(err); }
					let data = JSON.parse(res.text);
					expect(data).to.have.length(3);
					done();
				});
		});
	});
});
