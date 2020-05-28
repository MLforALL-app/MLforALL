import React from "react";
import { makeStyles } from "@material-ui/core/styles";
//import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

// Helper React Hook to set styles for Dropdown Menu
const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 500
	},
	selectEmpty: {
		marginTop: theme.spacing(2)
	}
}));

/* REQUIRES: project a firestore object, currentModel the ml alg currently
 * 			 selected, handleChange a handler inherited from parent to control
 * 			 parent state, and nameMapper a prettyPrint str->str fn
 * ENSURES: dropdown menu of existing models for a project in firestore whose
 * 			changes alter the parent component's state. */

const Dropdown = (project, currentModel, handleChange, nameMapper) => {
	const classes = useStyles();

	const getMenuItems = (models, nameMapper) => {
		if (models.length === 0) {
			return (
				<MenuItem key={"none"} value={""}>
					{" "}
					There are no models available for this project
				</MenuItem>
			);
		} else {
			var result = [];
			for (var i = 0; i < models.length; i++) {
				var name = nameMapper(models[i]);
				result.push(
					<MenuItem key={models[i]} value={models[i]}>
						{" "}
						{name}{" "}
					</MenuItem>
				);
			}
			return result;
		}
	};

	return (
		<div style={{ textAlign: "center" }}>
			<FormControl className={classes.formControl}>
				<Select
					value={currentModel}
					onChange={handleChange}
					displayEmpty
					className={classes.selectEmpty}
				>
					{getMenuItems(project.models, nameMapper)}
				</Select>
				<FormHelperText>Model</FormHelperText>
			</FormControl>
		</div>
	);
};

export default Dropdown;
