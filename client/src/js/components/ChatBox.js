import React from "react";

import Store from "../store/Store";
import * as Actions from "../actions/Actions";

export default class ChatBox extends React.Component{
	constructor(props){
		super(props);
	}

	handleMessageInput(e){
		if(e.key === "Enter"){
			e.preventDefault();
			this.handleSend();
		}
	}

	handleSend(e){
		let messageInput = document.getElementById("messageInput");
		let message = messageInput.value;
		if(message && message !== ""){
			// Store.dispatch(ChatAction.sendMessage(message));
			messageInput.value = "";
		}
	}

	render(){
		return (
			<nav className="navbar navbar-default navbar-fixed-bottom">
				<form className="navbar-form">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-8">
								<input type="text"
											style={{width: "100%"}}
											className="form-control"
											id="messageInput"
											placeholder="say somthing here!"
											onKeyPress={ this.handleMessageInput.bind(this) } />
							</div>
							<div className="col-xs-4">
								<button type="button" className="btn btn-primary btn-block" onClick={ this.handleSend.bind(this) }>Send</button>
							</div>
						</div>
					</div>
				</form>
			</nav>
		);
	}
}
