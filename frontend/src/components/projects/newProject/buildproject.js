import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./displayCSV";

class BuildProject extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="s12">
						<h4 className="grey-text text-darken-3">
							Creating a machine learning model
						</h4>
					</div>
				</div>
				<div className="row">
					<div className="col s7">
						<p>
							Now that we have initialized your project and data,
							we can begin some exploratory data analysis. Our
							step by step exploratory data analysis process
							(still in development) will allow you to make
							educated decisions when choosing and creating
							machine learning models.
						</p>
					</div>
					<div className="col s5"> Checklist here </div>
				</div>
				{console.log(this.props)}
				<DisplayCSV csv={this.props.proj.csvName} />
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	console.log(state);
	return {
		auth: state.firebase.auth,
		projID: state.project.curUserProjID,
		proj: state.project.curUserProj
	};
};

export default connect(mapStateToProps)(BuildProject);
