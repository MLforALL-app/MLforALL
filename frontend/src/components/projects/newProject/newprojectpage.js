import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateProject from "./createproject";
import BuildProject from "./buildproject";
import CircularProgress from "@material-ui/core/CircularProgress";

class CreateProjectContainer extends Component {
	state = {
		project_id: ""
	};
	
	goToProjectEdit = () => {
		this.props.history.push("/edit/" +  this.props.projID);
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;

		if (this.props.projID === "init" || this.props.proj === "init") {
			return <CreateProject />;
		}

		return (
			<div>
				<div className="input-field">
							<button className="btn z-depth-0" onClick={this.goToProjectEdit()}>
								Go to Your Project!
							</button>
				</div>
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
