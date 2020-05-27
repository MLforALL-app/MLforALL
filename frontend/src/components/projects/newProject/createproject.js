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
				<div className="row">
					<form onSubmit={this.handleSubmit} className="white">
						<h4 className="grey-text text-darken-3">
							Create Project
						</h4>
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
									accept=".csv"
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
				<div className="row">
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title">
								Choosing a Dataset
							</span>
							To create a project, you'll need a .csv file to be
							your dataset. As of now, ML for All only works to
							create classification models, creating models based
							off of NUMERICAL inputs and to some TEXT / NUMBER
							output. For example, ML for All can take datasets of
							height and weight of athletes to predict bench press
							(NUMBER output) or the sport they play (TEXT
							output), but cannot take the sport they play (TEXT
							input) to predict anything.
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
