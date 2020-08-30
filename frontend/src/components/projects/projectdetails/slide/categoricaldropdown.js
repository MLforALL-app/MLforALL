import React from "react";
//import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

/* REQUIRES: project a firestore object, currentModel the ml alg currently
 * 			 selected, handleChange a handler inherited from parent to control
 * 			 parent state, and nameMapper a prettyPrint str->str fn
 * ENSURES: dropdown menu of existing models for a project in firestore whose
 * 			changes alter the parent component's state. */

const CategoricalDropdown = (param, values, currentSelection, handleChange) => {
	const getMenuItems = (values) => {
		if(!currentSelection){
			console.log("Catching");
			currentSelection = values[0];
		}
		console.log("making a dropdown", param, values, currentSelection);
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
		<div key={"container_" + param} >
			
			<Grid container spacing={1} alignItems="center">
			<Grid item xs>
			<Typography id="continuous-slider" gutterBottom>
				<b>{param}</b>
			</Typography>
			</Grid>
				<Grid item xs >	
					<FormControl className="cat-drop-down" >
						<Select
							//defaultValue = {currentSelection}
							value={currentSelection}
							onChange={handleChange}
							displayEmpty={true}
							defaultValue={currentSelection}
							className="cat-drop-down"
							>
							{getMenuItems(values)}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
		</div>
		
	);
};

export default CategoricalDropdown;
