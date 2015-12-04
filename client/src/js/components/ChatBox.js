import React from "react";

export default class ChatBox extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<nav className="navbar navbar-default navbar-fixed-bottom">
				<form className="navbar-form">
					<div className="container-fluid">
						<div className="row">
							<div className="col-xs-9">
								<input type="text" style={{width: "100%"}} className="form-control" name="chat-box" id="chat-box" placeholder="type message here" />
							</div>
							<div className="col-xs-3">
								<button type="button" className="btn btn-primary btn-block" id="sendButton">Send</button>
							</div>
						</div>
					</div>
				</form>
			</nav>
		);
	}
}
