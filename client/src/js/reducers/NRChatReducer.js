import io from "socket.io-client";
import _ from "lodash";
import SocketEvent from "../env/SocketEvent";
import ClientMessage from "../env/ClientMessage";
import * as Actions from "../actions/Actions";
import * as env from "../env/Environment";

const INITIAL_STATE = {
	username: "",
	token: "",
	lastResponse: {},
	messageHistory: [],
	socket: null
};

export function createState(){
	return _.assign({}, INITIAL_STATE);
};

export function reducer(state = createState(), action){
	switch(action.type){
		case Actions.SETUP:
			return _setup(state, action);
		case Actions.RECEIVE_MESSAGE_HISTORY:
			return _receiveMessageHistory(state, action);
		case Actions.RECEIVE_MESSAGE:
			return _receiveMessage(state, action);
		case Actions.SEND_JOIN_INFO:
			return _sendJoinInfo(state, action);
		case Actions.SEND_MESSAGE:
			return _sendMessage(state, action);
		case Actions.SEND_LEAVE_INFO:
			return _sendLeaveInfo(state, action);
		case Actions.SET_USERNAME:
			return _setUsername(state, action);
		case Actions.LOGOUT:
			return _logout(state, action);
		case Actions.RECEIVE_AUTH:
			return _receiveAuth(state, action);
		default:
			return state;
	}
}

function _setup(state, action){
	let socket = io.connect(env.SERVER_URL, { "force new connection": true });
	socket.on(SocketEvent.JOIN, action.onJoin);
	socket.on(SocketEvent.CHAT, action.onChat);
	socket.on(SocketEvent.LEAVE, action.onLeave);
	socket.on(SocketEvent.ERROR, action.onError);
	return _.assign({}, state, {
		onJoin: action.onJoin,
		onChat: action.onChat,
		onLeave: action.onLeave,
		onError: action.onError,
		socket: socket
	});
}

function _receiveMessageHistory(state, action){
	return _.assign({}, state, {
		messageHistory: action.messageHistory
	});
}

function _receiveMessage(state, action){
	let messageHistory = state.messageHistory.slice(0);
	messageHistory.push(action.message);
	return _.assign({}, state, {
		messageHistory: messageHistory
	});
}

function _sendJoinInfo(state, action){
	state.socket.emit(SocketEvent.JOIN, new ClientMessage(state.username, "hi"));
	return state;
}

function _sendMessage(state, action){
	state.socket.emit(SocketEvent.CHAT, new ClientMessage(state.username, action.message));
	return state;
}

function _sendLeaveInfo(state, action){
	state.socket.emit(SocketEvent.LEAVE, new ClientMessage(state.username, "bye"));
	return state;
}

function _receiveAuth(state, action){
	return _.assign({}, state, {
		username: action.payload.username || "",
		token: action.payload.token || "",
		lastResponse: action.payload
	});
}

function _setUsername(state, action){
	return _.assign({}, state, {
		username: action.username
	});
}

function _logout(state, action){
	return _.assign({}, state, {
		token: ""
	});
}
