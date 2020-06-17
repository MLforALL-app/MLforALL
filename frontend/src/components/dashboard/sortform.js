import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SortForm = ({ handleChange, orderBy, me }) => {
	const items = [
		<MenuItem key="cat" value="createdAt">
			Date
		</MenuItem>,
		<MenuItem key="tle" value="title">
			Title
		</MenuItem>
	];
	const myitems = [
		<MenuItem key="afn" value="authorFirstName">
			First Name
		</MenuItem>,
		<MenuItem key="aln" value="authorLastName">
			Last Name
		</MenuItem>
	];
	return (
		<FormControl style={{ float: "right" }}>
			<span>
				Sort By:{" "}
				<Select value={orderBy} onChange={handleChange} displayEmpty>
					{items}
					{me ? "" : myitems}
				</Select>
			</span>
		</FormControl>
	);
};

export default SortForm;
