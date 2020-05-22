import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

const clean = (n) => {
	if (n < 1 && n >= 0) {
		return n.toFixed(3);
	} else {
		return Math.ceil(n);
	}
};
export default function PredictSlider(
	varObj,
	handleSliderChange,
	handleInputChange,
	value
) {
	console.log(varObj);
	const param = varObj.name;
	const hi = clean(varObj.hi);
	const lo = clean(varObj.lo);
	const q1 = clean(varObj.q1);
	const q2 = clean(varObj.q2);
	const q3 = clean(varObj.q3);

	const marks = [
		{ value: q1, label: q1.toString() },
		{ value: q2, label: q2.toString() },
		{ value: q3, label: q3.toString() }
	];
	const ss = Math.pow(Math.abs(hi - lo) / 150, 0.975);
	//console.log("THIS IS RANGE", range);
	const stepSize = ss <= 0.1 ? ss : Math.ceil(ss);
	return (
		<div key={"container_" + param}>
			<Typography id="continuous-slider" gutterBottom>
				{param}
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
							min: { lo },
							max: { hi },
							type: "number",
							"aria-labelledby": "input-slider"
						}}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
