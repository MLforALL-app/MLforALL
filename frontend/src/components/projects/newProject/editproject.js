import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./editpage/displayCSV";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadCSV from "./uploadcsv";
import {
	setWorkingProject,
	initCSV,
	buildModels,
	updateContent,
	resetBuild,
	clearStore,
	setUpPreloadedCsv,
	updateCurrentWorkingProject,
	deleteMLProject
} from "../../../store/actions/projectActions";
import { nameMapper, addSpace } from "../../../store/actions/nameMapper";
import NanHandler from "./editpage/nanhandler";
import ModelSelect from "./editpage/modelselect";
import ModelOutput from "./editpage/modeloutput";
import ProjectStatus from "./editpage/projectstatus";
import BuildProject from "./editpage/comfirmbuild";
import projectSource from "../../../config/collection";

const filterObj = (objState) => {
	return Object.entries(objState)
		.filter(([key, val]) => val)
		.map(([key, val]) => key);
};

class EditProject extends Component {
	state = {
		projectState: 0,
		waitForCSVUpload: false,
		submitLoad: false
	};

	determineProjectState = () => {
		if (!this.props.project) {
			return 0;
		} else if (this.props.project.csvPath === "") {
			return 1;
		} else if (
			this.props.project.csvPath !== "" &&
			this.props.project.models === []
		) {
			return 2;
		} else {
			return 3;
		}
	};

	componentDidUpdate = (prevProps) => {
		let project_process = this.determineProjectState();
		//handling project process change
		if (this.state.projectState !== project_process) {
			//handle setting up project
			if (this.state.projectState === 0) {
				if (project_process < 2) {
					this.setState({
						waitForCSVUpload: true
					});
				}
			}
			//setting up model selection page
			if (project_process >= 2) {
				this.props.setWorkingProject(this.props.project, this.props.projectID);
				//if csv is not in store (not just uploaded) get it
				if (this.state.projectState === 0) {
					//if we are loading a project that already has an uploaded csv
					this.props.initCSV(this.props.project, this.props.projectID);
				} else {
					//if we are loading a project with a newly uploaded csv
					this.props.setUpPreloadedCsv();
				}
				this.props.setWorkingProject(this.props.project, this.props.projectID);
				this.props.initCSV(this.props.project, this.props.projectID);
			}
			this.setState({ projectState: project_process });
		}
		if (this.state.waitForCSVUpload && this.props.csvLoaded) {
			this.setState({ waitForCSVUpload: false });
		}
		if (
			prevProps &&
			prevProps.currentWorkingProject !== this.props.currentWorkingProject
		) {
			this.props.updateCheck();
		}
	};
	componentWillUnmount = () => {
		this.props.resetBuild();
		this.props.clearStore();
	};
	getContent = (content) => {
		if (content === "") {
			return (
				"These models attempt to predict " +
				this.props.currentWorkingProject.targetParameter +
				" and how it relates to " +
				addSpace(filterObj(this.props.currentWorkingProject.inputs)) +
				" using the following models: " +
				addSpace(
					filterObj(this.props.currentWorkingProject.modelList).map((s) =>
						nameMapper(s)
					)
				)
			);
		} else {
			return content;
		}
	};

	handleSubmit = (e) => {
		const { project, auth, projectID } = this.props;
		this.setState({
			submitLoad: true
		});
		// this.props.deleteMLProject(projectID, auth.uid, project, true);
		this.props.updateContent(
			this.getContent(this.props.project.content),
			this.props.projectID
		);
		this.props.buildModels(project);
	};

	render() {
		const { project, auth, projectID, modelBuilt, dataBuilt } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
		if (!project)
			return (
				<div className="container center">
					<CircularProgress />
				</div>
			);
		if (auth.uid !== project.authorID) {
			return <Redirect to={`/project/${projectID}`} />;
		}
		if (modelBuilt && dataBuilt) {
			return <Redirect to={`/project/${projectID}`} />;
		}
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
							{this.props.csvData &&
							this.props.currentWorkingProject !== "initialized" ? (
								<div>
									<DisplayCSV
										project={project}
										id={projectID}
										selectedVariables={this.props.project.variables}
									/>
									<NanHandler
										count={this.props.project.info.NaN}
										project={this.props.project}
									/>
									<ModelOutput
										project={project}
										id={projectID}
										selectedOutput={this.props.project.targetParam}
									/>
									<ModelSelect
										project={project}
										id={projectID}
										selectedModels={this.props.project.models}
									/>
									<ProjectStatus />
								</div>
							) : (
								<div className="container center">
									<CircularProgress />
								</div>
							)}
							<div className="row container center">
								<BuildProject
									getContent={this.getContent}
									handleSubmit={this.handleSubmit}
									submitLoad={this.state.submitLoad}
								/>
							</div>
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
	const pid = props.match.params.pid;
	return {
		projectID: pid,
		project:
			state.firestore.data[projectSource] &&
			state.firestore.data[projectSource][pid],
		auth: state.firebase.auth,
		csvLoaded: state.project.csvLoaded,
		currentWorkingProject: state.project.currentWorkingProject,
		csvData: state.project.csvData,
		modelBuilt: state.project.modelBuilt,
		dataBuilt: state.project.dataBuilt,
		projectComplete: state.project.cWPFull,
		csvHolding: state.project.csvHolding
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		setWorkingProject: (project, id) =>
			dispatch(setWorkingProject(project, id)),
		initCSV: (project, id) => dispatch(initCSV(project, id)),
		buildModels: (pid) => dispatch(buildModels(pid)),
		updateContent: (content, pid) => dispatch(updateContent(content, pid)),
		resetBuild: () => dispatch(resetBuild()),
		clearStore: () => dispatch(clearStore()),
		setUpPreloadedCsv: () => dispatch(setUpPreloadedCsv()),
		deleteMLProject: (pid, uid, project, update) =>
			dispatch(deleteMLProject(pid, uid, project, update)),
		updateCheck: () =>
			dispatch(updateCurrentWorkingProject("update_check", null))
	};
};
export default compose(
	connect(mapStateToProps, mapDispatchToProps),
	firestoreConnect((props) => {
		if (!props.auth) return [];
		return [{ collection: projectSource, doc: props.match.params.id }];
	})
)(EditProject);
