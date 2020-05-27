import React from "react";
import { NavLink } from "react-router-dom";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<NavLink to="/">
					<span className="purple-text">About</span>
				</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/signup">
					<span className="purple-text">Sign Up</span>
				</NavLink>{" "}
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
