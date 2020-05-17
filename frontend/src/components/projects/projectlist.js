import React from "react";
import ProjectSummary from "./projectsummary";
import { Link } from "react-router-dom";

function mapDepends(projects, uid) {
	if (projects && uid) {
		//console.log("if", projects);
		return projects.filter((p) => p.authorID === uid);
	} else {
		//console.log("else");
		return projects;
	}
}

function ProjectList({ projects, uid }) {
	return (
		<div className="project-list section">
			{projects &&
				mapDepends(projects, uid).map((proj) => {
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
