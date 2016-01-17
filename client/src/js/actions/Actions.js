import fetch from "isomorphic-fetch";
import * as env from "../env/Environment";

// action constants
export const SETUP = "setup";
export const SEND_JOIN_INFO = "send join";
export const SEND_LEAVE_INFO = "send leave";
export const SEND_MESSAGE = "send message";
export const RECEIVE_MESSAGE_HISTORY = "receive message history";
export const RECEIVE_MESSAGE = "receive message";
export const RECEIVE_AUTH = "receive auth";
export const LOGOUT = "logout";
export const SET_USERNAME = "set username";

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
	};
}

function receiveAuth(payload){
	return {
		type: RECEIVE_AUTH,
		payload
	};
}

export function requestAuth(username, password){
	return dispatch => {
		let options = {
			method: "POST",
			headers: {
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({ username, password })
		};
		fetch(env.SERVER_AUTH, options)
			.then( res => res.json() )
			.then( json => dispatch(receiveAuth(json)) );
	};
}

export function checkAuth(token){
	return dispatch => {
		let options = {
			method: "POST",
			headers: {
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({token})
		};
		fetch(env.SERVER_AUTH, options)
			.then( res => res.json() )
			.then( json => dispatch(receiveAuth(json)) );
	};
}

export function fetchGuestName(){
	return dispatch => {
		let options = {
			headers: {
				"Accept" : "application/json"
			}
		};
		fetch(env.SERVER_FETCH_GUESTNAME, options)
			.then( res => res.json() )
			.then( json => dispatch(setUsername(json.username)) );
	};
}

export function requestSignup(username, password){
	return dispatch => {
		let options = {
			method: "POST",
			headers: {
				"Accept" : "application/json",
				"Content-Type" : "application/json"
			},
			body: JSON.stringify({username, password})
		};
		fetch(env.SERVER_SIGNUP, options)
			.then( res => res.json() )
			.then( json => dispatch(receiveAuth(json)) );
	};
}

export function logout(){
	return {
		type: LOGOUT
	};
}
