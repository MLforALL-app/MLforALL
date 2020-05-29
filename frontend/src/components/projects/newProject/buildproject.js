import React, { Component } from "react";
import { connect } from "react-redux";
import DisplayCSV from "./displayCSV";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { useSelector } from 'react-redux';

class BuildProject extends Component {
	render() {
		return (
			<div className="container">
				<div className="row">
					<div className="card z-depth-1">
						<div className="card-content">
							<span className="card-title">
							{this.props.project ? 
								this.props.project.title
							:
							""}
							</span>
							<p>
								
							</p>
						</div>
					</div>
				</div>
				<div className="row">
					<div className="card z-depth-1">
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
					<div className="card z-depth-1">
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

				{this.props.csvLoaded ? (
					<DisplayCSV csv={this.props.proj.csvName} />
				) : (
					<span></span>
				)}
			</div>
		);
	}
}

const mapStateToProps = (state,  props) => {
	console.log(state);
	console.log(state.firestore.data);
	let pid = props.match.params.id;
	console.log();
	return {
		projectID : pid,
		project: state.firestore.data.projects && state.firestore.data.projects[pid],
		auth: state.firebase.auth,
		csvLoaded: state.project.csvLoaded
	};
};



export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => {
		if (!props.auth) return [];
		return [
			{ collection: 'projects', doc: props.match.params.id}
		];
	})
	)(BuildProject);