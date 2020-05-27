import React, { Component } from "react";
import Notifications from "./notifcations";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	render() {
		const { projects, auth, notifications } = this.props;
		console.log("This is auth", auth);
		// Route Protection
		if (!auth.uid) return <Redirect to="/signin" />;
		// otws good to go
		return (
			<div className="dashboard container">
				<div className="row">
					<span className="purple-text">
						<h1> Explore. </h1>
					</span>
					<Notifications notifications={notifications} />
				</div>
				<ProjectList projects={projects} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
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
