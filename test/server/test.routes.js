import {expect} from "chai";
import request from "supertest";
import resetDB from "../resetDB";
import server from 	"../../server/server";
import url from "../../server/url";

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

	describe("get pages", function(){
		it("should get index", function(done){
			req.get(url.INDEX)
				.set("Accept", "text/html")
				.expect(200, done);
		});
	});

	describe("perform login", function(){
		it("should fail", function(done){
			req.post(url.LOGIN)
				.set("Accept", "application/json")
				.send({username: "ggyy", password: "4321"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 400,
					message: "invalid username or password!"
				}, done);
		});

		it("should success", function(done){
			req.post(url.LOGIN)
				.set("Accept", "application/json")
				.send({username: "ggyy", password: "1234"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 307,
					location: url.INDEX
				}, done);
		});
	});

	describe("perform logout", function(){
		let agent = request("http://localhost:8080");
		let cookie;

		it("make login", function(done){
			agent.post("http:localhost:8080" + url.LOGIN)
				.set("Accept", "application/json")
				.send({username: "ggyy", password: "1234"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 307,
					location: url.INDEX
				})
				.end((err, res) => {
					cookie = res.headers["set-cookie"][0].split(";")[0];
					done();
				});
		});

		it("check cookie", function(done){
			agent.get("http:localhost:8080" + url.INDEX)
				.set("Cookie", cookie)
				.set("Accept", "text/html")
				.expect(200)
				.expect("Content-Type", "text/html")
				.end((err, res) => {
					expect(res.headers["set-cookie"]).to.be.undefined;
					done();
				});
		});

		it("should work", function(done){
			agent.get("http:localhost:8080" + url.LOGOUT)
				.set("Accept", "text/html")
				.expect(200)
				.expect("Content-Type", "text/html")
				.end((err, res) => {
					let newCookie;
					if(res.headers["set-cookie"]){
						newCookie = res.headers["set-cookie"][0].split(";")[0];
					}
					expect(newCookie).to.be.not.eql(cookie);
					done();
				});
		});
	});

	describe("perform register", function(){
		it("should response with username duplicate error", function(done){
			req.post(url.REGISTER)
				.set("Accept", "application/json")
				.send({username: "ggyy", password: "whatever"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 400,
					message: "This name has already been taken!"
				}, done);
		});
		it("should response with username is too short", function(done){
			req.post(url.REGISTER)
				.set("Accept", "application/json")
				.send({username: "q", password: "1234"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 400,
					message: "Username should be equal or longer than 4 characters!"
				}, done);
		});
		it("should response with password is too short", function(done){
			req.post(url.REGISTER)
				.set("Accept", "application/json")
				.send({username: "oooo", password: "1"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 400,
					message: "Password should be equal or longer than 4 characters!"
				}, done);
		});
		it("should work", function(done){
			req.post(url.REGISTER)
				.set("Accept", "application/json")
				.send({username: "happycat", password: "qwerty"})
				.expect("Content-Type", /json/)
				.expect(200, {
					status: 307,
					location: url.INDEX
				}, done);
		});
	});
});
