import React from "react";

export default class NavBar extends React.Component{
	constructor(props){
		super(props);
	}

	handleLoginButton(event){
		$("#login-dialog").modal("show");
	}

	render(){
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header pull-left">
						<span className="navbar-brand">NRChat</span>
					</div>
					<div className="navbar-header pull-right">
						<ul className="nav pull-left">
							<li className="navbar-text pull-left">Hello Anonymous</li>
							<li className="pull-right">
								<button type="button" className="btn btn-default navbar-btn" onClick={this.handleLoginButton}>Login/Signup</button>
							</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
