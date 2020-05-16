import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const Signedinlinks = (props) => {
	return (
		<ul className="right">
			<li>
				<NavLink to="/dashboard">All Models</NavLink>{" "}
			</li>
			<li>
				<NavLink to={"/me/" + props.auth.uid} key={props.auth.uid}>
					My Models
				</NavLink>
			</li>
			<li>
				<NavLink to="/create">Create Model</NavLink>{" "}
			</li>
			<li>
				<a onClick={props.signOut}> Logout </a>
			</li>
			<li>
				<NavLink
					to={"/me/" + props.auth.uid}
					key={props.auth.uid}
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
