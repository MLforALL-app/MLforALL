import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<NavLink to="/" smooth={true} duration={500}>
					<span className="purple-text">Home</span>
				</NavLink>{" "}
			</li>
			<li>
				<Link to="goal" smooth={true} duration={500}>
					<span className="purple-text">Goal</span>
				</Link>{" "}
			</li>
			<li>
				<Link to="who" smooth={true} duration={500}>
					<span className="purple-text">Who</span>
				</Link>{" "}
			</li>
			<li>
				<Link to="how" smooth={true} duration={500}>
					<span className="purple-text">How</span>
				</Link>{" "}
			</li>
			<li>
				<Link to="signup" smooth={true} duration={500}>
					<span className="purple-text">Sign Up</span>
				</Link>{" "}
			</li>
			<li>
				<NavLink to="/signin">
					<span className="purple-text">Sign In</span>
				</NavLink>
			</li>
		</ul>
	);
}

export default Signedoutlinks;
