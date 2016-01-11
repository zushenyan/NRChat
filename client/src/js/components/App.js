import React from "react";
import ReactDOM from "react-dom";
import {Router, Route, Link, IndexLink, browserHistory, IndexRoute} from "react-router";
import createBrowserHistory from "history/lib/createBrowserHistory";

import NavBar from "./NavBar";
import ChatBox from "./ChatBox";
import MessageBox from "./MessageBox";
import Login from "./Login";

import Store from "../store/Store";
import * as Actions from "../actions/Actions";

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

	componentDidMount(){
		// $("#nameDialog").modal("show");
	}

	componentWillUnmount(){
		// Store.dispatch(ChatAction.disconnect());
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
	<Router history={ createBrowserHistory() }>
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
