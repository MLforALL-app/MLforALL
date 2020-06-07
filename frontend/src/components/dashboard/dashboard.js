import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectlist";
import HelpBox from "../layouts/helpbox";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	render() {
		// notifications is in props too
		// TODO: Add Sort By functionality
		const { projects, auth } = this.props;
		//console.log("This is auth", auth);
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		// otws good to go
		return (
			<div className="dashboard container">
				<div className="row">
					<h1>
						<span className="purple-text">Explore </span>
						<HelpBox
							header="The Explore Page"
							placement="right-start"
							desc="This is the main page of MLforALL. Here you can see projects that other people have been working on! Click on any one of the cards below to enter an interactive experience of testing their classification models."
						/>
					</h1>
				</div>
				{/*<div className="row">
					<Notifications notifications={notifications} />
				</div>*/}
				<ProjectList projects={projects} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
	return {
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		notifications: state.firestore.ordered.notifications
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: "projects",
			orderBy: ["createdAt", "desc"],
			limit: 14
		},
		{ collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
	])
)(Dashboard);
