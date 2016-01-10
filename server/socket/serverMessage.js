function ServerMessage(clientMessage, event){
	this.who = clientMessage ? clientMessage.who : "";
	this.body = clientMessage ? clientMessage.body : "";
	this.date = new Date(Date.now());
	this.event = event;
}

module.exports = ServerMessage;
