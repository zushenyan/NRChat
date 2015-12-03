var express = require("express");
var path = require("path");
var passport = require("passport");
var localStrategy = require("passport-local");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var bcrypt = require("bcrypt");
var db = require("redis").createClient(process.env.REDIS_URL);

db.on("err", function(err){ console.log(err); });
db.on("connect", function(err, reply){ console.log("connect to db"); });

passport.use(new localStrategy({
		usernameField: "email"
	},
	function(username, password, done){
		db.hgetall(username, function(err, reply){
			if(err){ return done(err); }
			if(reply){
				bcrypt.compare(password, reply.pass, function(err, result){
					if(err){ return done(err); }
					if(!result){ return done(null, false); }
					return done(null, reply);
				});
			}
			else{ return done(null, false); }
		});
	})
);

passport.serializeUser(function(user, done){
	done(null, user.email);
});

passport.deserializeUser(function(cid, done){
	db.hgetall(cid, function(err, reply){
		if(err){ return done(err); }
		if(reply){ return done(null, reply); }
		return done(null, false);
	});
});

var router = express.Router();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());
router.use(cookieParser());
router.use(session({
	secret: "shhhhh i am a secret",
	resave: false,
	saveUninitialized: true
}));
router.use(passport.initialize());
router.use(passport.session());

router.get("/", function(req, res, next){
	// var username = req.user ? req.user.email : "anonymous";
	// res.send("hello " + username);
	res.sendFile(path.join(__dirname + "/views/index.html"));
});

router.post("/register", function(req, res, next){
	db.hgetall(req.body.email, function(err, reply){
		if(err){ return next(err); }
		if(reply){ res.redirect("/login"); }
		else{
			// create account
			bcrypt.hash(req.body.password, 10, function(err, hash){
				if(err){ return next(err); }
				db.hmset([req.body.email, "email", req.body.email,  "pass", hash], function(err, reply){
					if(err){ return next(err); }
					db.hgetall(req.body.email, function(err, reply){
						if(err){ return next(err); }
						req.login(reply, function(err){
							if(err){ return next(err); }
							res.redirect("/");
						})
					});
				});
			});
		}
	});
});

router.get("/login", function(req, res, next){
	res.sendFile(path.join(__dirname + "/views/login.html"));
});

router.post("/login", passport.authenticate("local", {
	successRedirect: "/",
	failureRedirect: "/login"
}));

router.get("/logout", function(req, res, next){
	req.logout();
	res.redirect("/login");
});

router.route("/api/chat")
	.get(function(req, res, next){
		db.lrange(["chatmsg", 0, -1], function(err, reply){
			if(err){ next(err); }
			if(reply){ res.json(reply); }
			console.log(req.user.email + " fetch: ");
			console.log(reply);
		});
	})
	.post(loginRequired, function(req, res, next){
		var data = {
			user: req.user.email,
			msg: req.body.msg,
			timestamp: new Date()
		};
		db.lpush(["chatmsg", JSON.stringify(data)], function(err){
			if(err){ next(err); }
			console.log(req.user.email + " save: ");
			console.log(data);
		});
	});

function loginRequired(req, res, next){
	if(req.isAuthenticated()){ next(); }
	else{ res.redirect("/"); }
}

function hash(text, callback){
	bcrypt.hash(text, 10, function(err, hash){
		callback(hash);
	});
}

exports.router = router;
