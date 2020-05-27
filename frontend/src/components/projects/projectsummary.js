import React from "react";
import moment from "moment";

const ProjectSummary = ({ project }) => {
	return (
		<div className="project-summary">
			<div className="card">
				<div className="card-content">
					<span className="card-title"> {project.title} </span>
					<p>
						{project.content.length > 100
							? project.content.substr(0, 100) + "..."
							: project.content}
					</p>
				</div>
				<div className="card-action">
					<div style={{ float: "left" }}>
						{moment(project.createdAt.toDate()).format("M/D/YYYY")}
					</div>
					<div style={{ float: "right" }}>
						{" "}
						made with <span className="hearts">
							&hearts;
						</span> by {project.authorFirstName}{" "}
						{project.authorLastName}
					</div>
					<div style={{ clear: "both" }}></div>
				</div>
			</div>
		</div>
	);
};

export default ProjectSummary;
