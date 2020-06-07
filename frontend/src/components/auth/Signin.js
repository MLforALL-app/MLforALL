import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect, NavLink } from "react-router-dom";
import authImg from "../../pictures/auth.svg";

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
			<div className="signin">
				<div className="container">
					<span className="purple-text">
						<h1>Sign In</h1>
					</span>
					<form onSubmit={this.handleSubmit}>
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
							<div className="purple-text">
								<NavLink to="/forgot">
									Forgot your password?
								</NavLink>
							</div>
						</div>
						<div style={{ float: "right" }} className="input-field">
							<button className="btn z-depth-0 anchor">
								Login
							</button>

							<div className="red-text center">
								{authError ? <p>{authError}</p> : null}
							</div>
						</div>
					</form>
				</div>
				<img className="authImg" alt="" src={authImg}></img>
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
