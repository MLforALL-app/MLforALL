import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<div className="anchor-link">
					<NavLink to="/about">
						<span className="purple-text">About Us</span>
					</NavLink>{" "}
				</div>
			</li>
			<li>
				<NavLink to="/signin">
					<span className="purple-text">Sign In</span>
				</NavLink>
			</li>
			<li>
				<div className="anchor-link">
					<Link to="signup" smooth="true" duration={500}>
						<span className="purple-text">Sign Up</span>
					</Link>{" "}
				</div>
			</li>
		</ul>
	);
}

export default Signedoutlinks;
