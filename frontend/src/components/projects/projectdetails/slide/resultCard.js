import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

// Pretty Print a list of input parameters and their values
const inputToString = (inputs) => {
	const entries = Object.entries(inputs);
	const pretty = entries.map(([key, value]) => {
		return " " + key + " = " + String(value);
	});
	return pretty.join();
};

// Text to display the results of a guess
const showResults = (output, inputs, model, targetParam, nameMapper) => {
	if (output === "") {
		return <p> ~~choose your inputs~~ </p>;
	} else if (output === "Server Error") {
		return (
			<p>
				{" "}
				There's been an error with our servers. Sorry about that! We'll
				get it fixed soon.{" :)"}
			</p>
		);
	} else {
		return (
			<p>
				Given these inputs of
				<span style={{ color: "green" }}>
					{inputToString(inputs)}
				</span>{" "}
				your selected model of
				<span style={{ color: "blue" }}>
					{model === ""
						? " NO MODEL SELECTED "
						: " " + nameMapper(model)}
				</span>{" "}
				would predict{" "}
				<span style={{ color: "purple" }}> {targetParam} </span>to be:{" "}
				<span style={{ color: "red" }}>{output.data}</span>
			</p>
		);
	}
};

// Second order function to show results (function above) or loading sign
const loader = (loading, output, inputs, model, targetParam, nameMapper) => {
	if (loading) {
		return (
			<div className="container center">
				<CircularProgress />
			</div>
		);
	} else {
		return (
			<div>
				<span className="card-title center">
					{output ? output.data : ""}
				</span>
				<span style={{ textAlign: "center" }}>
					{showResults(
						output,
						inputs,
						model,
						targetParam,
						nameMapper
					)}
				</span>
			</div>
		);
	}
};

/* REQUIRES: uid (?), project to be a valid firestore reference, model
 *			 the current model that is being used for prediction,
 *			 inputs an object with params as keys and values as field,
 * 			 and nameMapper a total str -> str function
 * ENSURES: a card display the results of a Predict API call */

const ResultCard = (uid, project, model, inputs, nameMapper) => {
	// States to keep track of outputresult, if something is loading, and
	// that particular's requests Inputs and Models
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);
	const [resInputs, setResInputs] = useState({});
	const [resModel, setResModel] = useState("");

	// Event handler for when user presses "Generate" button
	const handleSubmit = (event) => {
		event.preventDefault();
		// Update the inputs/models ur showing
		setResInputs(inputs);
		setResModel(model);
		if (model !== "") {
			// create path for API Post Request
			const path = {
				uid: project.authorID,
				project: project.title,
				model,
				inputs: Object.values(inputs)
			};
			// console.log("THIS IS PATH", path);
			setLoading(true);
			// console.log("BEFORE AXIOS, LOADING", loading);
			axios
				.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/predict`, path)
				.then((res) => {
					//console.log("THIS IS RESULT", res);
					// If things work, set the output and stop loading
					setOutput(res);
					setLoading(false);
				})
				.catch((err) => {
					//console.log("THIS IS AN ERROR", err);
					// If things don't work, server error and stop loading
					setOutput("Server Error");
					setLoading(false);
				});
		} else {
			// user has not picked a model yet
			setOutput("Choose A Model");
		}
		// console.log("EXIT AXIOS LOADING STATE,", loading);
	};

	return (
		<div className="results">
			<div className="col s3">
				<div className="card z-depth-1">
					<div className="card-content">
						<div className="center">
							<button
								className="btn-large waves-effect waves-light"
								type="submit"
								name="action"
								onClick={handleSubmit}
							>
								<span
									style={{
										fontSize: "1.4rem"
									}}
								>
									Generate
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="col s9">
				<div className="card z-depth-1">
					<div className="card-content">
						{loader(
							loading,
							output,
							resInputs,
							resModel,
							project.targetParam,
							nameMapper
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultCard;
