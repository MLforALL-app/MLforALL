import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Guide from "./guidingInfo";
import {
	createProject,
	uploadCSV
} from "../../../store/actions/projectActions";
import "./build.css";

class CreateProject extends Component {
	state = {
		title: ""
	};

	handleChange = (e) => {
		this.setState({
			[e.target.id]: e.target.value
		});
	};
	handleSubmit = (e) => {
		e.preventDefault();
		//this.props.uploadCSV(this.state.csvName, this.state.title);
		this.props.createProject(this.state);
		// can we do something like
		// this.props.history.push("/me") to get to UID?
		//this.props.initProject();
		//this.props.history.push("/dashboard");
	};

	render() {
		const { auth } = this.props;
		return (
			<div className="create-project">
				{auth.uid ? <span></span> : <Redirect to="/" />}
				{auth.emailVerified ? <p></p> : <Redirect to="/v/create" />}
				<div className="row container">
					<h1 className="purple-text">Create Project</h1>
				</div>
				<div className="row slider-row">
					<div className="container">
						<form
							style={{ backgroundColor: "#eeeeee" }}
							onSubmit={this.handleSubmit}
						>
							<div className="input-field">
								<label htmlFor="title">
									Insert a title here!
								</label>
								<input
									autoComplete="off"
									type="text"
									id="title"
									onChange={this.handleChange}
								/>
							</div>
							<div className="input-field">
								<button className="btn z-depth-0">
									Begin The Process
								</button>
							</div>
						</form>
					</div>
				</div>
				<Guide />
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
