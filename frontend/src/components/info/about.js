import React, { Component } from "react";
import { connect } from "react-redux";
import davImg from "../../pictures/headshots/davis.jpg";
import joeImg from "../../pictures/headshots/joe.jpeg";
import lenImg from "../../pictures/headshots/len.JPG";
import maxImg from "../../pictures/headshots/max.jpg";
import meghaImg from "../../pictures/headshots/megha.jpg";
import rongImg from "../../pictures/headshots/rong.jpg";
import "../../styling/landing.css";
import SignUp from "../auth/Signup";
import { Element } from "react-scroll";
import { Redirect } from "react-router-dom";

const landSign = () => {
	return (
		<div className="row center">
			<Element name="signup" className="element">
				<h2 className="purple-text"> Sign Up Here </h2>
				<div className="container land-row">
					<SignUp />
				</div>
			</Element>
		</div>
	);
};

const makePicture = (name, title, link, picture) => {
	return (
		<div key={name} style={{ padding: "1.8rem" }} className="center">
			<a target="_blank" rel="noreferrer noopener" href={link}>
				<img className="headshot-img" src={picture} alt="Dav" />
			</a>
			<h5>{name}</h5>
			<h6>{title}</h6>
		</div>
	);
};

const team = [
	{
		name: "Davis Wojnovich",
		title: "Data Science Lead",
		link: "https://www.linkedin.com/in/davis-wojnovich-560740165/",
		img: davImg
	},
	{
		name: "Joseph Kim",
		title: "UI Design Lead",
		link: "https://www.linkedin.com/in/josephkimdesign/",
		img: joeImg
	},
	{
		name: "Len Huang",
		title: "Agile / Tech Lead",
		link: "https://www.linkedin.com/in/len-huang/",
		img: lenImg
	},
	{
		name: "Max Hirsch",
		title: "Machine Learning Lead",
		link: "https://www.linkedin.com/in/max-hirsch/",
		img: maxImg
	},
	{
		name: "Megha Jain",
		title: "Software Engineer",
		link: "https://mlforall.xyz",
		img: meghaImg
	},
	{
		name: "Rong Feng Ye",
		title: "Software Engineer",
		link: "https://www.linkedin.com/in/rong-ye/",
		img: rongImg
	}
];

const headshot = () => {
	const pictures = team.map((p) => makePicture(p.name, p.title, p.link, p.img));
	return (
		<div className="row center">
			<h2 className="purple-text">Meet Our Team</h2>
			<div className="container land-row">{pictures}</div>
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
