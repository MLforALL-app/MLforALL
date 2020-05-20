import React from "react";
import axios from "axios";

const inputToString = (inputs) => {
	const entries = Object.entries(inputs);
	const pretty = entries.map(([key, value]) => {
		return key + " = " + String(value) + ", ";
	});
	return <span className="message">Given inputs of {pretty}</span>;
};

const ResultCard = (uid, project, model, inputs) => {
	const [output, setOutput] = React.useState("");

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
			axios
				.post(`https://flask-api-aomh7gr2xq-ue.a.run.app/predict`, {
					path
				})
				.then((res) => {
					console.log("THIS IS RESULT", res);
					setOutput(res);
				});
		} else {
			setOutput("error, please choose a model first");
		}
	};

	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">ResultCard</span>
				<button
					className="btn waves-effect waves-light"
					type="submit"
					name="action"
					onClick={handleSubmit}
				>
					Submit
					<i className="material-icons right">send</i>
				</button>
				<p>
					Given these inputs of {inputToString(inputs)}a{" "}
					{model === "" ? "NO MODEL SELECTED" : model} would predict
					it to be: {output}{" "}
				</p>
			</div>
		</div>
	);
};

export default ResultCard;
