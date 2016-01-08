import React from "react";

import Store from "../redux/MainReducer";
import * as ChatAction from "../redux/NRChatReducer";

export default class Dialog extends React.Component{
	constructor(props){
		super(props);
	}

	handleUsernameInput(e){
		if(e.key === "Enter"){
			e.preventDefault();
			this.handleConfrim();
		}
	}

	handleConfrim(e){
		let username = document.getElementById("usernameInput").value;
		if(username){
			$("#" + this.props.id).modal("hide");
			// Store.dispatch(ChatAction.setUsername(username));
		}
	}

	render(){
		return (
			<div className="modal fade" id={ this.props.id } role="dialog" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Hello Guest!</h4>
						</div>
						<div className="modal-body">
							<input type="text"
										id="usernameInput"
										className="form-control"
										placeholder="what's your name? Can't be empty!"
										onKeyPress={ this.handleUsernameInput.bind(this) }
										autofocus="autofocus" />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.handleConfrim.bind(this)}>Confirm</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
