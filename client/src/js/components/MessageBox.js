import React from "react";

import * as store from "../store/Store";
import * as Actions from "../actions/Actions";
import SocketEvent from "../env/SocketEvent";

let Store = store.createSingletonStore();

class ServerMessage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<span className="col-xs-8 text-left" style={{ color: this.props.color }}>{ this.props.message }</span>
				<span className="col-xs-4 text-right message">{ this.props.date }</span>
			</div>
		);
	}
}

ServerMessage.defaultProps = { color: "red" };

class ChatMessage extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<span className="col-xs-3 text-left message-word-break">{ this.props.user }</span>
				<span className="col-xs-5 text-left message-word-break">{ this.props.message }</span>
				<span className="col-xs-4 text-right message-word-break">{ this.props.date }</span>
			</div>
		);
	}
}

export default class MessageBox extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			messages: [],
			unsubscribe: null
		};
	}

	componentDidMount(){
		if(Store.getState().NRChatReducer.messageHistory.length === 0){
			Store.dispatch(Actions.fetchMessageHistory());
		}
		else{
			this.setState({
				messages: Store.getState().NRChatReducer.messageHistory
			});
		}
		let unsub = Store.subscribe(this.fetchMessages.bind(this));
		this.setState({
			unsubscribe: unsub
		});
	}

	componentWillUnmount(){
		this.state.unsubscribe();
	}

	fetchMessages(){
		this.setState({
			messages: Store.getState().NRChatReducer.messageHistory
		});
	}

	render(){
		window.scrollTo(0, document.body.scrollHeight);
		let messageNodes = [];
		this.state.messages.forEach((ele, index) => {
			let messageNode = null;
			let tempDate = ele.date.split("T")[0];
			let tempTime = ele.date.split("T")[1].split(".")[0];
			let date = [tempDate, tempTime].join("  ");
			switch(ele.event){
				case SocketEvent.JOIN:
					messageNode = (<ServerMessage message={ele.who + " has joined the room."} color={"blue"} date={date} key={index} />);
					break;
				case SocketEvent.LEAVE:
					messageNode = (<ServerMessage message={ele.who + " has left the room."} color={"blue"} date={date} key={index} />);
					break;
				case SocketEvent.ERROR:
					messageNode = (<ServerMessage message={ele.body} key={index} />);
					break;
				case SocketEvent.CHAT:
				default:
					messageNode = (<ChatMessage user={ele.who} message={ele.body} date={date} key={index} />);
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
