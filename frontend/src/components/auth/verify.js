import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { sendVerify } from "../../store/actions/authActions";

class VerifyEmailProject extends Component {
	// pid = unique projID, auth = firebase auth object
	handleClick = () => {
		this.props.sendVerify();
	};
	render() {
		const { pid, auth, sentMsg } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
		if (auth.emailVerified)
			return pid === "create" ? (
				<Redirect to={`/create`} />
			) : (
				<Redirect to={`/project/${pid}`} />
			);
		const message = (msg) => {
			if (msg === "noo") {
				return <p className="red-text">Email could not be sent</p>;
			} else if (msg === "yay") {
				return <p className="green-text">Email Sent!</p>;
			} else {
				return <p>{msg}</p>;
			}
		};
		return (
			<div className="container center">
				<h3>
					<span className="purple-text">
						Please verify your email before viewing / creating
						projects
					</span>
				</h3>
				<h5> Can't find your verification link?</h5>
				<button
					className="btn z-depth-0 anchor"
					onClick={this.handleClick}
				>
					Send Another Link
				</button>
				<div className="header-subrow">{message(sentMsg)}</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log("STATE", state);
	console.log("ownprops", ownProps);
	const pid = ownProps.match.params.pid;
	return {
		pid,
		auth: state.firebase.auth,
		sentMsg: state.auth.sent.verify
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		sendVerify: () => dispatch(sendVerify())
	};
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
	VerifyEmailProject
);
