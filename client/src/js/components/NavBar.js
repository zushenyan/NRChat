import React from "react";

export default class NavBar extends React.Component{
	constructor(props){
		super(props);
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
							<li className="navbar-text pull-left">Hello Guest</li>
						</ul>
					</div>
				</div>
			</nav>
		);
	}
}
