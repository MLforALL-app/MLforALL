import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import headerImg from "../../pictures/headerland.png";
import "./landing.css";

const header = () => {
	return (
		<div
			className="row"
			style={{
				backgroundImage: `url(${headerImg})`
			}}
		>
			<div className="col s12 m6">
				<div
					className="container"
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						height: "calc(10rem + 25vw + 60px)"
					}}
				>
					<h1>
						<span className="purple-text">MLforALL</span>
					</h1>
				</div>
			</div>
			<div className="col s6"></div>
		</div>
	);
};

class JoeLand extends Component {
	render() {
		// const { auth } = this.props;
		// Route Protection

		return <div> {header()}</div>;
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(JoeLand);
