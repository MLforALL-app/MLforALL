import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const SortForm = ({
	handleDropChange,
	orderBy,
	handleSwitchChange,
	direction,
	me
}) => {
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
		<span>
			<FormControl style={{ float: "right" }}>
				<span>
					<div style={{ paddingBottom: "0.5rem" }} className="switch">
						{direction ? "Lowest First" : "Highest First"}
						<label>
							<input
								value={direction}
								type="checkbox"
								onChange={handleSwitchChange}
							/>
							<span className="lever"></span>
						</label>
					</div>
					Sort by:{" "}
					<Select
						value={orderBy}
						onChange={handleDropChange}
						displayEmpty>
						{items}
						{me ? "" : myitems}
					</Select>{" "}
				</span>
			</FormControl>
		</span>
	);
};

export default SortForm;
