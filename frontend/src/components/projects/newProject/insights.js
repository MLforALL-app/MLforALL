import React from "react";

const Insights = ({ project }) => {
	return (
		<div className="card">
			<div className="card-content">
				<span className="card-title"> Dataset Insights </span>
				{!project.info
					? "Error no insights"
					: "This project has " +
					  project.info.NaN +
					  " NaN datapoints."}
			</div>
		</div>
	);
};

export default Insights;
