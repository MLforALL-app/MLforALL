import PredictSlider from "./predictslide";
import React from "react";

function getslides(variables) {
	var output = [];
	variables.forEach((v) => {
		//console.log("Making ", v.name);
		output.push(PredictSlider(v.name, v.lo, v.hi));
	});
	return <div>{output}</div>;
}

const GenerateSliders = (project) => {
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title"> Test This Model!</span>
				<p>
					{" "}
					Put some input values here and see what your model predicts!
				</p>
				<div style={{ padding: "5rem" }}>
					{getslides(project.variables)}
				</div>
			</div>
		</div>
	);
};

export default GenerateSliders;
