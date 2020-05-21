import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 500
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

const nameMapper = (name) => {
	switch (name) {
		case "log_reg":
			return "Logistic Regression";
		case "gnb":
			return "Gauss Naive Bayes";
		case "knn":
			return "K-Nearest Neighbors";
		default:
			return "TODO: add more";
	}
};

const getFirst = (models, startVal) => {
	if (startVal === "") {
		return "";
	} else {
		return (
			<MenuItem key={models[0]} value={nameMapper(models[0])}>
				{nameMapper(models[0])}
			</MenuItem>
		);
	}
};

const getMenuItems = (models) => {
	var result = [];
	for (var i = 1; i < models.length; i++) {
		var name = nameMapper(models[i]);
		result.push(
			<MenuItem key={models[i]} value={name}>
				{" "}
				{name}{" "}
			</MenuItem>
		);
	}
	return result;
};

const Dropdown = (project, model, handleChange) => {
	const classes = useStyles();
	const modList = project.models;
	const startVal = modList.length < 1 ? "" : nameMapper(modList[0]);
	console.log("START VAL", startVal);
	return (
		<div style={{ textAlign: "center" }}>
			<FormControl className={classes.formControl}>
				<Select
					value={model}
					onChange={handleChange}
					displayEmpty
					defaultValue={startVal}
					className={classes.selectEmpty}
				>
					{getFirst(project.models, startVal)}
					{getMenuItems(project.models)}
				</Select>
				<FormHelperText>Model</FormHelperText>
			</FormControl>
		</div>
	);
};

export default Dropdown;
