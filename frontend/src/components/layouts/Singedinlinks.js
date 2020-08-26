import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";

const Signedinlinks = (props) => {
	return (
		<ul className="right anchor-link">
			<li>
				<NavLink to="/dashboard">
					<span className="purple-text">Explore</span>
				</NavLink>{" "}
			</li>
			<li>
				<NavLink to={"/user/" + props.auth.uid} key={props.auth.uid}>
					<span className="purple-text">My Models</span>
				</NavLink>
			</li>
			<li>
				<NavLink to="/create">
					<span className="purple-text">Create</span>
				</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/help">
					<span className="purple-text">Help</span>
				</NavLink>{" "}
			</li>
			<li>
				<NavLink to="/" onClick={props.signOut}>
					<span className="purple-text">Logout</span>
				</NavLink>{" "}
			</li>
			<li>
				<NavLink
					to={"/user/" + props.auth.uid}
					key={props.auth.uid}
					className="btn waves-effect waves-light btn-floating">
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
