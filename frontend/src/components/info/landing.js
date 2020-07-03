import React, { Component } from "react";
import { connect } from "react-redux";
// Import images like this
import whoImg from "../../pictures/backgrounds/who.svg";
// Import css files like this
import "../../styling/landing.css";
import SignUp from "../auth/Signup";
import { Element } from "react-scroll";
import { Redirect } from "react-router-dom";

const landSign = () => {
	return (
		<div className="row center">
			<Element name="signup" className="element">
				<h2 className="purple-text"> Sign Up Here </h2>
				<div className="container land-col">
					<SignUp />
				</div>
			</Element>
		</div>
	);
};

const example = () => {
	// I can do normal javascript stuff in this function
	var x = 1 + 2 + 3;
	// I can print things to debug. View this by doing inspect element
	console.log("This is x", x);
	// And then the result of this, besides being normal js, can also be HTML! (or JSX)
	return (
		<div className="container">
			<img src={whoImg} alt=""></img>
			And in here I can do normal HTML things like <b>THIS</b>. Ideally, you
			canwrite various sections of the pages as different functions to keep
			things organized, and then you can call as necessary in the main class.
		</div>
	);
};

class Landing extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return (
				<div className="white-background-landing">
					{example()}
					<h1 className="pink-text">
						{" "}
						Note that to do javascript, you need curly braces{" "}
					</h1>
					{example()}
					{landSign()}
				</div>
			);
		} else {
			// Don't let people see landing page
			return <Redirect to="/dashboard" />;
		}
	}
}

// This lets us know if someone is logged in or not
const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(Landing);
