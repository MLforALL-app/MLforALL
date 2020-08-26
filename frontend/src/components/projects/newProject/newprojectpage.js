import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import CreateLanding from "./createlanding";

class CreateProjectContainer extends Component {
	goToProjectEdit = () => {
		this.props.history.push("/edit/" + this.props.projID);
	};

	componentDidUpdate(prevProps) {
		if (this.props.projID !== prevProps.projID) {
			this.goToProjectEdit();
		}
	}

	render() {
		const { auth } = this.props;
		if (!auth.uid) return <Redirect to="/signin" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		return <CreateLanding/>;
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth,
		projID: state.project.curUserProjID
	};
};

export default connect(mapStateToProps)(CreateProjectContainer);
