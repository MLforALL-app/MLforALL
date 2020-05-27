import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./displayCSV";

class BuildProject extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title">
								Creating a machine learning model
							</span>
							<p>
								Now that we have initialized your project and
								data, we can begin some exploratory data
								analysis. Our step by step exploratory data
								analysis process (still in development) will
								allow you to make educated decisions when
								choosing and creating machine learning models.
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="card z-depth-0">
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
				{console.log("PROPS", this.props)}
				{this.props.csvLoaded ? (
					<DisplayCSV csv={this.props.proj.csvName} />
				) : (
					<span></span>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth,
		projID: state.project.curUserProjID,
		proj: state.project.curUserProj,
		csvLoaded: state.project.csvLoaded
	};
};

export default connect(mapStateToProps)(BuildProject);
