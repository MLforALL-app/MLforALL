import React, { Component } from "react";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
//import fetchMine from "./fetchmine";

class MyProjects extends Component {
	render() {
		const { projects, auth } = this.props;
		//const projects = fetchMine(auth.uid);
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<span className="purple-text">
						<h1> My projects. </h1>
					</span>
					<ProjectList projects={projects} uid={auth.uid} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	//console.log(state);
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
