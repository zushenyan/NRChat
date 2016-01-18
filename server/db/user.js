var mongoose = require("mongoose");
var bcrypt = require("bcryptjs");

var UserSchema = new mongoose.Schema({
	username: {
		type: String,
		require: true,
		minlength: 4,
		unique: true,
	},
	password: {
		type: String,
		require: true,
		minlength: 4,
	}
});

UserSchema.methods.checkPassword = function(password){
	return bcrypt.compareSync(password, this.password);
};

UserSchema.pre("save", function(next){
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

var User = mongoose.model("User", UserSchema);

module.exports = User;
