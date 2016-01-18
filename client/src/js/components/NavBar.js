import React from "react";
import {Link, IndexLink} from "react-router";

import * as store from "../store/Store";
import * as Actions from "../actions/Actions";

let Store = store.createSingletonStore();

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
}

class LoginButton extends Button {
	constructor(props){
		super(props);
	}

	render(){
		return (<Link className="btn btn-default navbar-btn" to="/login">Login</Link>);
	}
}

class GoBackButton extends Button {
	constructor(props){
		super(props);
	}

	render(){
		let style = this.state.hover ? { backgroundColor: "#c9302c" } : {};
		return (<IndexLink style={style} className="btn btn-danger navbar-btn" to="/" onMouseOver={this.mouseOver.bind(this)} onMouseOut={this.mouseOut.bind(this)}>Go Back</IndexLink>);
	}
}

class LogoutButton extends Button {
	constructor(props){
		super(props);
	}

	handleClick(){
		Store.dispatch(Actions.logout());
		Store.dispatch(Actions.fetchGuestName());
		Store.dispatch(Actions.sendLeaveInfo());
	}

	render(){
		return (<IndexLink className="btn btn-default navbar-btn" to="/" onClick={ this.handleClick.bind(this) }>Logout</IndexLink>);
	}
}

export default class NavBar extends React.Component {
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

	componentDidMount(){
		Store.dispatch(Actions.fetchGuestName());
	}

	render(){
		let token = Store.getState().NRChatReducer.token;
		let button = <LoginButton />;

		if(window.location.pathname !== "/"){
			button = <GoBackButton />;
		}
		if(token){
			button = <LogoutButton />;
		}

		return (
			<nav className="navbar navbar-default navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header pull-left">
						<span className="navbar-brand">NRChat</span>
					</div>
					<div className="navbar-header pull-right">
						<ul className="nav pull-left">
							<li className="navbar-text pull-left">Hello {this.state.username}</li>
							<li className="pull-right">{ button }</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
