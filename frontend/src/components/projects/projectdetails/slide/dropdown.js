import React from "react";
//import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

/* REQUIRES: project a firestore object, currentModel the ml alg currently
 * 			 selected, handleChange a handler inherited from parent to control
 * 			 parent state, and nameMapper a prettyPrint str->str fn
 * ENSURES: dropdown menu of existing models for a project in firestore whose
 * 			changes alter the parent component's state. */

const Dropdown = (project, currentModel, handleChange, nameMapper) => {
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
		<span style={{ display: "inline-block", textAlign: "center" }}>
			<FormControl>
				<Select
					value={currentModel}
					onChange={handleChange}
					displayEmpty>
					{getMenuItems(Object.keys(project.models), nameMapper)}
				</Select>
			</FormControl>
		</span>
	);
};

export default Dropdown;
