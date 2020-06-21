import React, { Component } from "react";
import { connect } from "react-redux";
import ModelCheck from "./modelcheck";
import HelpBox from "../../../layouts/helpbox";
import { nameMapper } from "./editCSV";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";

class ModelSelect extends Component {
	initObj = (objList) => {
		var objState = {};
		objList.forEach((item) => {
			objState[item] = false;
		});
		return objState;
	};

	state = {
		models: this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"])
	};
	handleModelToggle = (value) => () => {
		//console.log("VALUE IN HANDLE TOGGLE", value);
		this.setState((prevState) => {
			var newModels = prevState.models;
			newModels[value] = !newModels[value];
			return { models: newModels };
		});
		console.log(this.state.models);
		console.log(this.props.cp);
		this.props.updateModels(this.state.models);
	};

	render() {
		return (
			<div className="row container">
				<h5>
					<b>3. Choose your algorithms / models</b>{" "}
					<span className="pink-text">
						<HelpBox
							header="Click the models!"
							placement="right-end"
							desc="There's many ways to set up machine learning models. That mean's there also many algorithms used to achieve this predictive power. Click on the link to learn more!"
							link="https://www.youtube.com/watch?v=hSlb1ezRqfA"
							linkdesc="Learn more here"
						/>
					</span>
				</h5>
				<div>
					<ModelCheck
						handleToggle={this.handleModelToggle}
						nameMapper={nameMapper}
						models={this.state.models}
					/>
				</div>
			</div>
		);
	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		updateModels: (modelList) =>
			dispatch(updateCurrentWorkingProject("modelList", modelList))
	};
};

export default connect(null, mapDispatchToProps)(ModelSelect);
