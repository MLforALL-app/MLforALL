import React, { Component } from "react";
import { connect } from "react-redux";
import {
	createProject,
	uploadCSV
} from "../../../store/actions/projectActions";

class CreateProject extends Component {
	state = {
		title: "",
		content: "",
		csvName: ""
	};

	handleChange = (e) => {
		if (e.target.id !== "csvName") {
			this.setState({
				[e.target.id]: e.target.value
			});
		} else {
			//this puts the csv file in the state before we create project
			this.setState({
				[e.target.id]: e.target.files[0]
			});
		}
	};
	handleSubmit = (e) => {
		e.preventDefault();
		console.log(this.state.csvName);
		console.log(this.props);
		this.props.uploadCSV(this.state.csvName, this.state.title);
		this.props.createProject(this.state);
		// can we do something like
		// this.props.history.push("/me") to get to UID?
		this.props.initProject();
		//this.props.history.push("/dashboard");
	};

	render() {
		return (
			<div className="container">
				<form onSubmit={this.handleSubmit} className="white">
					<h4 className="grey-text text-darken-3">Create Project</h4>
					<div className="input-field">
						<label htmlFor="title">Title</label>
						<input
							autoComplete="off"
							type="text"
							id="title"
							onChange={this.handleChange}
						/>
					</div>
					<div className="file-field input-field">
						<div className="btn blue lighten-1 z-depth-0">
							<span>Browse</span>
							<input
								type="file"
								id="csvName"
								onChange={this.handleChange}
							/>
						</div>

						<div className="file-path-wrapper">
							<input
								className="file-path validate"
								type="text"
								placeholder="Upload .csv file"
							/>
						</div>
					</div>
					<div className="input-field">
						<label htmlFor="content">Project Content</label>
						<textarea
							className="materialize-textarea"
							cols="30"
							rows="10"
							id="content"
							onChange={this.handleChange}
						></textarea>
					</div>
					<div className="input-field">
						<button className="btn blue lighten-1 z-depth-0">
							Begin The Process
						</button>
					</div>
				</form>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		createProject: (project) => dispatch(createProject(project)),
		uploadCSV: (csv, projTitle) => dispatch(uploadCSV(csv, projTitle))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
