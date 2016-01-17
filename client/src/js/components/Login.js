import React from "react";

import * as store from "../store/Store";
import * as Actions from "../actions/Actions";

let Store = store.createSingletonStore();

export default class Login extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="container">
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
						<input type="submit" value="Login" className="btn btn-primary" />
					</form>
				</section>

				<section className="col-md-6">
					<h1 className="nrchat-form-separator">Sign Up</h1>
					<form action="" method="POST" id="loginForm">
						<div className="form-group nrchat-form-separator">
							<label htmlFor="username">Username</label>
							<input type="text" className="form-control" name="username" id="username" placeholder="Username should be at least 4 characters long." />
						</div>
						<div className="form-group nrchat-form-separator">
							<label htmlFor="password">Password</label>
							<input type="password"className="form-control"  name="password" id="password" placeholder="Password should be at least 4 characters long." />
						</div>
						<input type="submit" value="Sign Up" className="btn btn-primary" />
					</form>
				</section>
			</div>
		);
	}
}
