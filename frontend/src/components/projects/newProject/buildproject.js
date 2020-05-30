import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./displayCSV";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import UploadCSV from "./uploadcsv"
class BuildProject extends Component {
	state = {
		projectState : "init",
		waitForCSVUpload : false
	}
	determineProjectState = () => {
		if(!this.props.project){
			return 0;
			
		}
		else if(this.props.project.csvName === ""){
			return 1;

		}else if(!this.props.project.csvName === "" && 
				  this.props.project.models === []){
			return 2;

		}else{
			return 3;
		}
		
	}
	componentDidMount = () => {
		//figure out if the csv already has been uploaded or will be uploaded
		let project_process = this.determineProjectState();
		if(project_process < 2){
			this.setState({
				waitForCSVUpload : false
			});
		}
	}
	componentDidUpdate = () => {
		console.log(this.props.project);
		console.log(this.props.csvLoaded);
		console.log(this.state);
		let project_process = this.determineProjectState();
		console.log(project_process);
		if(this.state.projectState !== project_process){
			if(this.state.projectState === 0){
				if(project_process < 2){
					console.log("DOING THIS THING");
					this.setState({
						waitForCSVUpload : true
					});
				}
			}
			this.setState({
				projectState : project_process
			});
		}
		if (this.state.waitForCSVUpload && this.props.csvLoaded){
			console.log("SETTING TO FALSE");
			this.setState({
				waitForCSVUpload : false, 
			});

		}
	}


	render() {	
		const {project, auth, projectID} = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;
		if (!project) return <CircularProgress/>
		if (auth.uid !== project.authorID) return <Redirect to={"/me/" + auth.uid}/> 
		return (
			<div className="container">
				<div className="row">
					<div className="card z-depth-1">
						<div className="card-content">
							<span className="card-title purple-text">

							Project: {project.title}

							</span>
							<p>
								
							</p>
						</div>
					</div>
				</div>
				
				{this.state.projectState === 1 ? 
					(
					<div>
						<div className="row">
							<div className="card z-depth-1">
								<div className="card-content">
									<span className="card-title">Instructions</span>
									<p>
										To Start your project. You have to upload 
										some data to perform you analysis on. Currently,
										we only accept .csv data. Bellow are some websites
										with free datasets for you to explore. If you are just learning, 
										you can select one of our beginner datasets from the list below.
									</p>
								</div>
							</div>
						</div>
						<UploadCSV project = {project} projectID = {projectID}/>
					</div>

					)
					:
					(<span></span>)
				}
				{this.state.projectState >= 2 ? (
					<div className = "container"> 
						<div className="row">
							<div className="card z-depth-1">
								<div className="card-content">
									<span className="card-title">Instructions</span>
									<p>
										TO CHOOSE INPUT PARAMETERS, click on the headers
										on the table below. TO CHOOSE OUTPUT PARAMETER,
										use the dropdown on the right. TO CHOOSE ML
										MODELS, use the checklist to the left.
									</p>
								</div>
							</div>
						</div>
						{
							(!this.state.waitForCSVUpload) ? 
							<DisplayCSV project={project} id ={projectID}/>
							:
							<span></span>
						}
						
					</div>
					
				) : (
					<span></span>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state,  props) => {
	console.log(state);
	console.log(state.firestore.data);
	let pid = props.match.params.id;
	console.log();
	return {
		projectID : pid,
		project: state.firestore.data.projects && state.firestore.data.projects[pid],
		auth: state.firebase.auth,
		csvLoaded : state.project.csvLoaded 
	};
};



export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => {
		if (!props.auth) return [];
		return [
			{ collection: 'projects', doc: props.match.params.id}
		];
	})
	)(BuildProject);