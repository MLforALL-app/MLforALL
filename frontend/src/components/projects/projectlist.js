import React from "react";
import ProjectSummary from "./projectsummary";

function ProjectList({ projects }) {
	return (
		<div className="project-list section">
			{projects &&
				projects.map((proj) => {
					return <ProjectSummary project={proj} key={proj.id} />;
				})}
		</div>
	);
}

export default ProjectList;
