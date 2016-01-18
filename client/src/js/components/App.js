import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, IndexLink, IndexRoute} from "react-router";
import History from "../env/History";

import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import Login from "./Login";

import * as store from "../store/Store";
import * as Actions from "../actions/Actions";

let Store = store.createSingletonStore();

class MainView extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<MessageBox />
				<ChatBox />
			</div>
		);
	}
}

class App extends React.Component{
	constructor(props){
		super(props);
	}

	componentWillUnmount(){
		if(Store.getState().NRChatReducer.token){
			Store.dispatch(Actions.sendLeaveInfo());
		}
	}

	render(){
		return (
			<div>
				<NavBar />
				{this.props.children}
			</div>
		);
	}
}

ReactDOM.render(
	<Router history={ History }>
		<Route path="/" component={ App }>
			<IndexRoute component={ MainView } />
			<Route path="/login" component={ Login } />
		</Route>
	</Router>
	,
	document.getElementById("app")
);

window.addEventListener("beforeunload", (e) => {
	ReactDOM.unmountComponentAtNode(document.getElementById("app"));
});
