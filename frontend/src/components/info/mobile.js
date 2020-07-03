import React from "react";
import oops from "../../pictures/backgrounds/oops.svg";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { signOut } from "../../store/actions/authActions";

const Mobile = (props) => {
	const handleClick = () => {
		if (props.auth.uid) {
			props.signOut();
		}
	};
	return (
		<div className="container">
			{!props.auth.uid ? <Redirect to="/" /> : ""}
			<div>
				<h1 className="purple-text">Sorry.</h1>
				<br />
				<p>
					This site is best viewed on <b>desktop/laptop</b> and this
					functionality is not supported on mobile. Check out{" "}
					<u>
						<a href="https://www.youtube.com/embed/CswRqTuqzHQ">this video</a>
					</u>{" "}
					to learn more.
				</p>
				<br />
				<div className="center">
					<button
						onClick={handleClick}
						className="btn btn-outline z-depth-0 anchor">
						Bring Me Back
					</button>
				</div>
				<br />
				<br />
				<img src={oops} alt="" />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => {
	return { auth: state.firebase.auth };
};
const mapDispatchToProps = (dispatch) => {
	return {
		signOut: () => dispatch(signOut())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Mobile);
