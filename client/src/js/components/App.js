import React from "react";
import ReactDOM from "react-dom";

import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import Dialog from "./Dialog";

import Store from "../redux/MainReducer";
import * as ChatAction from "../redux/NRChatReducer";

class App extends React.Component{
	constructor(props){
		super(props);
	}

	componentDidMount(){
		$("#nameDialog").modal("show");
	}

	componentWillUnmount(){
		Store.dispatch(ChatAction.disconnect());
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

window.addEventListener("beforeunload", (e) => {
	ReactDOM.unmountComponentAtNode(document.getElementById("app"));
});
