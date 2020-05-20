import PredictSlider from "./predictslide";
import SimpleSelect from "./dropdown";
import React from "react";

function getslides(variables) {
	if (variables.length > 0) {
		var output = [];
		variables.forEach((v) => {
			//console.log("Making ", v.name);
			output.push(PredictSlider(v.name, v.lo, v.hi));
		});
		return <div>{output}</div>;
	} else {
		return <p> NO SLIDERS YET </p>;
	}
}

const GenerateSliders = (project) => {
	const [model, setModel] = React.useState("");
	const handleChange = (event) => {
		setModel(event.target.value);
	};
	console.log("THE PROJECT IS", project);
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">Testing: {model} </span>
				<div className="row">
					{SimpleSelect(project, model, handleChange)}
				</div>
				<div className="row">
					<div className="col s12">
						Put some input values here and see what your model
						predicts!{" "}
					</div>
				</div>

				<div style={{ paddingLeft: "5rem", paddingRight: "5rem" }}>
					{getslides(project.variables)}
				</div>
			</div>
		</div>
	);
};

export default GenerateSliders;
