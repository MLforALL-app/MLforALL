import React from "react";
import GenerateSliders from "./slide/generateSliders";
import DescCard from "./cards/descCard";
import CSVCard from "./cards/csvCard";
import "./pjdetails.css";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
// import { Redirect } from "react-router-dom";

const ProjectDetails = (props) => {
	const { id, auth, project } = props;
	if (!auth.uid) return <Redirect to="/signup" />;
	if (project) {
		return (
			<div className="container section project-details">
				<div className="row">
					<div className="col s12">{DescCard(project)}</div>
				</div>
				{GenerateSliders(project, auth.uid)}
				<div className="row">
					<div className="col s12">
						<CSVCard id={id} auth={auth} project={project} />
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				Error Loading Project. Redirecting to dashboard.{" "}
				{/*<Redirect to="/dashboard" />*/}
			</div>
		);
	}
};

const mapStateToProps = (state, ownProps) => {
	// console.log(state);
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
