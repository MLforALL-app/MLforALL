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
		// Route Protection
		if (!auth.uid) return <Redirect to="/signin" />;
		// otws good to go
		return (
			<div className="dashboard container">
				<div className="row">
					<h3> Look at other people's projects </h3>
					<div className="col s20 m10">
						<Notifications notifications={notifications} />
					</div>
				</div>
				<div className="row">
					<div className="col s12 m6">
						<ProjectList projects={projects} />
					</div>
				</div>
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
		{ collection: "projects", limit: 7, orderBy: ["createdAt", "desc"] },
		{ collection: "notifications", limit: 3, orderBy: ["time", "desc"] }
	])
)(Dashboard);
