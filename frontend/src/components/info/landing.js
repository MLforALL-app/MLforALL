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

const LandSign = () => {
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

<<<<<<< HEAD
const example = () => {
	// I can do normal javascript stuff in this function
	var x = 1 + 2 + 3;
	// I can print things to debug. View this by doing inspect element
	//console.log("This is x", x);
	// And then the result of this, besides being normal js, can also be HTML! (or JSX)
=======
const Header = () => {
>>>>>>> ca6e5d080809a9397564a13cc854f45e52b326d5
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

<<<<<<< HEAD

const Inc = (move) => {
	return (<div className = "container center"> 
		<button onClick={move} className = "btn waves-effect waves-light">
			Click Me
		</button>
	</div>)
=======
const LearnMore = () => {
	return (
		<Link to="signup" transition={500} smooth={true}>
			<hr className="lp-line" />
		</Link>
	);
>>>>>>> ca6e5d080809a9397564a13cc854f45e52b326d5
};

class Landing extends Component {
	state = {
		count: 0
	};

	handleClick = () => {
		this.setState((prev) => {
			return {
				count: prev.count + 1
			};
		});
	};

	render() {
		console.log("count =" ,this.state.count)
		const { auth } = this.props;
		if (!auth.uid) {
			return (
				<div className="white-background-landing">
<<<<<<< HEAD
					{example()}
					{Inc(this.handleClick)}
					<h1 className="pink-text">
						{" "}
						Note that to do javascript, you need curly braces{" "}
					</h1>
					{example()}
					{landSign()}
=======
					<Header />
					<LearnMore />
					<Header />
					<LandSign />
>>>>>>> ca6e5d080809a9397564a13cc854f45e52b326d5
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
