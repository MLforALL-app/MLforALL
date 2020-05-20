import React from "react";
// import React, { Component } from "react";
import SimpleSelect from "./dropdown";
import GenerateSliders from "./generateSliders";
import DescCard from "./descCard";
import CSVCard from "./csvCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import ResultCard from "./resultCard";

/*
const onDragDrop = () => {
	// will need this function to update props at this level
	// change project details to class intake props
};
*/

// TODO Try to convert this to project with states

const ProjectDetails = (props) => {
	const { auth, project } = props;
	//const [inputs, setInputs] = React.useState("");
	//console.log("PROPS", props);
	//console.log("PROJECT", project);
	const model = "pizza";
	const result = "pizza";
	if (!auth.uid) return <Redirect to="/signin" />;
	if (project) {
		return (
			<div className="container section project-details">
				<div className="row">
					<div className="col s6">{DescCard(project)}</div>
					<div className="col s6">{CSVCard(project)}</div>
				</div>
				<div className="row">
					<div className="col s12">{GenerateSliders(project)}</div>
				</div>
				<div className="row">
					{" "}
					<div className="col s12">
						{ResultCard({ model: model, output: result })}
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<p> Error Loading Project </p>
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
		project: project,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{
			collection: "projects"
		}
	])
)(ProjectDetails);
