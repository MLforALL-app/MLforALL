import React, { useState, useEffect } from "react";
import PredictSlider from "./predictslide";
import Dropdown from "./dropdown";
import ResultCard from "./resultCard";
import HelpBox from "../../../layouts/helpbox";
import apiHost from "../../../../config/api.js";
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
		inputs[v.name] = v.q2;
	});
	return inputs;
};

/* REQUIRES: passed in props be a project a valid reference to Firebase
 * 			 firestore document, and uid the userID for current user
 * ENSURES: higher order function to create components for sliders and
 * 			result display */
const GenerateSliders = ({ project, pid }) => {
	// todo: add resInput and resModel
	const [model, setModel] = useState(Object.keys(project.models)[0]);
	const [inputs, setInputs] = useState(initInputs(project.variables));
	const [output, setOutput] = useState("");
	const [loading, setLoad] = useState(false);

	// hsc and hic are higher order functions to allow for generality
	// of event handlers
	const handleSliderChange = (v) => {
		console.log("input v", v);
		return (event, newValue) => {
			console.log("newValue", newValue);
			var newInput = inputs;
			newInput[v.name] = newValue;
			console.log(newInput);
			setInputs(newInput);
			console.log(inputs[v.name]);
		};
	};
	const handleInputChange = (v) => {
		return (event) => {
			var newTarget = event.target.value;
			var newValue = newTarget === "" ? "" : Number(newTarget);
			var newInput = inputs;
			newInput[v.name] = newValue;
			setInputs(newInput);
			console.log(inputs);
		};
	};
	// Event handle for dropdown menu
	const handleDropChange = (event) => {
		setModel(event.target.value);
	};
	// Event handler for when user presses "Generate" button
	const handleSubmit = (event) => {
		event.preventDefault();
		// Update the inputs/models ur showing
		if (model === "") {
			setOutput("chooseModel");
		} else if (Object.keys(inputs).length !== project.variables.length) {
			setOutput("chooseInput");
		} else {
			// create path for API Post Request
			const path = {
				uid: project.authorID,
				projId: pid,
				model: model,
				inputs: Object.values(inputs)
			};
			setLoad(true);
			console.log("THIS IS PATH", path);
			axios
				.post(`${apiHost}/predict`, path)
				.then((res) => {
					// If things work, set the output and stop loading
					setOutput(res);
					setLoad(false);
				})
				.catch((err) => {
					console.log("Prediction Error", err);
					// If things don't work, server error and stop loading
					setOutput("Server Error");
					setLoad(false);
				});
		}
	};
	// Higher order fn to create a PredictSlider for each of our variables
	// using generalized event handlers so we can alter state from here
	const getSlides = (variables, hsc, hic) => {
		if (variables.length > 0) {
			var slides = [];
			variables.forEach((v) => {
				slides.push(PredictSlider(v, hsc(v), hic(v), inputs[v.name]));
			});
			return <div>{slides}</div>;
		} else {
			return <p> NO SLIDERS YET </p>;
		}
	};
	useEffect(() => {
		console.log("model", model);
		console.log("inputs", inputs);
		console.log("output", output);
		setModel(model);
		setInputs(inputs);
		setOutput(output);
		console.log("genslider using effect");
	}, [model, inputs, output]);
	return (
		<div className="predict">
			<div className="row slider-row">
				<div className="container">
					<div className="slider-title">
						<h5>
							Type of model:{" "}
							{Dropdown(project, model, handleDropChange, nameMapper)} has
							accuracy{" "}
							{project &&
								project.models &&
								project.models[model] &&
								project.models[model].accuracy * 100 + "%"}
							<HelpBox placement="right" desc={getDesc(model)} />
						</h5>
					</div>
					<div className="slider-contain">
						{getSlides(
							project.variables,
							handleSliderChange,
							handleInputChange
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
								onClick={handleSubmit}>
								<b>Generate</b>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="row slider-row">
				{ResultCard(
					model,
					inputs,
					output,
					project.targetParam,
					loading,
					nameMapper
				)}{" "}
			</div>
		</div>
	);
};

export default GenerateSliders;
