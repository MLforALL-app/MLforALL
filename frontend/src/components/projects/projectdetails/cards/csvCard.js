import React from "react";

const CSVCard = (project) => {
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">Dataset Information</span>
				<p>Here is some intro information about {project.csvName}</p>
			</div>
			<div className="card-action grey lighten-4 grey-text">
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
					{" "}
					Download/reference link here
				</a>
			</div>
		</div>
	);
};

export default CSVCard;
