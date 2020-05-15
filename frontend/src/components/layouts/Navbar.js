import React from "react";
import { Link } from "react-router-dom";
import Signedinlinks from "./Singedinlinks";
import Signedoutlinks from "./Singedoutlinks";
import { connect } from "react-redux";

const Navbar = (props) => {
	const { auth, profile } = props;
	const links = auth.uid ? (
		<Signedinlinks profile={profile} />
	) : (
		<Signedoutlinks />
	);
	return (
		<nav className="nav-wrapper grey darken-3">
			<div className="container">
				<Link to="/" className="brand-logo">
					{" "}
					MLforAll
				</Link>
				{links}
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	console.log(state);
	return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
