import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./editpage/editCSV";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadCSV from "./uploadcsv";
import { setWorkingProject } from "../../../store/actions/projectActions";
import NanHandler from "./editpage/nanhandler";
import ModelSelect from "./editpage/modelselect";
class EditProject extends Component {
	state = {
		projectState: "init",
		waitForCSVUpload: false
	};
	determineProjectState = () => {
		if (!this.props.project) {
			return 0;
		} else if (this.props.project.csvName === "") {
			return 1;
		} else if (
			!this.props.project.csvName === "" &&
			this.props.project.models === []
		) {
			return 2;
		} else {
			return 3;
		}
	};
	componentDidMount = () => {
		//figure out if the csv already has been uploaded or will be uploaded
		let project_process = this.determineProjectState();
		if (project_process < 2) {
			this.setState({
				waitForCSVUpload: false
			});
		}
	};
	componentDidUpdate = () => {
		let project_process = this.determineProjectState();
		console.log(project_process);
		if (this.state.projectState !== project_process) {
			if (this.state.projectState === 0) {
				if (project_process < 2) {
					console.log("DOING THIS THING");
					this.setState({
						waitForCSVUpload: true
					});
				}
				if (project_process >= 2){
					this.props.setWorkingProject(this.props.project, this.props.projectID);
				}
			}
			this.setState({
				projectState: project_process
			});
		}
		if (this.state.waitForCSVUpload && this.props.csvLoaded) {
			console.log("SETTING TO FALSE");
			this.setState({
				waitForCSVUpload: false
			});
		}
	};

	render() {
		const { project, auth, projectID } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
		if (!project)
			return (
				<div className="container center">
					<CircularProgress />
				</div>
			);
		if (auth.uid !== project.authorID)
			return <Redirect to={`/project/${projectID}`} />;
		return (
			<div className="build-project">
				<div className="row container">
					<h1>
						<span className="purple-text">{project.title}</span>
					</h1>
				</div>
				{this.state.projectState === 1 ? (
					<UploadCSV project={project} projectID={projectID} />
				) : (
					<span></span>
				)}
				{this.state.projectState >= 2 ? (
					!this.state.waitForCSVUpload ? (
						<div>
							{this.props.project.info.NaN === 0 ? (
							<div className="row container"></div>
							) : (
							<NanHandler project = {this.props.project}/>
							)}
							<DisplayCSV project={project} id={projectID} />
							<ModelSelect project={project} id = {projectID} cp = {this.props.currentWorkingProject}/>
						</div>
						
					) : (
						<span></span>
					)
				) : (
					<span></span>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, props) => {
	//console.log(state);
	//console.log(state.firestore.data);
	const pid = props.match.params.pid;
	return {
		projectID: pid,
		project:
			state.firestore.data.projects && state.firestore.data.projects[pid],
		auth: state.firebase.auth,
		csvLoaded: state.project.csvLoaded,
		currentWorkingProject: state.project.currentWorkingProject
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWorkingProject: (project, id) => dispatch(setWorkingProject(project, id))
	};
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => {
		if (!props.auth) return [];
		return [{ collection: "projects", doc: props.match.params.id }];
	})
)(EditProject);
 