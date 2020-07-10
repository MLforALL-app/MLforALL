import React, { Component } from "react";
import { connect } from "react-redux";
import davImg from "../../pictures/headshots/davis.jpg";
import joeImg from "../../pictures/headshots/joe.jpeg";
import lenImg from "../../pictures/headshots/len.JPG";
import maxImg from "../../pictures/headshots/max.jpg";
import meghaImg from "../../pictures/headshots/megha.jpg";
import rongImg from "../../pictures/headshots/rong.jpg";
// import img1 from "../../pictures/about/ausvg1.svg";
import img3 from "../../pictures/about/ausvg3.svg";
import img7 from "../../pictures/about/ausvg7.svg";
import "../../styling/landing.css";
import "../../styling/about.css";
// import SignUp from "../auth/Signup";
import { Element, Link } from "react-scroll";
import { Redirect } from "react-router-dom";
import { SocialIcon } from "react-social-icons";
import { isBrowser } from "react-device-detect";
// import { firestoreConnect } from "react-redux-firebase";
// import { compose } from "redux";

const Header = () => {
	return (
		<div>
			<div className="row center">
				<div className="col s0 m3"></div>
				<div className="col s12 m6 container ap-header">
					<div>
						<h1
							className="purple-text abt"
							style={isBrowser ? { fontSize: "90px" } : {}}>
							About Us
						</h1>
						<p>Learn more about the team.</p>
					</div>
				</div>
				<div className="col s0 m3"></div>
			</div>
			<br />
			<div className="row center aplearn">
				<Link to="signup" transition={500} smooth={true}>
					<hr className="lp-line" />
				</Link>
				<LearnMore />
			</div>
		</div>
	);
};

const LearnMore = () => {
	return (
		<Link to="signup" transition={500} smooth={true}>
			<p
				style={{
					textAlign: "center",
					margin: "0",
					color: "grey",
					cursor: "pointer"
				}}>
				Learn more
			</p>
			<p style={{ textAlign: "center", margin: "0" }}>
				<i
					className="arrow down"
					style={{
						border: "solid grey",
						borderWidth: "0 1.5px 1.5px 0",
						display: "inline-block",
						padding: "3px",
						transform: "rotate(45deg)",
						WebkitTransform: "rotate(45deg)",
						cursor: "pointer"
					}}></i>
			</p>
		</Link>
	);
};

const OurGoal = () => {
	return (
		<div
			className="row img-row"
			style={{ backgroundImage: `url(${img3})`, backgroundColor: "white" }}>
			<div
				className="row center"
				style={
					isBrowser
						? { height: "calc(25rem + 20vh)" }
						: { height: "calc(15rem + 15vh)" }
				}>
				<div className="col s1 m3"></div>
				<div className="col s10 m6">
					<h3 className="purple-text boldText OG">Our Goal</h3>
					<br />
					<p>
						MLforALL guides you in learning about and experimenting with machine
						learning without coding experience. Machine learning is a hot topic
						and used everywhere. However, it can be difficult to find where to
						start learning about it, and how! That's why Davis and Len started
						this platform where you can create, explore, and play with machine
						learning models in our guided and streamlined process. MLforALL
						simplifies the math and the small details and grants you freedom to
						make observations, draw conclusions, and create visualizations about
						data.
					</p>
				</div>
				<div className="col s1 m3"></div>
			</div>
		</div>
	);
};

const WWA = () => {
	return (
		<div
			className="row img-row"
			style={{ backgroundImage: `url(${img3})`, backgroundColor: "white" }}>
			<div
				className="row center"
				style={
					isBrowser
						? { height: "calc(25rem + 15vh)" }
						: { height: "calc(15rem + 15vh)" }
				}>
				<div className="col s1 m3"></div>
				<div className="col s10 m6">
					<h3 className="purple-text boldText OG">Who We Are</h3>
					<br />
					<p>
						Our team is comprised of people from various walks of life and areas
						of the world. But what brings us together is our background as
						Carnegie Mellon University students and our desire to educate people
						about something that's increasingly important and relevant: machine
						learning. <br />
						<strong> #MyHeartIsInTheWork</strong>
					</p>
				</div>
				<div className="col s1 m3"></div>
			</div>
		</div>
	);
};

const teamr1 = [
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
	}
];
const teamr2 = [
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
	}
];
const teamr3 = [
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

const makePicture = (name, title, link, picture) => {
	return (
		<div key={name} style={{ padding: "4em 9vw" }} className="center">
			<a target="_blank" rel="noreferrer noopener" href={link}>
				<img
					src={picture}
					alt="Dav"
					style={
						isBrowser
							? {
									height: "calc(8rem + 9vh + 1vw)",
									width: "calc(8rem + 9vh + 1vw)",
									borderRadius: "100%"
							  }
							: {
									height: "calc(4rem + 4vh + 1vw)",
									width: "calc(4rem + 4vh + 1vw)",
									borderRadius: "100%"
							  }
					}
				/>
			</a>
			<h5>{name}</h5>
			<h6>{title}</h6>
		</div>
	);
};

const headshot = () => {
	return (
		<div className="center headShot">
			<h4 className="purple-text">Meet Our Team</h4>
			<div className="land-row">
				{teamr1.map((p) => makePicture(p.name, p.title, p.link, p.img))}
			</div>
			<div className="land-row">
				{teamr2.map((p) => makePicture(p.name, p.title, p.link, p.img))}
			</div>
			<div className="land-row">
				{teamr3.map((p) => makePicture(p.name, p.title, p.link, p.img))}
			</div>
		</div>
	);
};

const landSign = () => {
	return (
		<div>
			<div
				className="row img-row"
				style={{ backgroundImage: `url(${img7})`, backgroundColor: "white" }}>
				<div className="row center">
					<div className="container apland center">
						<Element name="signup" className="element">
							<span>
								<h3 className="purple-text GIT">Get In Touch!</h3>
							</span>
							<div className="container land-row">
								<SocialIcon
									url="http://linkedin.com/company/mlforall"
									className="SM"
									target="_blank"
									rel="noopener noreferrer"
								/>
								<SocialIcon
									url="https://www.instagram.com/ml.for.all/"
									className="SM"
									target="_blank"
									rel="noopener noreferrer"
								/>
								<SocialIcon
									url="https://github.com/lenghuang/MLforAll"
									className="SM"
									target="_blank"
									rel="noopener noreferrer"
								/>
								<SocialIcon
									url="mlforall.cmu@gmail.com"
									className="SM"
									target="_blank"
									rel="noopener noreferrer"
								/>

								{/* <SignUp className="center" /> */}
							</div>
						</Element>
					</div>
				</div>
			</div>
		</div>
	);
};

class About extends Component {
	render() {
		const { auth } = this.props;
		if (!auth.uid) {
			return (
				<div className="white-background-landing">
					<Header />
					<OurGoal />
					<WWA />
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
