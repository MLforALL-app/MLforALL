import React from "react";

const Insights = ({ project }) => {
	return (
		<div>
			<h6 className="purple-text">
				{" "}
				Uh oh!{" "}
				{!project.info
					? "Error no insights"
					: "This project has " +
					  project.info.NaN +
					  " NaN datapoints."}{" "}
			</h6>
		</div>
	);
};

export default Insights;
