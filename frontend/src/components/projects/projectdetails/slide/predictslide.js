import React, { useRef } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

/* REQUIRES: varObj some object with name, lo, hi, q1, q2, q3 fields
 *			 handleSliderChange a valid handler to control states in
 *			 generateSliders. handleInputChange the same thing.
 *			 Value as a parameter to mutate to keep track of in parent
 * ENSURES: a generalized slider that can alter state in parent component */

export default function PredictSlider(
	varObj,
	handleSliderChange,
	handleInputChange,
	valueNoRef
) {
	const valueRef = useRef(valueNoRef);
	const value = valueRef.current;
	// Get descriptive stats from firestore project document variables subfield
	const param = varObj.name;
	const continuous = varObj.continuous;
	const hi = varObj.hi;
	const lo = varObj.lo;
	const q1 = varObj.q1;
	const q2 = varObj.q2;
	const q3 = varObj.q3;
	/*
	const hi = clean(varObj.hi);
	const lo = clean(varObj.lo);
	const q1 = clean(varObj.q1);
	const q2 = clean(varObj.q2);
	const q3 = clean(varObj.q3); */

	// List of points we want to mark
	const marks = [
		{ value: q1, label: q1.toString() },
		{ value: q2, label: q2.toString() },
		{ value: q3, label: q3.toString() }
	];
	// (Clever?) way to scale step size so its not 1 for big and small ranges
	var stepSize = 1;
	if (continuous) {
		const ss = Math.pow(Math.abs(hi - lo) / 150, 0.975);
		stepSize = ss <= 0.1 ? ss : Math.ceil(ss);
	}

	return (
		<div key={"container_" + param}>
			<Typography id="continuous-slider" gutterBottom>
				<b>{param}</b>
			</Typography>
			<Grid container spacing={1} alignItems="center">
				<Grid item xs>
					<Slider
						value={typeof value === "number" ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						marks={marks}
						min={lo}
						max={hi}
						step={stepSize}
					/>
				</Grid>
				<Grid item key={"input_" + param}>
					<Input
						value={value}
						margin="dense"
						onChange={handleInputChange}
						inputProps={{
							min: lo,
							max: hi,
							type: "number",
							"aria-labelledby": "input-slider"
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
