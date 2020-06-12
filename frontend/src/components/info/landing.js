import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const intro = () => {
	return (
		<div className="container" style={{ textAlign: "center " }}>
			<h1> What is ML for All? </h1>
			<p>
				{" "}
				ML For All is a platform designed by three ambitious students,
				Davis, Joseph, and Len, seeking to spread the excitment behind
				machine learning models to people from all kinds of backgrounds.
				ML for All simplifies the math and the small details and grants
				you freedom to make observations, draw conclusions, and create
				visualizations about data.
			</p>
			<ul>
				<li>
					<h5 className="purple-text">Davis Wojnovich</h5> Head data
					scientist / software engineer
				</li>
				<li>
					<h5 className="purple-text">Joseph Kim</h5> Director of user
					interface / front-end designer
				</li>
				<li>
					<h5 className="purple-text">Len Huang</h5> Lead software
					engineer / data scientist
				</li>
			</ul>
		</div>
	);
};

const video = () => {
	return (
		<div style={{ padding: "20px" }}>
			<iframe
				title="pre-release demo"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/CswRqTuqzHQ"
				frameborder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
		</div>
	);
};

class LandingPage extends Component {
	render() {
		const { auth } = this.props;
		// Route Protection

		return (
			<div className="container" style={{ textAlign: "center " }}>
				{intro()}
				{auth.uid ? (
					video()
				) : (
					<div>
						<h3> What are you waiting for? </h3>
						<NavLink
							to="/signup"
							className="btn waves-effect waves-light z-depth-0 ">
							Sign Up
						</NavLink>
					</div>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(LandingPage);
