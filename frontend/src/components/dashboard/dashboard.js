import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectlist";
import HelpBox from "../layouts/helpbox";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	state = {
		orderBy: "createdAt",
		limit: 5,
		startAt: 0,
		direction: "asc"
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
				<ProjectList
					orderBy={this.state.orderBy}
					limit={this.state.limit}
					direction={this.state.direction}
					startAt={this.state.startAt}
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
