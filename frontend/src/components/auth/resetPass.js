import React, { Component } from "react";
import { connect } from "react-redux";
import { resetPass } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class ResetPass extends Component {
	// State to keep track of what user types
	state = {
		email: ""
	};

	// eventHandler to update our state the way text has
	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};

	// Call REDUX action signIn to sign user in given state
	handleSubmit = (e) => {
		e.preventDefault();
		this.props.resetPass(this.state.email);
	};

	render() {
		// from props, retrieve authError and auth objects
		const { msg, auth } = this.props;
		const message = (msg) => {
			if (msg === "noo") {
				return <p className="red-text">Email could not be sent</p>;
			} else if (msg === "yay") {
				return <p className="green-text">Email Sent!</p>;
			} else {
				return <p>{msg}</p>;
			}
		};
		// route protection, shouldn't be able to sign in again
		if (auth.uid) return <Redirect to="/dashboard" />;
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white z-depth-1">
					<h4 className="purple-text">Forgot Your Password?</h4>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<button className="btn z-depth-0 anchor">Reset</button>
					</div>
					{message(msg)}
				</form>
			</div>
		);
	}
}

// Redux to associate state of this component with the props its passed in
const mapStateToProps = (state) => {
	return { msg: state.auth.sent.reset, auth: state.firebase.auth };
};

// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		resetPass: (email) => dispatch(resetPass(email))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPass);
