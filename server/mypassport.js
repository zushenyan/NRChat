var passport = require("passport");
var localStrategy = require("passport-local");
var User = require("./db/user");

passport.use(new localStrategy(
	function(username, password, done){
		User.findOne({ username: username }).exec(function(err, doc){
			if(err){ return done(err); }
			if(doc && doc.checkPassword(password)){
				return done(null, doc);
			}
			else{
				return done(null, false);
			}
		});
	}
));

passport.serializeUser(function(user, done){
	done(null, user._id);
});

passport.deserializeUser(function(id, done){
	User.findById(id, function(err, doc){
		done(err, doc);
	});
});

module.exports = passport;
