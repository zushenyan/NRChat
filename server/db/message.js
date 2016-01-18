var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
	who: {
		type: String,
		require: true
	},
	body: {
		type: String, 
		minlength: 1,
		require: true
	},
	event: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

var Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
