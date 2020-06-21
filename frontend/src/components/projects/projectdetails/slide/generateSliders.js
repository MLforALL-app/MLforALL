import React, { Component } from "react";
import PredictSlider from "./predictslide";
import Dropdown from "./dropdown";
import ResultCard from "./resultCard";
import HelpBox from "../../../layouts/helpbox";
import axios from "axios";

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
		// console.log("Current Var", v);
		inputs[v.name] = v.q2;
		// console.log(inputs[v.name]);
	});
	// console.log("INITIAL INPUTS", inputs);
	return inputs;
};

/* REQUIRES: passed in props be a project a valid reference to Firebase
 * 			 firestore document, and uid the userID for current user
 * ENSURES: higher order function to create components for sliders and
 * 			result display */
class GenerateSliders extends Component {
	// Set initial model to be the first one
	state = {
		model:
			this.props.project.models.length < 1
				? ""
				: this.props.project.models[0],
		inputs: initInputs(this.props.project.variables),
		output: "",
		loading: false,
		resInputs: {},
		resModel: ""
	};

	// event handler for when model dropdown menu changes
	handleDropChange = (event) => {
		this.setState({ model: event.target.value });
	};
	// hsc and hic are higher order functions to allow for generality
	// of event handlers
	handleSliderChange = (v) => {
		// console.log("YOUR INPUTS", inputs);
		return (event, newValue) => {
			this.setState((prevState) => {
				var alterState = prevState;
				alterState.inputs[v.name] = newValue;
				return alterState;
			});
		};
	};
	handleInputChange = (v) => {
		//console.log("YOUR INPUTS", inputs);
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
		if (this.state.model !== "") {
			// create path for API Post Request
			const path = {
				uid: this.props.project.authorID,
				projId: this.props.pid,
				model: this.state.model,
				inputs: Object.values(this.state.inputs)
			};
			console.log("THIS IS PATH", path);
			this.setState({ loading: true });
			// console.log("BEFORE AXIOS, LOADING", loading);
			axios
				.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/predict`, path)
				.then((res) => {
					//console.log("THIS IS RESULT", res);
					// If things work, set the output and stop loading
					this.setState({ output: res, loading: false });
				})
				.catch((err) => {
					//console.log("THIS IS AN ERROR", err);
					// If things don't work, server error and stop loading
					this.setState({ output: "Server Error", loading: false });
				});
		} else {
			// user has not picked a model yet
			this.setState({ output: "Choose a model" });
		}
		// console.log("EXIT AXIOS LOADING STATE,", loading);
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
	render() {
		return (
			<div className="predict">
				<div className="row slider-row">
					<div className="container">
						<div className="col s12">
							<div className="slider-title">
								<h5>
									Type of model:{" "}
									{Dropdown(
										this.props.project,
										this.state.model,
										this.handleDropChange,
										nameMapper
									)}{" "}
									<HelpBox
										placement="right"
										desc={getDesc(this.state.model)}
									/>
								</h5>
							</div>
							<div className="slider-contain">
								{this.getslides(
									this.props.project.variables,
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
				</div>
				<div className="row slider-row">
					{ResultCard(
						this.state.resModel,
						this.state.resInputs,
						this.state.output,
						this.props.project.targetParam,
						this.state.loading,
						nameMapper
					)}{" "}
				</div>
			</div>
		);
	}
}

export default GenerateSliders;
