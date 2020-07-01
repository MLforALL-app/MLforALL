import React from "react";
// import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

// Pretty Print a list of input parameters and their values
const inputToString = (inputs) => {
	const entries = Object.entries(inputs);
	const pretty = entries.map(([key, value]) => {
		return (
			<div key={key}>
				{key} = <span className="purple-text pres">{String(value)}</span>{" "}
			</div>
		);
	});
	return pretty;
};

// Text to display the results of a guess
const showResults = (output, inputs) => {
	if (output === "" || output === "chooseInput") {
		return <p className="pres"> ~~choose your inputs first~~ </p>;
	} else if (output === "Server Error") {
		return (
			<p className="pres">
				{" "}
				There's been an error with our servers. Sorry about that! We'll get it
				fixed soon.{" :)"}
			</p>
		);
	} else {
		return (
			<div className="land" style={{ textAlign: "justify !important" }}>
				{inputToString(inputs)}
			</div>
		);
	}
};

/* REQUIRES: model the current model that is being used for prediction,
 *			 inputs an object with params as keys and values as field,
 *			 output the desired output to display, target the key that
 *			 is being predicted, loading a bool to show circle or not,
 * 			 and nameMapper a total str -> str function
 * ENSURES: a card display the results of a Predict API call */

const ResultCard = (model, inputs, output, target, loading, nameMapper) => {
	return (
		<div className="container center slider-contain">
			{loading ? (
				<CircularProgress />
			) : (
				<span>
					<p> {target} is... </p>
					<h4>
						<span className="purple-text">{output ? output.data : ""}</span>
					</h4>
					<p className="pres">
						{" "}
						Type of model:{" "}
						<b>
							<span className="purple-text">{nameMapper(model)} </span>
						</b>
					</p>
					<div className="header-subrow">{showResults(output, inputs)}</div>
				</span>
			)}
		</div>
	);
};

export default ResultCard;
