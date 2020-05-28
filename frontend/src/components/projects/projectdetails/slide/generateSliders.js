import PredictSlider from "./predictslide";
import Dropdown from "./dropdown";
import ResultCard from "./resultCard";
import React from "react";

// Helper function so model names get printed nicer
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

/* REQUIRES: project a valid reference to Firebase firestore document,
 *			 uid the userID for current user
 * ENSURES: higher order function to create components for sliders and
 * 			result display */

const GenerateSliders = ({ project, uid }) => {
	// Set initial model to be the first one
	const startVal = project.models.length < 1 ? "" : project.models[0];
	// console.log("START VAL", startVal);
	const [model, setModel] = React.useState(startVal);

	// event handler for when model dropdown menu changes
	const handleDropChange = (event) => {
		setModel(event.target.value);
	};

	// initialize the inputs
	const [inputs, setInputs] = React.useState(initInputs(project.variables));

	// hsc and hic are higher order functions to allow for generality
	// of event handlers
	const handleSliderChange = (v) => {
		// console.log("YOUR INPUTS", inputs);
		return (event, newValue) => {
			setInputs({ ...inputs, [v.name]: newValue });
		};
	};
	const handleInputChange = (v) => {
		//console.log("YOUR INPUTS", inputs);
		return (event) => {
			setInputs({
				...inputs,
				[v.name]:
					event.target.value === "" ? "" : Number(event.target.value)
			});
		};
	};

	// Higher order fn to create a PredictSlider for each of our variables
	// using generalized event handlers so we can alter state from here
	function getslides(variables, hsc, hic) {
		if (variables.length > 0) {
			var output = [];
			variables.forEach((v) => {
				// console.log("THIS IS V", v);
				output.push(PredictSlider(v, hsc(v), hic(v), inputs[v.name]));
			});
			return <div>{output}</div>;
		} else {
			return <p> NO SLIDERS YET </p>;
		}
	}

	return (
		<div className="predict">
			<div className="row">
				<div className="col s12">
					<div className="card z-depth-1">
						<div className="card-content">
							<span className="card-title">
								Testing: {nameMapper(model)}
							</span>
							<div className="row">
								{Dropdown(
									project,
									model,
									handleDropChange,
									nameMapper
								)}
							</div>
							<div
								style={{
									paddingLeft: "5rem",
									paddingRight: "5rem"
								}}
							>
								{getslides(
									project.variables,
									handleSliderChange,
									handleInputChange
								)}
							</div>
						</div>
						<div className="card-action">
							Input your guesses here and see what your model
							predicts!
						</div>
					</div>
				</div>
			</div>
			<div className="row">
				{ResultCard(uid, project, model, inputs, nameMapper)}{" "}
			</div>
		</div>
	);
};

export default GenerateSliders;
