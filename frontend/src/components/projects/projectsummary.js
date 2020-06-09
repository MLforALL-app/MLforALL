import React from "react";
import moment from "moment";

const ProjectSummary = ({ project }) => {
	return (
		<div className="project-summary">
			<div className="card z-depth-1">
				<div className="card-content content-sum">
					<span className="card-title"> {project.title} </span>
					<p>
						{project.content.length > 100
							? project.content.substr(0, 100) + "..."
							: project.content}
					</p>
				</div>
				<div className="card-action">
					<div style={{ float: "left" }}>
						{moment(project.createdAt.toDate()).calendar()}
					</div>
					<div style={{ float: "right" }}>
						{project.authorFirstName} {project.authorLastName}{" "}
						<span className="hearts">&hearts;</span>
					</div>
					<div style={{ clear: "both" }}></div>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;
