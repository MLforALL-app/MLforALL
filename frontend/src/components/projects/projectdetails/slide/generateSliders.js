import PredictSlider from "./predictslide";
import Dropdown from "../dropdown";
import ResultCard from "./resultCard";
import React from "react";

// Initialize our state with average values for datasets
const initInputs = (variables) => {
	var inputs = {};
	variables.forEach((v) => {
		// console.log("Current Var", v);
		inputs[v.name] = (v.hi - v.lo) / 2;
		// console.log(inputs[v.name]);
	});
	// console.log("INITIAL INPUTS", inputs);
	return inputs;
};

// Begin compononent
const GenerateSliders = (project, uid) => {
	const [model, setModel] = React.useState("");
	const handleChange = (event) => {
		setModel(event.target.value);
	};

	const initial = initInputs(project.variables);
	const [inputs, setInputs] = React.useState(initial);
	// hsc and hic are higher order functions to allow for generality of event handlers
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

	// Helper function to generalize the generation of slides
	function getslides(variables, hsc, hic) {
		if (variables.length > 0) {
			var output = [];
			variables.forEach((v) => {
				var n = v.name;
				output.push(
					PredictSlider(n, v.lo, v.hi, hsc(v), hic(v), inputs[n])
				);
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
					<div className="card z-depth-0">
						<div className="card-content">
							<span className="card-title">
								Testing:{" "}
								{model === "" ? "no model selected" : model}{" "}
							</span>
							<div className="row">
								{Dropdown(project, model, handleChange)}
							</div>
							<div className="row">
								<div className="col s12">
									Put some input values here and see what your
									model predicts!
								</div>
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
					</div>
				</div>
			</div>
			<div className="row">
				{ResultCard(uid, project, model, inputs)}{" "}
			</div>
		</div>
	);
};

/* watch out for ordering inconsistencies with Object.values and the API input */

export default GenerateSliders;
