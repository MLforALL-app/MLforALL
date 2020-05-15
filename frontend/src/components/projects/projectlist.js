import React from "react";
import ProjectSummary from "./projectsummary";
import { Link } from "react-router-dom";

function ProjectList({ projects }) {
	return (
		<div className="project-list section">
			{projects &&
				projects.map((proj) => {
					return (
						<Link to={"/project/" + proj.id} key={proj.id}>
							<ProjectSummary project={proj} />{" "}
						</Link>
					);
				})}
		</div>
	);
}

export default ProjectList;
