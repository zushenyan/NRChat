import React from "react";

export default class Message extends React.Component{
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="row">
				<span className="col-xs-2 text-left">hello@gmail.com</span>
				<span className="col-xs-8 text-left">Hello</span>
				<span className="col-xs-2 text-right">2015/12/1 15:15:15</span>
			</div>
		);
	}
}
