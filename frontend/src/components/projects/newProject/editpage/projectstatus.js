import React, { Component } from "react";
import { connect } from "react-redux";

const nameMapper = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Logistic Regression";
		case "gnb":
			return "Gauss Naive Bayes";
		case "knn":
			return "K-Nearest Neighbors";
		case "svm":
			return "Support Vector Machine";
		case "clf":
			return "Decision Tree Classifier";
		case "lda":
			return "Linear Discriminant Analysis";
		default:
			return "Error: Not valid model name";
	}
};

const addSpace = (list) => {
	return list.map((s) => " " + s);
};

class ProjectStatus extends Component {
	state = {
		error: false
	};

	filterObj = (objState) => {
		return Object.entries(objState)
			.filter(([key, val]) => val)
			.map(([key, val]) => key);
	};

	getStatus = (inputs, output, models, nameMapper) => {
		return (
			<div className="container center">
				<div className="card">
					<div className="card-content">
						<span className="purple-text">
							<h5>
								<b>
									{this.state.error
										? "Something went Wrong"
										: "What Your Model Does"}{" "}
								</b>
							</h5>
						</span>
						<h6>
							This model will take these parameters:
							<span className="purple-text">
								{addSpace(inputs)}
							</span>
							<br /> to attempt to predict{" "}
							<span className="purple-text">{output}</span> <br />{" "}
							using these algorithms:
							<span className="purple-text">
								{addSpace(models.map((s) => nameMapper(s)))}
							</span>
						</h6>
					</div>
				</div>
			</div>
		);
	};

	render() {
		if (this.props.CWP === undefined || this.props.CWP === {}) {
			return <span>waiting</span>;
		}
		return (
			<div className="row" style={{ padding: "2rem" }}>
				{this.getStatus(
					this.filterObj(this.props.CWP.inputs),
					this.props.CWP.targetParameter,
					this.filterObj(this.props.CWP.modelList),
					nameMapper
				)}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		CWP: state.project.currentWorkingProject
	};
};

export default connect(mapStateToProps)(ProjectStatus);
