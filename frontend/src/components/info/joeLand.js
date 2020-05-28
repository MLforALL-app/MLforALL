import React, { Component } from "react";
// import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import headerImg from "../../pictures/headerland.png";
import "./landing.css";
import * as Scroll from "react-scroll";
import SignUp from "../auth/Signup";

const lorem = () => {
	return (
		<div>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis
			fringilla diam at nulla facilisis, sit amet lobortis orci efficitur.
			Mauris facilisis, arcu ut accumsan mollis, nisi magna aliquet odio,
			ut efficitur urna leo et eros. Mauris iaculis cursus pharetra.
			Maecenas imperdiet feugiat efficitur. Curabitur finibus ut magna
			quis ultricies. Aenean at magna eu mauris aliquam convallis vitae eu
			tortor. Nulla ultricies eleifend turpis, in tincidunt lorem gravida
			tempus.
		</div>
	);
};
let Link = Scroll.Link;
let Element = Scroll.Element;
let Events = Scroll.Events;
let scrollSpy = Scroll.scrollSpy;

const header = () => {
	return (
		<div
			className="row header-row"
			style={{
				backgroundImage: `url(${headerImg})`
			}}
		>
			<div className="col s12 m6">
				<div className="container land-head">
					<div className="header-subrow">
						<h1>
							<span className="purple-text">MLforALL</span>
						</h1>
					</div>
					<div className="heade-subrow">
						<Link to="learn" smooth={true} duration={500}>
							<div className="btn waves-effect waves-light anchor">
								Learn More
							</div>
						</Link>
					</div>
					<div className="header-subrow">
						<Link to="sign" smooth={true} duration={500}>
							<div className="btn waves-effect waves-light anchor">
								Sign Up
							</div>
						</Link>
					</div>
				</div>
			</div>
			<div className="col s6"></div>
		</div>
	);
};

class JoeLand extends Component {
	componentDidMount = () => {
		Events.scrollEvent.register("begin", function (to, element) {
			//console.log("begin", arguments);
		});

		Events.scrollEvent.register("end", function (to, element) {
			//console.log("end", arguments);
		});

		scrollSpy.update();
	};
	componentWillUnmount = () => {
		Events.scrollEvent.remove("begin");
		Events.scrollEvent.remove("end");
	};
	render() {
		// const { auth } = this.props;
		// Route Protection

		return (
			<div>
				{" "}
				{header()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				<Element name="learn" className="element"></Element>
				<h1> ML FOR ALL</h1>
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				{lorem()}
				<Element name="sign" className="element"></Element>
				<SignUp />
				{lorem()}
				{lorem()}
				{lorem()}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(JoeLand);
