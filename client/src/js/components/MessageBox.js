import React from "react";

import Store from "../redux/MainReducer";
import * as ChatAction from "../redux/NRChatReducer";

class ServerMessage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<span className="col-xs-12 text-left" style={{ color: "red" }}>{ this.props.message }</span>
			</div>
		);
	}
}

class ChatMessage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<span className="col-xs-2 text-left">{ this.props.user }</span>
				<span className="col-xs-8 text-left">{ this.props.message }</span>
			</div>
		);
	}
}

export default class MessageBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			messages: []
		};
		// Store.dispatch(ChatAction.onChatMessage(this.onChatMessage.bind(this)));
		// Store.dispatch(ChatAction.onServerMessage(this.onServerMessage.bind(this)));
	}

	fetchMessages(){

	}

	onChatMessage(){

	}

	onServerMessage(){

	}

	render(){
		return (
			<div className="container-fluid">
				<ChatMessage user="dog" message="woof" />
				<ServerMessage message="you are too ugly to text!" />
			</div>
		);
	}
}
