import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateProject from "./createproject";
import BuildProject from "./buildproject";
import DisplayCSV from "./displayCSV";
import CircularProgress from "@material-ui/core/CircularProgress";

class CreateProjectContainer extends Component {
	state = {
		project_initialized: false,
		project_id: ""
	};

	initProject = () => {
		this.setState({
			project_initialized: true
		});
		console.log("project initialized");
	};

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;

		if (this.state.project_initialized === false) {
			return <CreateProject initProject={this.initProject} />;
		}
		if (this.props.projID === "init" || this.props.proj === "init")
			return (
				<div className="container center">
					<CircularProgress />
				</div>
			);

		return (
			<div>
				<BuildProject />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		projID: state.project.curUserProjID,
		curUserProj: state.project.curUserProj
	};
};

export default connect(mapStateToProps)(CreateProjectContainer);
