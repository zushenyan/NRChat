import * as env from "../env/Environment";

// action constants
export const SETUP = "setup";
export const SEND_JOIN_INFO = "send join";
export const SEND_LEAVE_INFO = "send leave";
export const SEND_MESSAGE = "send message";
export const FETCH_MESSAGES = "fetch messages";
export const RECEIVE_MESSAGE = "receive message";
export const SET_USERNAME = "set username";
export const SIGN_UP = "sign up";
export const LOGIN = "login";
export const LOGOUT = "logout";

// actions
export function setup({onJoin, onError, onChat, onLeave}){
	return {
		type: SETUP,
		onJoin,
		onError,
		onChat,
		onLeave
	};
}

export function sendJoinInfo(){
	return {
		type: SEND_JOIN_INFO
	};
}

export function sendLeaveInfo(){
	return {
		type: SEND_LEAVE_INFO
	};
}

export function sendMessage(message){
	return {
		type: SEND_MESSAGE,
		message
	};
};

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
				type: FETCH_MESSAGES,
				messages: jsonMessages
			});
		});
		ajax.open("GET", env.SERVER_FETCH_MESSAGE);
		ajax.send();
	};
}

export function receiveMessage(message){
	return {
		type: RECEIVE_MESSAGE,
		message
	};
}

export function setUsername(username){
	return {
		type: SET_USERNAME,
		username
	}
}
