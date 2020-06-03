import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import headerImg from "../../pictures/land-transp.png";
import whoImg from "../../pictures/who-transp.png";
import signImg from "../../pictures/sign-transp.png";
import "./landing.css";
import { Link, Element } from "react-scroll";
import SignUp from "../auth/Signup";
import { NavLink } from "react-router-dom";

const emptyDiv = () => {
	return <div style={{ height: "200px" }}></div>;
};
const header = (auth) => {
	return (
		<div
			className="row img-row"
			style={{
				backgroundImage: `url(${headerImg})`
			}}
		>
			<div className="col s12 m7">
				<div className="container land land-head">
					<div className="header-subrow">
						<h1>
							<span className="purple-text">MLforALL</span>
						</h1>
					</div>
					<div className="header-subrow">
						<Link to="goal" smooth="true" duration={500}>
							<div
								id="learn-more-landing"
								className="btn btn-sec waves-effect waves-light anchor"
							>
								Learn More
							</div>
						</Link>
					</div>
					<div className="header-subrow">
						<Link to="signup" smooth="true" duration={500}>
							<div className="btn waves-effect waves-light anchor">
								{auth.uid ? "Get Started" : "Sign Up"}
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="col s0 m5"></div>
		</div>
	);
};

const goal = () => {
	return (
		<div className="row">
			<div className="container goals">
				<div className="col s0 m1"></div>
				<div className="col s12 m6">
					<h2>Our goal.</h2>
					ML For All is a platform designed by three ambitious
					students, Davis, Joseph, and Len seeking to spread the
					excitment behind machine learning models to people from all
					kinds of backgrounds. ML for All simplifies the math and the
					small details and grants you freedom to make observations,
					draw conclusions, and create visualizations about data.
				</div>
				<div className="col s0 m5"></div>
			</div>
		</div>
	);
};

const whoweare = () => {
	return (
		<div
			className="row img-row"
			style={{
				backgroundImage: `url(${whoImg})`
			}}
		>
			<div className="col s0 m5"></div>
			<div className="col s12 m7">
				<div className="container land land-who">
					<div className="subrow">
						<h2>Who We Are</h2>
						Davis, Joseph, and Len are all from different areas of
						studies, places of the world, and walks of life. But
						what brings them together is their shared interest in
						educating people about topics they're passionate about.
						#MyHeartIsInTheWork
					</div>
				</div>
			</div>
		</div>
	);
};
const video = () => {
	return (
		<div className="container land video">
			<h2> Demo Video </h2>
			<iframe
				title="pre-release demo"
				width="560"
				height="315"
				src="https://www.youtube.com/embed/CswRqTuqzHQ"
				frameBorder="0"
				allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
				allowFullScreen
			></iframe>
		</div>
	);
};
const landSign = (auth) => {
	if (!auth.uid) {
		return (
			<div>
				<div className="row" style={{ textAlign: "center" }}>
					<h2>Sign up now.</h2>
					<p>Be a part of the community and start learning</p>
				</div>
				<div
					className="row img-row"
					style={{ backgroundImage: `url(${signImg})` }}
				>
					<div className="col s12 m7">
						<div className="container land land-sign">
							<SignUp />
							<div className="container land">
								<NavLink to="/signin">
									{" "}
									Already a user? Sign in here.
								</NavLink>
							</div>
						</div>
					</div>
					<div className="col s0 m5"></div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container land">
				<h2>What are you waiting for?</h2>
				<div className="anchor header-subrow">
					<NavLink to="/create">
						<div
							id="learn-more-landing"
							className="btn waves-effect waves-light anchor"
						>
							Create
						</div>{" "}
					</NavLink>
				</div>
				<div className="anchor header-subrow">
					<NavLink to="/create">
						<div
							id="learn-more-landing"
							className="btn btn-sec waves-effect waves-light anchor"
						>
							Explore
						</div>{" "}
					</NavLink>
				</div>
			</div>
		);
	}
};

class JoeLand extends Component {
	render() {
		const { auth } = this.props;
		return (
			<div>
				{" "}
				{header(auth)}
				<Element name="goal" className="element">
					{goal()}
				</Element>
				<Element name="who" className="element">
					{whoweare()}
				</Element>
				<Element name="how" className="element">
					{video()}
				</Element>
				<Element name="signup" className="element">
					{landSign(auth)}
				</Element>
				{emptyDiv()}
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

export default connect(mapStateToProps)(JoeLand);
