import React from "react";
import GenerateSliders from "./slide/generateSliders";
import DescCard from "./cards/descCard";
import CSVCard from "./cards/csvCard";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
// import DeleteProject from "./confirmDel";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
// import { Redirect } from "react-router-dom";

const ProjectDetails = (props) => {
	const { auth, project } = props;
	// if (!auth.uid) return <Redirect to="/signin" />;
	if (project) {
		return (
			<div className="container section project-details">
				<div className="row">
					<div className="col s6">{DescCard(project)}</div>
					<div className="col s6">{CSVCard(project)}</div>
				</div>
				{GenerateSliders(project, auth.uid)}
				<div className="row">
					<div className="col s12">
						<div className="container center">
							{auth.uid !== project.authorID ? (
								<div></div>
							) : (
								<Button
									variant="contained"
									color="secondary"
									startIcon={<DeleteIcon />}
								>
									Broken delte button don't use this lol
								</Button>
							)}
						</div>
					</div>
				</div>
			</div>
		);
	} else {
		return (
			<div className="container center">
				<CircularProgress />
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
	firestoreConnect([{ collection: "projects" }])
)(ProjectDetails);
