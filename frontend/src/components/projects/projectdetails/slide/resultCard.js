import React from "react";
// import axios from "axios";
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

const ResultCard = (model, inputs, output, target, loading, nameMapper) => {
	return (
		<div className="results">
			<div className="col s12">
				<div className="card z-depth-1">
					<div className="card-content">
						{loader(
							loading,
							output,
							inputs,
							model,
							target,
							nameMapper
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultCard;
