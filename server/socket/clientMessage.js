function ClientMessage(who, body){
	this.who = who;
	this.body = body;
}

ClientMessage.isValid = function(data){
	return data.who && data.body;
};

module.exports = ClientMessage;
