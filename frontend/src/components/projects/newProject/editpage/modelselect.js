import React, { Component } from "react";
import { connect } from "react-redux";
import ModelCheck from "./modelcheck";
import HelpBox from "../../../layouts/helpbox";
import { nameMapper } from "../../../../store/actions/nameMapper";
import { updateCurrentWorkingProject } from "../../../../store/actions/projectActions";

class ModelSelect extends Component {
	initObj = (objList) => {
		console.log(this.props.selectedModels);
		var objState = {};
		objList.forEach((item) => {
			let models = Object.keys(this.props.selectedModels);
			if (models.includes(item)) {
				objState[item] = true;
			} else {
				objState[item] = false;
			}
		});
		return objState;
	};

	state = {
		models: this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"])
	};
	handleModelToggle = (value) => () => {
		this.setState((prevState) => {
			var newModels = prevState.models;
			newModels[value] = !newModels[value];
			return { models: newModels };
		});
		this.props.updateModels(this.state.models);
	};
	componentDidMount = () => {
		this.props.updateModels(
			this.initObj(["log_reg", "knn", "clf", "gnb", "svm", "lda"])
		);
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
							link="help"
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
