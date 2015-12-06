import React from "react";

export default class Dialog extends React.Component{
	constructor(props){
		super(props);
	}

	handleCloseButton(event){
		$("#login-dialog").modal("hide");
	}

	render(){
		return (
			<div className="modal fade" id="login-dialog" role="dialog">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="modal-header">
							<h4 className="modal-title">Join Us!</h4>
						</div>
						<div className="modal-body">
							<div className="row">
								<section className="col-sm-12 col-md-6">
									<h4>Login</h4>
									<form>
										<input type="email" className="form-control" placeholder="email"/>
										<input type="text" className="form-control" placeholder="password"/>
										<input type="submit" className="btn btn-primary btn-block" value="login"/>
									</form>
								</section>
								<section className="col-sm-12 col-md-6">
									<h4>SignUp</h4>
									<div className="input-group">
										<form>
											<input type="email" className="form-control" placeholder="email"/>
											<input type="text" className="form-control" placeholder="password"/>
											<input type="submit" className="btn btn-primary btn-block" value="signup"/>
										</form>
									</div>
								</section>
							</div>
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-primary" onClick={this.handleCloseButton}>close</button>
						</div>
					</div>
				</div>
			</div>
		);
	}
}
