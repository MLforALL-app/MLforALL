import React, { Component } from "react";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";

class MyProjects extends Component {
	render() {
		const { projects, auth } = this.props;
		// TODO: change const projects so its only this user's projects
		// Route Protection
		if (!auth.uid) return <Redirect to="/signin" />;
		// otws good to go
		return (
			<div>
				<span style={{ textAlign: "center" }}>
					<h3> You got some awesome projects! </h3>
				</span>
				<div className="dashboard container">
					<div className="row">
						<div className="col s16 m10">
							<ProjectList projects={projects} />
						</div>
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
	firestoreConnect([
		{ collection: "projects", orderBy: ["createdAt", "desc"] }
	])
)(MyProjects);
