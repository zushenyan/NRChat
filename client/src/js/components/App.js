// import React from "react";
// import ReactDOM from "react-dom";
//
// import NavBar from "./NavBar";
// import ChatBox from "./ChatBox";
// import MessageBox from "./MessageBox";
// import Dialog from "./Dialog";
//
// import io from "socket.io-client";
//
// class App extends React.Component{
// 	constructor(props){
// 		super(props);
// 	}
//
// 	componentDidMount(){
// 		$("#nameDialog").modal("show");
//
// 		this.setupSocket();
// 	}
//
// 	setupSocket(){
//
// 	}
//
// 	render(){
// 		return (
// 			<div>
// 				<NavBar />
// 				<MessageBox />
// 				<ChatBox />
// 				<Dialog id="nameDialog"/>
// 			</div>
// 		);
// 	}
// }
//
// ReactDOM.render(
// 	<App />,
// 	document.getElementById("app")
// );
//
import Store from "../redux/MainReducer";
import * as ChatAction from "../redux/NRChatReducer";
// import * as PersonAction from "../redux/PersonReducer";

// console.log(Store.getState());
// Store.dispatch(PersonAction.setName("awww"));
// Store.dispatch(PersonAction.setHeight(500));
// console.log(Store.getState());
