import io from "socket.io-client";

const SERVER_URL = "http://localhost:8080";
const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";

// initial store
let store = (function(){
	return {
		username: "",
		messages: [],
		socket: null
	}
})();

// action constants
const ACTION_SETUP = "setup";
const ACTION_SET_USERNAME = "set username";
const ACTION_SEND_MESSAGE = "send message";
const ACTION_DISCONNECT = "disconnect";
const ACTION_FETCH_MESSAGES = "fetch messages";
const ACTION_PUSH_MESSAGE = "push message";

// actions
export function setup(onChatFunc, onServerFunc){
	return {
		type: ACTION_SETUP,
		onChatFunc: onChatFunc,
		onServerFunc: onServerFunc
	}
}

export function setUsername(username){
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

export function disconnect(){
	return {
		type: ACTION_DISCONNECT
	}
}

export function fetchMessages(){
	return {
		type: ACTION_FETCH_MESSAGES,
	}
}

export function pushMessage(message){
	return {
		type: ACTION_PUSH_MESSAGE,
		message: message
	}
}

// reducer
export function reducer(state = store, action){
	switch(action.type){
		case ACTION_SETUP:
			return _setup(state, action);
		case ACTION_FETCH_MESSAGES:
			return _fetchMessages(state, action);
		case ACTION_PUSH_MESSAGE:
			return _pushMessage(state, action);
		case ACTION_SET_USERNAME:
			return _setUsername(state, action);
		case ACTION_SEND_MESSAGE:
			return _sendMessage(state, action);
		case ACTION_DISCONNECT:
			return _disconnect(state, action);
		default:
			return state;
	}
}

function _setup(state, action){
	let socket = io.connect(SERVER_URL);
	socket.on("chat message", action.onClientFunc);
	socket.on("server message", action.onServerFunc);
	state.socket = socket;
	return Object.assign(state, {
		onChatFunc: action.onChatFunc,
		onServerFunc: action.onServerFunc
	});
}

function _fetchMessages(state, action){
	var ajax = new XMLHttpRequest();
	ajax.addEventListener("load", function(){
		state.messages = JSON.parse(ajax.responseText);
	});
	ajax.open("GET", SERVER_FETCH_MESSAGE);
	ajax.send();
	return state;
}

function _pushMessage(state, action){
	state.messages.push(action.message);
	return Object.assign(state, {
		message: action.message
	});
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

function _disconnect(state, action){
	let data = {
		user: state.username,
		id: state.socket.id
	};
	state.socket.emit("before disconnect", data);
	return state;
}
