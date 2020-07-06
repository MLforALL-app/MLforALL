import React from "react";
import HelpBox from "../../../layouts/helpbox";

const Insights = ({ project }) => {
	return (
		<div>
			<h6 className="purple-text">
				{" "}
				Uh oh!{" "}
				{!project.info
					? "Error no insights"
					: "This project has " + project.info.NaN + " NaN datapoints."}{" "}
				<HelpBox
					placement="right"
					header="NaN: Not A Number"
					desc="A NaN value represents missing data in your dataset. These are methods to remove the NaNs or fill them in with substitute values"
				/>
			</h6>
		</div>
	);
};

export default Insights;
