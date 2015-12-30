function ClientMessage(who, body, id){
	this.who = who;
	this.body = body;
	this.id = id;
}

ClientMessage.prototype.toJson = function(){
	return JSON.stringify(this);
};

ClientMessage.isValid = function(data){
	return data.who && data.body && data.id;
};

function throwError(message){
	throw new Error(message);
}

module.exports = ClientMessage;
