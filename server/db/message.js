var mongoose = require("mongoose");

var MessageSchema = new mongoose.Schema({
	who: {type: String, require: true},
	body: {type: String, minlength: 1, require: true}
});

var Message = mongoose.model("Messages", MessageSchema);

module.exports = Message;
