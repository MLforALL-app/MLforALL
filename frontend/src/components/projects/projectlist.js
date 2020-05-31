import React from "react";
import ProjectSummary from "./projectsummary";
import { Link } from "react-router-dom";

function mapDepends(projects, uid) {
	if (projects && uid) {
		// console.log("MAP DEPENDS if", projects);
		return projects.filter((p) => p.authorID === uid);
	} else {
		// console.log("MAP DEPENDS else", projects);
		return projects;
	}
}

function makeLink(proj) {
	//console.log("THIS IS PROJ FOR MAKELINK", proj);
	return (
		<div className="col s12 m6" key={proj.id}>
			<Link to={"/project/" + proj.id}>
				<ProjectSummary project={proj} />{" "}
			</Link>
		</div>
	);
}

function grouped(projects) {
	const group = [];
	for (var i = 0; i < projects.length; i++) {
		if (i < projects.length - 1) {
			group.push([projects[i], projects[i + 1]]);
			i++;
		} else {
			group.push([projects[i]]);
		}
	}
	//console.log("THIS IS GROUPED", group);
	return group;
}

function mapPairs(pair) {
	if (pair.length < 2) {
		return (
			<div className="row" key={pair[0].id}>
				{makeLink(pair[0])}
			</div>
		);
	} else {
		return (
			<div className="row" key={pair[0].id}>
				{makeLink(pair[0])}
				{makeLink(pair[1])}
			</div>
		);
	}
}

function ProjectList({ projects, uid }) {
	return (
		<div className="project-list section">
			{projects && grouped(mapDepends(projects, uid)).map(mapPairs)}
		</div>
	);
}

export default ProjectList;
