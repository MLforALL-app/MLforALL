import React from "react";
import { Link } from "react-router-dom";
import Signedinlinks from "./Singedinlinks";
import Signedoutlinks from "./Singedoutlinks";

function Navbar() {
	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					{" "}
					MLforAll
				</Link>
				<Signedinlinks />
				<Signedoutlinks />
			</div>
		</nav>
	);
}

export default Navbar;
