import React from "react";

import * as store from "../store/Store";
import * as Actions from "../actions/Actions";

import History from "../env/History";

import SocketEventDisaptcher from "../store/SocketEventDispatcher";

let Store = store.createSingletonStore();

export default class Login extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			response: null,
			unsubscribe: null
		};
	}

	componentDidMount(){
		let unsub = Store.subscribe(this.handleResponse.bind(this));
		this.setState({
			unsubscribe: unsub
		});
	}

	componentWillUnmount(){
		this.state.unsubscribe();
	}

	handleTextInput(e, cb){
		if(e.key === "Enter"){
			cb(e);
		}
	}

	handleLogin(e){
		e.preventDefault();
		let loginForm = document.getElementById("loginForm");
		Store.dispatch(Actions.requestAuth(loginForm.username.value, loginForm.password.value));
	}

	handleSingup(e){
		e.preventDefault();
		let signupForm = document.getElementById("signupForm");
		Store.dispatch(Actions.requestSignup(signupForm.username.value, signupForm.password.value));
	}

	handleResponse(){
		let res = Store.getState().NRChatReducer.lastResponse;
		if(!res.success){
			this.setState({
				response: res.message
			});
		}
		else{
			SocketEventDisaptcher.sendJoinInfo(Store);
			History.replaceState(null, "/");
		}
	}

	render(){
		let errorBox = null;
		if(this.state.response){
			errorBox = (<div className="alert alert-danger text-center">{ this.state.response }</div>);
		}

		return (
			<div className="container">
				{ errorBox }

				<section className="col-md-6">
					<h1 className="nrchat-form-separator">Login</h1>
					<form action="" method="POST" id="loginForm">
						<div className="form-group nrchat-form-separator">
							<label htmlFor="username">Username</label>
							<input type="text" className="form-control" name="username" id="username" placeholder="Your name?" />
						</div>
						<div className="form-group nrchat-form-separator">
							<label htmlFor="password">Password</label>
							<input type="password" className="form-control" name="password" id="password" placeholder="Shh it's a secret!" />
						</div>
						<input type="submit" value="Login" className="btn btn-primary" onClick={ this.handleLogin.bind(this) } />
					</form>
				</section>

				<section className="col-md-6">
					<h1 className="nrchat-form-separator">Sign Up</h1>
					<form action="" method="POST" id="signupForm">
						<div className="form-group nrchat-form-separator">
							<label htmlFor="username">Username</label>
							<input type="text" className="form-control" name="username" id="username" placeholder="Username should be at least 4 characters long." />
						</div>
						<div className="form-group nrchat-form-separator">
							<label htmlFor="password">Password</label>
							<input type="password"className="form-control"  name="password" id="password" placeholder="Password should be at least 4 characters long." />
						</div>
						<input type="submit" value="Sign Up" className="btn btn-primary" onClick={ this.handleSingup.bind(this) } />
					</form>
				</section>
			</div>
		);
	}
}
