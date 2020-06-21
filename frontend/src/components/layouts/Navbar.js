import React from "react";
import { Link } from "react-router-dom";
import Signedinlinks from "./Singedinlinks";
import Signedoutlinks from "./Singedoutlinks";
import { connect } from "react-redux";
import logo from "../../pictures/backgrounds/logo.png";

// use parent div className = "navbar-fixed" if you want sticky
const Navbar = (props) => {
	const { auth, profile } = props;
	const links = auth.uid ? (
		<Signedinlinks profile={profile} auth={auth} />
	) : (
		<Signedoutlinks />
	);
	return (
		<div className="navbar-fixed">
			<nav className="nav-wrapper">
				<div className="container">
					<Link to="/" className="brand-logo">
						<img
							src={logo}
							alt="Machine Learning for all Logo"
							style={{ height: "2rem" }}
						/>
						<span className="purple-text">
							<b> forALL</b>
						</span>
					</Link>
					{links}
				</div>
			</nav>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth, profile: state.firebase.profile };
};

export default connect(mapStateToProps)(Navbar);
