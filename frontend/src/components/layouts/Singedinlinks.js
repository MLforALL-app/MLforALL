import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const Signedinlinks = (props) => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/dashboard">Home</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/create">New Project</NavLink>{" "}
			</li>
			<li>
				<a onClick={props.signOut}> Logout </a>
			</li>
			<li>
				<NavLink
					to="/dashboard"
					className="btn btn-floating blue lighten-1"
				>
					{props.profile.initials}
				</NavLink>
			</li>
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(Signedinlinks);
