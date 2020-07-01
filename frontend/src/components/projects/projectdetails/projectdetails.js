import React, { useState } from "react";
import GenerateSliders from "./slide/generateSliders";
import DescCard from "./cards/descCard";
import CSVCard from "./cards/csvCard";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import "../../../styling/projectdetails.css";

/* MAIN COMPONENT
 * Uses the helper components DescCard, Generate Sliders, and CSV Card
 * to create the view project page.
 */
const ProjectDetails = (props) => {
	// id = unique projID, auth = firebase auth object, project = firestore
	console.log("ENTER PROJECT DETAILS");
	const { pid, auth, project, history } = props;
	const [count, setCount] = useState(0);
	const refreshCount = () => {
		console.log("refreshing count");
		setCount((i) => i + 1);
	};
	console.log("count", count);
	// Route protection
	if (!auth.uid) return <Redirect to="/" />;
	if (!auth.emailVerified) return <Redirect to={`/verify`} />;
	console.log(
		"projectRecieved",
		project && project.variables.map((o) => o.name)
	);
	if (project && count === 0) {
		return (
			<div className="project-details">
				<div className="row container">
					<DescCard project={project} pid={pid} />
				</div>
				<GenerateSliders
					refreshCount={refreshCount}
					project={project}
					uid={auth.uid}
					pid={pid}
				/>
				<div className="row container">
					<CSVCard pid={pid} auth={auth} project={project} history={history} />
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<Link to="/dashboard">
					There was an error loading this project... click here to go back
				</Link>
				{/*<Redirect to="/dashboard" />*/}
			</div>
		);
	}
};

/* The props we need for this component are the project ID,
 * auth object, and project object. We get the entire projects
 * collections so that we can get the current one based off [id] */
const mapStateToProps = (state, ownProps) => {
	const pid = ownProps.match.params.pid;
	const projects = state.firestore.data.projects;
	const project = projects ? projects[pid] : null;
	// lets change this to somehow query in firestoreConnect
	return {
		pid,
		project,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
