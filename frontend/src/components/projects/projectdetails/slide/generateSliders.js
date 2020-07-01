import React, { Component } from "react";
import PredictSlider from "./predictslide";
import Dropdown from "./dropdown";
import ResultCard from "./resultCard";
import HelpBox from "../../../layouts/helpbox";
import apiHost from "../../../../config/api.js";
import axios from "axios";

const updateState = (project) => {
	return {
		model: Object.keys(project.models)[0],
		inputs: initInputs(project.variables),
		output: "",
		loading: false,
		resInputs: {},
		resModel: ""
	};
};

// Helper function so model names get printed nicer
const nameMapper = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Logistic Regression";
		case "gnb":
			return "Gaussian Naive Bayes";
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

// Helper function for brief descriptions about each model
const getDesc = (name) => {
	switch (name) {
		case "":
			return "Nothing Selected Yet";
		case "log_reg":
			return "Classifies based on class probabilities modeled by logistic function";
		case "gnb":
			return "Classifies under assumptions of Gaussian data and independence";
		case "knn":
			return "Classifies based on distance to closest k training examples";
		case "svm":
			return "Classifies by creating maximum margin decision boundaries";
		case "clf":
			return "Classifies using consecutive true/false decision rules";
		case "lda":
			return "Classifies using Bayes' theorem assuming each class is normally distributed with equal covariance";
		default:
			return "Error: Not valid model name";
	}
};

// Initialize our state with average values for datasets
const initInputs = (variables) => {
	var inputs = {};
	variables.forEach((v) => {
		inputs[v.name] = v.q2;
	});
	return inputs;
};

/* REQUIRES: passed in props be a project a valid reference to Firebase
 * 			 firestore document, and uid the userID for current user
 * ENSURES: higher order function to create components for sliders and
 * 			result display */
class GenerateSliders extends Component {
	// Set initial model to be the first one
	state = updateState(this.props.project);
	// event handler for when model dropdown menu changes
	handleDropChange = (event) => {
		this.setState({ model: event.target.value });
	};
	// hsc and hic are higher order functions to allow for generality
	// of event handlers
	handleSliderChange = (v) => {
		return (event, newValue) => {
			this.setState((prevState) => {
				var alterState = prevState;
				alterState.inputs[v.name] = newValue;
				return alterState;
			});
		};
	};
	handleInputChange = (v) => {
		return (event) => {
			const newValue =
				event.target.value === "" ? "" : Number(event.target.value);
			this.setState((prevState) => {
				var alterState = prevState;
				alterState.inputs[v.name] = newValue;
				return alterState;
			});
		};
	};
	// Event handler for when user presses "Generate" button
	handleSubmit = (event) => {
		event.preventDefault();
		// Update the inputs/models ur showing
		this.setState((prevState) => {
			return {
				resInputs: prevState.inputs,
				resModel: prevState.model
			};
		});
		if (this.state.model === "") {
			this.setState({ output: "chooseModel" });
		} else if (
			Object.keys(this.state.inputs).length !==
			this.props.project.variables.length
		) {
			this.setState({ output: "chooseInput" });
		} else {
			// create path for API Post Request
			const path = {
				uid: this.props.project.authorID,
				projId: this.props.pid,
				model: this.state.model,
				inputs: Object.values(this.state.inputs)
			};
			this.setState({ loading: true });
			console.log("THIS IS PATH", path);
			axios
				.post(`${apiHost}/predict`, path)
				.then((res) => {
					// If things work, set the output and stop loading
					this.setState({ output: res, loading: false });
				})
				.catch((err) => {
					console.log("Prediction Error", err);
					// If things don't work, server error and stop loading
					this.setState({ output: "Server Error", loading: false });
				});
		}
	};
	// Higher order fn to create a PredictSlider for each of our variables
	// using generalized event handlers so we can alter state from here
	getslides(variables, hsc, hic) {
		if (variables.length > 0) {
			var output = [];
			variables.forEach((v) => {
				output.push(
					PredictSlider(v, hsc(v), hic(v), this.state.inputs[v.name])
				);
			});
			return <div>{output}</div>;
		} else {
			return <p> NO SLIDERS YET </p>;
		}
	}
	componentDidUpdate(prev) {
		if (prev && prev !== this.props) {
			updateState(this.props.project);
			console.log("updated state due to different props");
		}
	}
	render() {
		const { project } = this.props;
		const { model, resModel, resInputs, loading, output } = this.state;
		console.log("RENDER STATE", this.state);
		return (
			<div className="predict">
				<div className="row slider-row">
					<div className="container">
						<div className="slider-title">
							<h5>
								Type of model:{" "}
								{Dropdown(project, model, this.handleDropChange, nameMapper)}{" "}
								has accuracy{" "}
								{project &&
									project.models &&
									project.models[model] &&
									project.models[model].accuracy * 100 + "%"}
								<HelpBox placement="right" desc={getDesc(model)} />
							</h5>
						</div>
						<div className="slider-contain">
							{this.getslides(
								project.variables,
								this.handleSliderChange,
								this.handleInputChange
							)}
							<div
								className="row"
								style={{
									paddingTop: "2rem",
									textAlign: "right"
								}}>
								<HelpBox
									placement="left"
									desc="Click here to generate a prediction based off of the slider values you've chosen above!"
								/>{" "}
								<button
									className="btn waves-effect waves-light anchor"
									onClick={this.handleSubmit}>
									<b>Generate</b>
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="row slider-row">
					{ResultCard(
						resModel,
						resInputs,
						output,
						project.targetParam,
						loading,
						nameMapper
					)}{" "}
				</div>
			</div>
		);
	}
}

export default GenerateSliders;
