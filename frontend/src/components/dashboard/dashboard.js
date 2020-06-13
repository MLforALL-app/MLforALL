import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectlist";
import HelpBox from "../layouts/helpbox";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	state = {
		orderBy: "createdAt",
		limit: 2,
		direction: "desc"
	};
	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		return (
			<div className="dashboard container">
				<div className="row">
					<h1>
						<span className="purple-text">Explore </span>
						<HelpBox
							header="Explore here!"
							placement="right-start"
							desc="This is the main page of MLforALL. Here you can see projects that other people have been working on! Click on any one of the cards below to enter an interactive experience of testing their classification models."
						/>
					</h1>
				</div>
				{/*<div className="row">
					<Notifications notifications={notifications} />
				</div>*/}
				{console.log("DASH STATE", this.state)}
				<ProjectList
					orderBy={this.state.orderBy}
					limit={this.state.limit}
					direction={this.state.direction}
				/>
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

export default connect(mapStateToProps)(Dashboard);
