import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<NavLink to="/" smooth="true" duration={500}>
					<span className="purple-text">Home</span>
				</NavLink>{" "}
			</li>
			<li>
				<div className="anchor-link">
					<Link to="goal" smooth="true" duration={500}>
						<span className="purple-text">Goal</span>
					</Link>{" "}
				</div>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="who" smooth="true" duration={500}>
						<span className="purple-text">Who</span>
					</Link>{" "}
				</div>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="how" smooth="true" duration={500}>
						<span className="purple-text">How</span>
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
