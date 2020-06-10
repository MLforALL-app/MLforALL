import React, { Component } from "react";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import HelpBox from "../layouts/helpbox";
//import fetchMine from "./fetchmine";

class MyProjects extends Component {
	render() {
		const { projects, auth } = this.props;
		//const projects = fetchMine(auth.uid);
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<h1>
						<span className="purple-text">
							My models.{" "}
							<HelpBox
								header="My models"
								placement="right-start"
								desc="Click on the cards to view your classification models!"
							/>
						</span>
					</h1>
					<ProjectList projects={projects} uid={auth.uid} />
					<div className="video center">
						<Link to="/create">
							<button className="btn btn-sec z-depth-0">
								Click Here to Create More!
							</button>
						</Link>
					</div>
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
