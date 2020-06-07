import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import headerImg from "../../pictures/land-transp.png";
import whoImg from "../../pictures/who-transp.png";
import signImg from "../../pictures/sign-transp.png";
import davImg from "../../pictures/headshots/davis.jpg";
import joeImg from "../../pictures/headshots/joe.jpeg";
import lenImg from "../../pictures/headshots/len.JPG";
import maxImg from "../../pictures/headshots/max.jpg";
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
					<h1 style={{ fontSize: "5rem" }}>
						<span className="purple-text">MLforALL</span>
					</h1>
					<div className="row container center">
						<h5 style={{ fontSize: "1.2rem" }}>
							An educational community helping you take your first
							step into machine learning: classification models
						</h5>
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
					ML For All is a platform designed by four ambitious
					students, Davis, Joseph, Len, and Max seeking to spread the
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
						Davis, Joseph, Len, and Max are all from different areas
						of studies, places of the world, and walks of life. But
						what brings them together is their shared interest in
						educating people about topics they're passionate about.
						<a
							target="_blank"
							rel="noreferrer noopener"
							href="https://www.youtube.com/watch?v=nyHnU123Iew"
						>
							#MyHeartIsInTheWork
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
const headshot = () => {
	return (
		<div className="land land-headshot">
			<div className="row">
				<div className="col s6 m3 center container">
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.linkedin.com/in/davis-wojnovich-560740165/"
					>
						<img className="headshot-img" src={davImg} alt="Dav" />
					</a>
					<h5>Davis Wojnovich</h5>
					<h6>Lead Data Science</h6>
				</div>
				<div className="col s6 m3 center container">
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.linkedin.com/in/josephkimdesign/"
					>
						<img className="headshot-img" src={joeImg} alt="Joe" />
					</a>
					<h5>Joseph Kim</h5>
					<h6>UI/UX Design</h6>
				</div>
				<div className="col s6 m3 center container">
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.linkedin.com/in/len-huang-622403178"
					>
						<img className="headshot-img" src={lenImg} alt="Len" />
					</a>
					<h5>Len Huang</h5>
					<h6>Product / Tech Lead</h6>
				</div>
				<div className="col s6 m3 center container">
					<a
						target="_blank"
						rel="noreferrer noopener"
						href="https://www.linkedin.com/in/max-hirsch/"
					>
						<img className="headshot-img" src={maxImg} alt="Max" />
					</a>
					<h5>Max Hirsch</h5>
					<h6>Head of ML Content</h6>
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
			<div
				className="row img-row"
				style={{ backgroundImage: `url(${signImg})` }}
			>
				<div className="col s12 m7">
					<div className="container land land-sign">
						<h2>Sign up now.</h2>
						<h6>Be a part of the community and start learning</h6>
						<SignUp />
					</div>
				</div>
				<div className="col s0 m5"></div>
			</div>
		);
	} else {
		return (
			<div
				className="row img-row"
				style={{ backgroundImage: `url(${signImg})` }}
			>
				<div className="col s12 m7">
					<div className="container land land-sign">
						<h2>Let's get it!</h2>
						<div className="anchor header-subrow">
							<NavLink to="/create">
								<div className="btn waves-effect waves-light anchor">
									Create
								</div>{" "}
							</NavLink>
						</div>
						<div className="anchor header-subrow">
							<NavLink to="/create">
								<div className="btn btn-sec waves-effect waves-light anchor">
									Explore
								</div>{" "}
							</NavLink>
						</div>
					</div>
					<div className="col s0 m5"></div>
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
					{headshot()}
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
