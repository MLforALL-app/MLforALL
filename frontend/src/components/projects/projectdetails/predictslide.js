import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import Input from "@material-ui/core/Input";

export default function PredictSlider(param, lo, hi) {
	const q2 = (hi - lo) / 2;
	const q1 = q2 / 2;
	const q3 = q2 + q1;

	const [value, setValue] = React.useState(q2);

	const marks = [
		{ value: q1, label: q1.toString() },
		{ value: q2, label: q2.toString() },
		{ value: q3, label: q3.toString() }
	];

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleInputChange = (event) => {
		setValue(event.target.value === "" ? "" : Number(event.target.value));
	};

	return (
		<div>
			<Typography id="continuous-slider" gutterBottom>
				{param}
			</Typography>
			<Grid container spacing={2} alignItems="center">
				<Grid item xs>
					<Slider
						value={typeof value === "number" ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
						marks={marks}
						min={lo}
						max={hi}
					/>
				</Grid>
				<Grid item>
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
