import React, { Component } from "react";
import Notifications from "./notifcations";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
	render() {
		const { projects, auth } = this.props;
		// Route Protection
		if (!auth.uid) return <Redirect to="/signin" />;
		// otws good to go
		return (
			<div className="dashboard container">
				<div className="row">
					<div className="col s12 m6">
						<ProjectList projects={projects} />
					</div>
					<div className="col s12 m5 offset-m1">
						<Notifications />
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
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "projects" }])
)(Dashboard);
