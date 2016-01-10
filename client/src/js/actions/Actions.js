import fetch from "isomorphic-fetch";
import * as env from "../env/Environment";

// action constants
export const SETUP = "setup";
export const SEND_JOIN_INFO = "send join";
export const SEND_LEAVE_INFO = "send leave";
export const SEND_MESSAGE = "send message";
export const RECEIVE_MESSAGE_HISTORY = "receive message history";
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
}

function receiveMessageHistory(messageHistory){
	return {
		type: RECEIVE_MESSAGE_HISTORY,
		messageHistory
	};
}

export function fetchMessageHistory(){
	return dispatch => {
		fetch(env.SERVER_FETCH_MESSAGE)
			.then(res => res.json())
			.then(json => dispatch(receiveMessageHistory(json)));
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

function login(response, username, router){
	return {
		type: LOGIN,
		response,
		username,
		router
	};
}

export function requestLogin(username, password, router){
	return dispatch => {
		let options = {
			method: "POST",
			headers: {
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({ username, password })
		};
		fetch(env.SERVER_URL + "/login", options)
			.then( res => res.json() )
			.then( json => dispatch(login(json, username, router)) );
	};
}
