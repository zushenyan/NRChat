var client = require("redis").createClient(process.env.REDIS_URL);

client.on("err", function(err){ console.log(err); });

var saveMessage = function(data){
	var json = JSON.stringify(data);
	client.rpush(["messages", json], function(err, reply){
		if(err){ return console.log(err); }
	});
};

var getMessages = function(callback){
	client.lrange(["messages", 0, -1], callback);
};

module.exports = {client, saveMessage, getMessages};
