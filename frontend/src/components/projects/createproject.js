import React, { Component } from "react";
import { connect } from "react-redux";
import { createProject } from "../../store/actions/projectActions";
import { Redirect } from "react-router-dom";

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
		this.props.createProject(this.state);
		this.props.history.push("/dashboard");
	};

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/" />;
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
					<div class="file-field input-field">
						<div class="btn blue lighten-1 z-depth-0">
							<span>Browse</span>
							<input
								type="file"
								id="csvName"
								onChange={this.handleChange}
							/>
						</div>

						<div class="file-path-wrapper">
							<input
								class="file-path validate"
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
							Create
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
		createProject: (project) => dispatch(createProject(project))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
