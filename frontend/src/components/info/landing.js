import React, { Component } from "react";
import { connect } from "react-redux";
// Import images like this
import img1 from "../../pictures/landing/LP1.svg";
import img2 from "../../pictures/landing/LP2.svg";
// Import css files like this
import "../../styling/landing.css";
import "../../styling/features.css";
import SignUp from "../auth/Signup";
import { Element, Link } from "react-scroll";
import { Redirect } from "react-router-dom";

const landSign = () => {
	return (
		<div className="row center">
			<Element name="signup" className="element">
				<h2 className="purple-text"> Sign Up Here </h2>
				<div className="container land">
					<SignUp />
				</div>
			</Element>
		</div>
	);
};

const Header = () => {
	return (
		<div className="row center">
			<div className="col s0 m4 lp-header">
				<img className="lp-img" src={img1} alt="" />
			</div>
			<div className="col s12 m4 container lp-header land">
				<div>
					<h1 className="purple-text">MLforALL</h1>
					<p>
						Create, share, explore, and play with Machine Learning Models
						created by others.
					</p>
				</div>
				<div style={{ paddingTop: "2rem" }}>
					<span>
						<button className="btn btn-outline anchor-160 waves-effect waves-light z-depth-0">
							Sign Up
						</button>
						<button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0">
							Create
						</button>
					</span>
				</div>
			</div>
			<div className="col s0 m4 lp-header">
				<img className="lp-img" src={img2} alt="" />
			</div>
		</div>
	);
};

const LearnMore = () => {
	return (
		<Link to="signup">
			<hr />
		</Link>
	);
};

class Landing extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return (
				<div className="white-background-landing">
					<Header />
					<LearnMore />
					<Header />
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
