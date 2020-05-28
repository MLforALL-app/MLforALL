import React from "react";
import { Link } from "react-router-dom";
import Signedinlinks from "./Singedinlinks";
import Signedoutlinks from "./Singedoutlinks";
import { connect } from "react-redux";
import logo from "../../pictures/logo.png";

const Navbar = (props) => {
	const { auth, profile } = props;
	const links = auth.uid ? (
		<Signedinlinks profile={profile} auth={auth} />
	) : (
		<Signedoutlinks />
	);
	return (
		<nav className="nav-wrapper ">
			<div className="container">
				<Link to="/" className="brand-logo">
					<img src = {logo} alt = "Machine Learning for all Logo" style = {{height : "2rem"}}/>
					<span className="purple-text">forALL</span>
				</Link>
				{links}
			</div>
		</nav>
	);
};

const mapStateToProps = (state) => {
	//console.log(state);
	return { auth: state.firebase.auth, profile: state.firebase.profile };
};


export default connect(mapStateToProps)(Navbar);
