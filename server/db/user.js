var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		minlength: 3,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		minlength: 3,
	}
});

UserSchema.pre("save", function(next){
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
