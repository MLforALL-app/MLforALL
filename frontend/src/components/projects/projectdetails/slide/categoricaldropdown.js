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

const Dropdown = (param, values, currentSelection, handleChange) => {
	const getMenuItems = (values) => {
        console.log("making a dropdown");
		if (values.length === 0) {
			return (
				<MenuItem key={"none"} value={""}>
					{" "}
					Something is wrong and there are no variables
				</MenuItem>
			);
		} else {
			var result = [];
			for (var i = 0; i < values.length; i++) {
				var name = values[i];
				result.push(
					<MenuItem key={values[i]} value={values[i]}>
						{" "}
						{name}{" "}
					</MenuItem>
				);
			}
			return result;
		}
	};

	return (
		<div key={"container_" + param} style={{ display: "inline-block", textAlign: "center" }}>
            {param}
			<FormControl>
				<Select
					value={currentSelection}
					onChange={handleChange}
					displayEmpty>
					{getMenuItems(values)}
				</Select>
			</FormControl>
		</div>
	);
};

export default Dropdown;
