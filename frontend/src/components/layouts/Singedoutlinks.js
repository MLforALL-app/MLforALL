import React from "react";
import { NavLink } from "react-router-dom";

function Signedoutlinks() {
	return (
		<ul className="right">
			<li>
				<NavLink to="/">About</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/signup">Sign Up</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/signin">Login</NavLink>
			</li>
		</ul>
	);
}

export default Signedoutlinks;
