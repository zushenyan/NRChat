import io from "socket.io-client";
import _ from "lodash";
import socketEvent from "../../../../server/socket/socketEvent";
import ClientMessage from "../../../../server/socket/clientMessage";
import * as Actions from "../actions/Actions";
import * as env from "../env/Environment";

// initial store
let store = (function(){
	return {
		username: "",
		messages: [],
		socket: null
	};
})();

// reducer
export default function reducer(state = store, action){
	switch(action.type){
		case Actions.SETUP:
			return _setup(state, action);
		case Actions.FETCH_MESSAGES:
			return _fetchMessages(state, action);
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
		default:
			return state;
	}
}

function _setup(state, action){
	let socket = io.connect(env.SERVER_URL, { "force new connection": true });
	socket.on(socketEvent.JOIN, action.onJoin);
	socket.on(socketEvent.CHAT, action.onChat);
	socket.on(socketEvent.LEAVE, action.onLeave);
	socket.on(socketEvent.ERROR, action.onError);
	state.socket = socket;
	return _.assign(state, {
		onJoin: action.onJoin,
		onChat: action.onChat,
		onLeave: action.onLeave,
		onError: action.onError
	});
}

function _fetchMessages(state, action){
	return _.assign(state, {
		messages: action.messages
	});
}

function _receiveMessage(state, action){
	state.messages.push(action.message);
	return _.assign(state, {
		message: action.message
	});
}

function _sendJoinInfo(state, action){
	let data = new ClientMessage(state.username, "hi", state.socket.id).toJson;
	state.socket.emit(socketEvent.JOIN, data);
	return state;
}

function _sendMessage(state, action){
	let data = new ClientMessage(state.username, action.message, state.socket.id).toJson;
	state.socket.emit(socketEvent.CHAT, data);
	return _.assign(state, {
		message: action.message
	});
}

function _sendLeaveInfo(state, action){
	let data = new ClientMessage(state.username, "bye", state.socket.id).toJson;
	state.socket.emit(socketEvent.LEAVE, data);
	return state;
}

function _setUsername(state, action){
	state.username = action.username;
	return _.assign(state, {
		username: state.username
	});
}
