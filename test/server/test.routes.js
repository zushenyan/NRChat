import {expect} from "chai";
import request from "supertest";
import resetDB from "../resetDB";
import server from 	"../../server/server";

describe("Test API", function(){
	let req = request("http://localhost:8080");

	before("open server", function(done){
		resetDB(() => {
			server.open(done);
		});
	});

	after("close server", function(done){
		server.close(done);
	});

	describe("test index routes", function(){
		it("should get '/'", function(done){
			req.get("/")
				.set("Accept", "text/html")
				.expect(200, done);
		});

		it("should get '*'", function(done){
			req.get("/asdasdas")
				.set("Accept", "text/html")
				.expect(200, done);
		});
	});

	describe("test api routes", function(){
		it("should get '/api/messages'", function(done){
			req.get("/api/messages")
				.set("Accept", "application/json")
				.expect(200)
				.expect("Content-Type", /json/)
				.end((err, res) => {
					if(err){ throw new Error(err); }
					let data = JSON.parse(res.text);
					expect(data).to.have.length(4);
					done();
				});
		});

		it("should get '/api/id'", function(done){
			req.get("/api/id")
				.set("Accept", "application/json")
				.expect(200)
				.expect("Content-Type", /json/)
				.end((err, res) => {
					if(err){ throw new Error(err); }
					let username = JSON.parse(res.text).username;
					expect(username).to.match(/Guest#\S{5}/);
					done();
				});
		});
	});

	describe("test auth routes", function(){
		describe("test '/auth/authenticate'", function(){
			let token;
			it("should succeed authentication", function(done){
				req.post("/auth/authenticate")
					.set("Accept", "application/json")
					.send({username: "ggyy", password: "1234"})
					.expect(200)
					.expect("Content-Type", /json/)
					.end((err, res) => {
						if(err){ throw new Error(err); }
						token = JSON.parse(res.text).token;
						done();
					});
			});

			it("shuold fail authentication", function(done){
				req.post("/auth/authenticate")
					.set("Accept", "application/json")
					.send({username: "ggyy", password: "no such password"})
					.expect("Content-Type", /json/)
					.expect(400, {
						success: false,
						message: "Invalid username or password!"
					}, done)
			});

			it("should get 'OK' message with valid token", function(done){
				req.post("/auth/authenticate")
					.set("Accept", "application/json")
					.send({token: token})
					.expect(200)
					.expect("Content-Type", /json/)
					.end((err, res) => {
						if(err){ throw new Error(err); }
						let data = JSON.parse(res.text);
						expect(data).to.have.any.keys({
							success: true,
							username: "ggyy",
							message: "OK"
						});
						done();
					});
			});

			it("should get 'Invalid token!' message with invalid token", function(done){
				req.post("/auth/authenticate")
					.set("Accept", "application/json")
					.send({token: "blah"})
					.expect(400)
					.expect("Content-Type", /json/)
					.end((err, res) => {
						if(err){ throw new Error(err); }
						let data = JSON.parse(res.text);
						expect(data).to.eql({success: false, message: "Invalid token!"});
						done();
					});
			});
		});

		describe("test '/auth/signup'", function(){
			it("should create user successfully", function(done){
				req.post("/auth/signup")
					.set("Accept", "application/json")
					.send({username: "newUser", password: "weeee"})
					.expect(200)
					.expect("Content-Type", /json/, done);
			});

			it("should fail when creating with duplicate", function(done){
				req.post("/auth/signup")
					.set("Accept", "application/json")
					.send({username: "ggyy", password: "weeee"})
					.expect(400)
					.expect("Content-Type", /json/, done);
			});

			it("should fail when creating with invalid username", function(done){
				req.post("/auth/signup")
					.set("Accept", "application/json")
					.send({username: "g", password: "weeee"})
					.expect(400)
					.expect("Content-Type", /json/, done);
			});

			it("should fail when creating with invalid password", function(done){
				req.post("/auth/signup")
					.set("Accept", "application/json")
					.send({username: "aaaa", password: "l"})
					.expect(400)
					.expect("Content-Type", /json/, done);
			});
		});
	});
});
