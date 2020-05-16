import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const intro = () => {
	return (
		<div className="container" style={{ textAlign: "center " }}>
			<h1> What is ML for All? </h1>
			<p>
				{" "}
				ML For All is a platform designed by two ambitious students,
				Davis and Len, seeking to spread the excitment behind machine
				learning models to people from all kinds of backgrounds. ML for
				All simplifies the math and the small details and grants you
				freedom to make observations, draw conclusions, and create
				visualizations about data.
			</p>
		</div>
	);
};

class LandingPage extends Component {
	render() {
		const { auth } = this.props;
		// Route Protection
		if (auth.uid) {
			return intro();
		} else {
			return (
				<div className="container" style={{ textAlign: "center " }}>
					{intro()}
					<h3> What are you waiting for? </h3>
					<NavLink
						to="/signup"
						className="btn z-depth-0 blue lighten-1"
					>
						Sign Up
					</NavLink>
				</div>
			);
		}
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(LandingPage);
