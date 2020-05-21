import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

export default function PredictSlider(
	param,
	lo,
	hi,
	handleSliderChange,
	handleInputChange,
	value
) {
	const q2 = (hi + lo) / 2;
	const q1 = (lo + q2) / 2;
	const q3 = (hi + q2) / 2;

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
