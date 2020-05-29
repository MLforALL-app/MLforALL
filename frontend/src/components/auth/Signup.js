import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { signUp } from "../../store/actions/authActions";

class SignUp extends Component {
	// State to keep track of what user types
	state = {
		email: "",
		password: "",
		firstName: "",
		lastName: ""
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
		this.props.signUp(this.state);
	};

	render() {
		// from props, retrieve authError and auth objects
		const { authError, auth } = this.props;
		// route protection, shouldn't be able to sign in again
		if (auth.uid) return <Redirect to="/dashboard" />;
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white z-depth-1">
					<div className="input-field">
						<label htmlFor="firstName">First Name</label>
						<input
							type="text"
							id="firstName"
							onChange={this.handleChange}
						/>
					</div>
					<div className="input-field">
						<label htmlFor="lastName">Last Name</label>
						<input
							type="text"
							id="lastName"
							onChange={this.handleChange}
						/>
					</div>
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
					<div className="input-field center">
						<button className="btn z-depth-0 center anchor">
							Sign Up
						</button>
						<div className="red-text center">
							{authError ? <p>{authError}</p> : null}
						</div>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth, authError: state.auth.authError };
};

const mapDispatchToProps = (dispatch) => {
	return {
		signUp: (newUser) => dispatch(signUp(newUser))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
