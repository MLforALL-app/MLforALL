import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { signOut } from "../../store/actions/authActions";
import Avatar from "@material-ui/core/Avatar";

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
					key={props.auth.uid + "lol"}
					className="btn waves-effect waves-light btn-floating">
					{props.profile.initials}
				</NavLink>
			</li>
			{/* (Not needed but something to consider if doing profile pictures)
				<li>
					<NavLink
						style={{ height: "100%", marginTop: "12px" }}
						to={"/user/" + props.auth.uid}
						key={props.auth.uid}>
						<Avatar>{props.profile.initials}</Avatar>
					</NavLink>
				</li> */}
		</ul>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(null, mapDispatchToProps)(Signedinlinks);
