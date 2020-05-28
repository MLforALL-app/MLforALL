import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect } from "react-router-dom";

class SignIn extends Component {
	// State to keep track of what user types
	state = {
		email: "",
		password: ""
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
		this.props.signIn(this.state);
	};

	render() {
		// from props, retrieve authError and auth objects
		const { authError, auth } = this.props;
		// route protection, shouldn't be able to sign in again
		if (auth.uid) return <Redirect to="/dashboard" />;
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white z-depth-1">
					<h4 className="purple-text">Sign In</h4>
					<div className="input-field">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="password">Password</label>
						<input
							type="password"
							id="password"
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<button className="btn z-depth-0">Login</button>
						<div className="red-text center">
							{authError ? <p>{authError}</p> : null}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

// Redux to associate state of this component with the props its passed in
const mapStateToProps = (state) => {
	return { authError: state.auth.authError, auth: state.firebase.auth };
};

// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		signIn: (creds) => dispatch(signIn(creds))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
