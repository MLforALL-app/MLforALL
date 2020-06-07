import React from "react";

const Insights = ({ project }) => {
	return (
		<div className="card">
			<div className="card-content">
				here are some insights: Your dataset has {console.log(project)}
				{project.info ? project.info.NaN : "Error no info"} amount of
				NaN's, or missing values
			</div>
		</div>
	);
};

export default Insights;
