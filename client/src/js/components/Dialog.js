import React from "react";

export default class Dialog extends React.Component{
	constructor(props){
		super(props);
	}

	handleConfrimButton(event){
		$("#" + this.props.id).modal("hide");
	}

	render(){
		return (
			<div className="modal fade" id={ this.props.id } role="dialog" data-backdrop="static" data-keyboard="false">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Hello Guest!</h4>
						</div>
						<div className="modal-body">
							<input type="text" id="username" className="form-control" placeholder="what's your name?" />
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.handleConfrimButton.bind(this)}>Confirm</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
