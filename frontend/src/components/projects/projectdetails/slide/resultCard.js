import React, { useState } from "react";
import axios from "axios";
import CircularProgress from "@material-ui/core/CircularProgress";

const inputToString = (inputs) => {
	const entries = Object.entries(inputs);
	const pretty = entries.map(([key, value]) => {
		return " " + key + " = " + String(value);
	});
	return pretty.join();
};

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

const ResultCard = (uid, project, model, inputs, nameMapper) => {
	const [output, setOutput] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();
		if (model !== "") {
			const path = {
				uid,
				project: project.title,
				model,
				inputs: Object.values(inputs)
			};
			console.log("THIS IS PATH", path);
			setLoading(true);
			// console.log("BEFORE AXIOS, LOADING", loading);
			axios
				.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/predict`, path)
				.then((res) => {
					console.log("THIS IS RESULT", res);
					setOutput(res);
					setLoading(false);
				})
				.catch((err) => {
					//console.log("THIS IS AN ERROR", err);
					setOutput("Server Error");
					setLoading(false);
				});
		} else {
			setOutput("Choose A Model");
		}

		// console.log("EXIT AXIOS LOADING STATE,", loading);
	};

	return (
		<div className="results">
			<div className="col s3">
				<div className="card z-depth-0">
					<div className="card-content">
						<div className="center">
							<button
								style={{ borderRadius: "50px" }}
								className="btn-large waves-effect waves-light blue lighten-1"
								type="submit"
								name="action"
								onClick={handleSubmit}
							>
								<span
									style={{
										fontSize: "1.4rem"
									}}
								>
									PREDICT
								</span>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="col s9">
				<div className="card z-depth-0">
					<div className="card-content">
						{loader(
							loading,
							output,
							inputs,
							model,
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
