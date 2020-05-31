import React from "react";
import GenerateSliders from "./slide/generateSliders";
import DescCard from "./cards/descCard";
import CSVCard from "./cards/csvCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import "./main.css";

/* MAIN COMPONENT
 * Uses the helper components DescCard, Generate Sliders, and CSV Card
 * to create the view project page.
 */
const ProjectDetails = (props) => {
	// id = unique projID, auth = firebase auth object, project = firestore
	const { id, auth, project } = props;
	// Route protection
	if (!auth.uid) return <Redirect to="/" />;
	if (project) {
		return (
			<div className="project-details">
				<div className="row container">
					<DescCard project={project} />
				</div>
				<GenerateSliders project={project} uid={auth.uid} pid={id} />
				<div className="row container">
					<CSVCard pid={id} auth={auth} project={project} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				Error Loading Project
				{/*<Redirect to="/dashboard" />*/}
			</div>
		);
	}
};

/* The props we need for this component are the project ID,
 * auth object, and project object. We get the entire projects
 * collections so that we can get the current one based off [id] */
const mapStateToProps = (state, ownProps) => {
	const id = ownProps.match.params.id;
	const projects = state.firestore.data.projects;
	const project = projects ? projects[id] : null;
	return {
		id,
		project,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
