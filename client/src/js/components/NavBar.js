import React from "react";
import {Link, IndexLink} from "react-router";

import Store from "../reducers/MainReducer";
import * as Actions from "../actions/Actions";

class Button extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			hover: false
		};
	}

	mouseOver(){
		this.setState({
			hover: true
		});
	}

	mouseOut(){
		this.setState({
			hover: false
		});
	}

	render(){
		let link = <Link className="btn btn-default navbar-btn" to="/login">Login</Link>;
		if(window.location.pathname !== "/"){
			let style = this.state.hover ? { backgroundColor: "#c9302c" } : {};
			link = <IndexLink style={style} className="btn btn-danger navbar-btn" to="/" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>Go Back</IndexLink>;
		}
		return link;
	}
}

export default class NavBar extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			username: ""
		};
		// Store.subscribe(() => {
		// 	this.setState({
		// 		username: Store.getState().NRChatReducer.username
		// 	});
		// });
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
							<li className="pull-right"><Button /></li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
