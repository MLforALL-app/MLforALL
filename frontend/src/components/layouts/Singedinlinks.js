import React from "react";
import { NavLink } from "react-router-dom";

function Signedinlinks() {
	return (
		<ul className="right">
			<li>
				<NavLink to="/create">New Project</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/">Logout</NavLink>
			</li>
			<li>
				<NavLink to="/" className="btn btn-floating blue lighten-1">
					LH
				</NavLink>
			</li>
		</ul>
	);
}

export default Signedinlinks;
