import React, { Component } from "react";
import { connect } from "react-redux";
import {
	createProject,
	uploadCSV
} from "../../../store/actions/projectActions";

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
		return (
			<div className="container">
				<div className="row">
					<form
						onSubmit={this.handleSubmit}
						className="white z-depth-1"
					>
						<h4 className="purple-text">Create Project</h4>
						<div className="input-field">
							<label htmlFor="title">Title</label>
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
				<div className="row">
					<div className="card z-depth-1">
						<div className="card-content">
							<span className="card-title">
								Choosing a Dataset
							</span>
							To get your project started, type in a project name 
							and click initialize project. If this is your first 
							project, don't worry! There will be plenty of 
							explanation and recourses provided as you get 
							started. 
							<br />
							<span className="card-title"> Finding CSV's</span>
							<ul>
								<li>
									<a href="https://www.kaggle.com/datasets">
										Check out Kaggle,
									</a>
								</li>
								<li>
									<a href="https://data.world/">
										data.world (needs login),
									</a>
								</li>
								<li>
									<a href="https://registry.opendata.aws/">
										Amazon's open registry,
									</a>
								</li>
								<li>
									<a href="https://datasetsearch.research.google.com/">
										{" "}
										or Google's dataset search engine!
									</a>
								</li>
							</ul>
						</div>
					</div>
				</div>
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
