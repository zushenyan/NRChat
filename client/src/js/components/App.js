import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";

class App extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<NavBar />
				<MessageBox />
				<ChatBox />
			</div>
		);
	}
}

ReactDOM.render(
	<App />,
	document.getElementById("app")
);