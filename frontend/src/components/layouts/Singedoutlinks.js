import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<div className="anchor-link">
					<Link to="goal" smooth="true" duration={500}>
						<span className="purple-text">Our Goal</span>
					</Link>{" "}
				</div>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="who" smooth="true" duration={500}>
						<span className="purple-text">Who We Are</span>
					</Link>{" "}
				</div>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="how" smooth="true" duration={500}>
						<span className="purple-text">How It Works</span>
					</Link>{" "}
				</div>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="signup" smooth="true" duration={500}>
						<span className="purple-text">Sign Up</span>
					</Link>{" "}
				</div>
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
