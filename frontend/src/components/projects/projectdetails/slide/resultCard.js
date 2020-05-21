import React from "react";
import axios from "axios";

const inputToString = (inputs) => {
	const entries = Object.entries(inputs);
	const pretty = entries.map(([key, value]) => {
		return " " + key + " = " + String(value);
	});
	return pretty.join();
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
				})
				.catch((err) => {
					console.log("THIS IS AN ERROR", err);
					setOutput("Sorry there are some errors with are server.");
				});
		} else {
			setOutput("error, please choose a model first");
		}
	};

	return (
		<div className="results">
			<div className="col s3">
				<div className="card z-depth-0">
					<div className="card-content">
						<span className="card-title">Result:</span>
						<div className="center">
							<button
								className="btn waves-effect waves-light blue"
								type="submit"
								name="action"
								onClick={handleSubmit}
							>
								Predict!
								<i className="material-icons right">cached</i>
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="col s9">
				<div className="card z-depth-0">
					<div className="card-content">
						{" "}
						<span className="card-title center">
							{output ? output : ""}
						</span>
						<span style={{ textAlign: "center" }}>
							<p>
								{output === ""
									? "---"
									: "Given these inputs of" +
									  inputToString(inputs) +
									  (model === ""
											? " NO MODEL SELECTED "
											: " " + model) +
									  " would predict it to be: " +
									  output}
							</p>
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ResultCard;
