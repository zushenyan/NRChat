import React from "react";

import Store from "../redux/MainReducer";

export default class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: ""
		};
		Store.subscribe(() => {
			this.setState({
				username: Store.getState().NRChatReducer.username
			});
		});
	}

	render(){
		let username = this.state.username ? this.state.username : "Guest";
		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header pull-left">
						<span className="navbar-brand">NRChat</span>
					</div>
					<div className="navbar-header pull-right">
						<ul className="nav pull-left">
							<li className="navbar-text pull-left">Hello {username}</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
