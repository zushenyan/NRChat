import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import Dialog from "./Dialog";

import io from "socket.io-client";

class App extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		$("#nameDialog").modal("show");

		this.setupSocket();
	}

	setupSocket(){

	}

	render(){
		return (
			<div>
				<NavBar />
				<MessageBox />
				<ChatBox />
				<Dialog id="nameDialog"/>
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("app")
);

// import {store} from "../reducers/test";
