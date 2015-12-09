import io from "socket.io-client";

const SERVER_URL = "http://localhost:8080";
const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";

// initial store
let store = (function(){
	let socket = io.connect(SERVER_URL);

	return {
		username: "",
		messages: [],
		socket: socket
	}
})();

// action constants
const ACTION_ON_CHAT_MESSAGE = "on chat message";
const ACTION_ON_SERVER_MESSAGE = "on server message";
const ACTION_FETCH_MESSAGES = "fetch messages";
const ACTION_SET_USERNAME = "set username";
const ACTION_SEND_MESSAGE = "send message";

// actions
export function onChatMessage(cb){
	return {
		type: ACTION_ON_CHAT_MESSAGE,
		callback: cb
	}
}

export function onServerMessage(cb){
	return {
		type: ACTION_ON_SERVER_MESSAGE,
		callback: cb
	}
}

export function fetchMessage(){
	return {
		type: ACTION_FETCH_MESSAGES,
	}
}

export function fetchMessage(username){
	return {
		type: ACTION_SET_USERNAME,
		username: username
	}
}

export function sendMessage(message){
	return {
		type: ACTION_SEND_MESSAGE,
		message: message
	}
};

// reducer
export function reducer(state = store, action){
	switch(action.type){
		case ACTION_ON_CHAT_MESSAGE:
			return _onChatMessage(state, action);
		case ACTION_ON_SERVER_MESSAGE:
			return _onServerMessage(state, action);
		case ACTION_FETCH_MESSAGES:
			return _fetchMessage(state, action);
		case ACTION_SET_USERNAME:
			return _setUsername(state, action);
		case ACTION_SEND_MESSAGE:
			return _sendMessage(state, action);
		default:
			return state;
	}
}

function _onChatMessage(state, action){
	state.socket.on("chat message", action.cb);
	return Object.assign(state, {
		callback: action.cb
	});
}

function _onServerMessage(state, action){
	state.socket.on("server message", action.cb);
	return Object.assign(state, {
		callback: action.cb
	});
}

function _fetchMessage(state, action){
	var ajax = new XMLHttpRequest();
	ajax.addEventListener("load", function(){
		state.messages = JSON.parse(ajax.responseText);
	});
	ajax.open("GET", SERVER_FETCH_MESSAGE);
	ajax.send();
	return state;
}

function _setUsername(state, action){
	state.username = action.username;
	let data = {
		user: state.username,
		id: state.socket.id
	};
	state.socket.emit("hello", data);
	return Object.assign(state, {
		username: action.username
	});
}

function _sendMessage(state, action){
	let data = {
		user: state.username,
		message: action.message,
		id: state.socket.id
	};
	state.socket.emit("chat message", data);
	return Object.assign(state, {
		message: action.message
	});
}
