import React, { Component } from "react";
import { connect } from "react-redux";
import davImg from "../../pictures/headshots/davis.jpg";
import joeImg from "../../pictures/headshots/joe.jpeg";
import lenImg from "../../pictures/headshots/len.JPG";
import maxImg from "../../pictures/headshots/max.jpg";
import "../../styling/landing.css";
import SignUp from "../auth/Signup";
import { Element } from "react-scroll";
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

const makePicture = (name, title, link, picture) => {
	return (
		<div className="col s6 m3 center container">
			<a target="_blank" rel="noreferrer noopener" href={link}>
				<img className="headshot-img" src={picture} alt="Dav" />
			</a>
			<h5>{name}</h5>
			<h6>{title}</h6>
		</div>
	);
};

const headshot = () => {
	return (
		<div className="land land-headshot">
			<div className="row">
				{makePicture(
					"Davis Wojnovich",
					"Lead Data Science",
					"https://www.linkedin.com/in/davis-wojnovich-560740165/",
					davImg
				)}
				{makePicture(
					"Joseph Kim",
					"UI/UX Design",
					"https://www.linkedin.com/in/josephkimdesign/",
					joeImg
				)}
				{makePicture(
					"Len Huang",
					"Product / Tech Lead",
					"https://www.linkedin.com/in/len-huang-622403178",
					lenImg
				)}
				{makePicture(
					"Max Hirsch",
					"Head of ML Content",
					"https://www.linkedin.com/in/max-hirsch/",
					maxImg
				)}
			</div>
		</div>
	);
};

class About extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return (
				<div className="">
					{headshot()}
					{landSign()}
				</div>
			);
		} else {
			// Don't let people see landing page
			return <Redirect to="/dashboard" />;
		}
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(About);
