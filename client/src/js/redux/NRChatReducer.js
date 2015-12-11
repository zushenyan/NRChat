import io from "socket.io-client";

const SERVER_URL = location.origin;
const SERVER_FETCH_MESSAGE = SERVER_URL + "/api/messages";

export const EVENT_HELLO = "hello";
export const EVENT_CHAT = "chat";
export const EVENT_BEFORE_DISCONNECT = "before disconnect";
export const EVENT_ERROR = "error";

// initial store
let store = (function(){
	return {
		username: "",
		messages: [],
		socket: null
	};
})();

// action constants
const ACTION_SETUP = "setup";
const ACTION_SET_USERNAME = "set username";
const ACTION_SEND_MESSAGE = "send message";
const ACTION_DISCONNECT = "disconnect";
const ACTION_FETCH_MESSAGES = "fetch messages";
const ACTION_PUSH_MESSAGE = "push message";

// actions
export function setup({onHello, onError, onChat, onBeforeDisconnect}){
	return {
		type: ACTION_SETUP,
		onHello,
		onError,
		onChat,
		onBeforeDisconnect
	};
}

export function setUsername(username){
	return {
		type: ACTION_SET_USERNAME,
		username
	};
}

export function sendMessage(message){
	return {
		type: ACTION_SEND_MESSAGE,
		message
	};
};

export function disconnect(){
	return {
		type: ACTION_DISCONNECT
	};
}

export function fetchMessages(){
	return function(dispatch){
		let ajax = new XMLHttpRequest();
		ajax.addEventListener("load", function(){
			let jsonMessages = [];
			let rawMessages = JSON.parse(ajax.responseText);
			rawMessages.forEach((ele) => {
				jsonMessages.push(JSON.parse(ele));
			});
			dispatch({
				type: ACTION_FETCH_MESSAGES,
				messages: jsonMessages
			});
		});
		ajax.open("GET", SERVER_FETCH_MESSAGE);
		ajax.send();
	};
}

export function pushMessage(message){
	return {
		type: ACTION_PUSH_MESSAGE,
		message
	};
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
	socket.on(EVENT_HELLO, action.onHello);
	socket.on(EVENT_CHAT, action.onChat);
	socket.on(EVENT_BEFORE_DISCONNECT, action.onBeforeDisconnect);
	socket.on(EVENT_ERROR, action.onError);
	state.socket = socket;
	return Object.assign(state, {
		onHello: action.onHello,
		onChat: action.onChat,
		onBeforeDisconnect: action.onBeforeDisconnect,
		onError : action.onError
	});
}

function _fetchMessages(state, action){
	return Object.assign(state, {
		messages: action.messages
	});
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
	state.socket.emit(EVENT_HELLO, data);
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
	state.socket.emit(EVENT_CHAT, data);
	return Object.assign(state, {
		message: action.message
	});
}

function _disconnect(state, action){
	let data = {
		user: state.username,
		id: state.socket.id
	};
	state.socket.emit(EVENT_BEFORE_DISCONNECT, data);
	return state;
}
