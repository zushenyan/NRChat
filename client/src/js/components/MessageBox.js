import React from "react";

import Store from "../reducers/MainReducer";
import * as Actions from "../actions/Actions";

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
		// Store.subscribe(this.fetchMessages.bind(this));
		// Store.dispatch(ChatAction.fetchMessages());
	}

	fetchMessages(){
		// this.setState({
		// 	messages: Store.getState().NRChatReducer.messages
		// });
	}

	render(){
		window.scrollTo(0, document.body.scrollHeight);
		let messageNodes = [];
		this.state.messages.forEach((ele, index) => {
			let messageNode = null;
			switch(ele.event){
				case ChatAction.EVENT_HELLO:
					messageNode = (<ServerMessage message={ele.user + " has joined the room."} key={index} />);
					break;
				case ChatAction.EVENT_BEFORE_DISCONNECT:
					messageNode = (<ServerMessage message={ele.user + " has left the room."} key={index} />);
					break;
				case ChatAction.EVENT_ERROR:
					messageNode = (<ServerMessage message={ele.message} key={index} />);
					break;
				case ChatAction.EVENT_CHAT:
				default:
					messageNode = (<ChatMessage user={ele.user} message={ele.message} key={index} />);
			}
			messageNodes.push(messageNode);
		});
		return (
			<div className="container-fluid">
				{messageNodes}
			</div>
		);
	}
}
