import React from "react";
import ProjectSummary from "./projectsummary";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const makeLink = (proj) => {
	//console.log("THIS IS PROJ FOR MAKELINK", proj);
	return (
		<div className="col s12 m6" key={proj.id}>
			<Link to={`/project/${proj.id}`}>
				<ProjectSummary project={proj} />{" "}
			</Link>
		</div>
	);
};

const grouped = (projects) => {
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
};

const mapPairs = (pair) => {
	//console.log("PAIR", pair);
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
};

const FormatList = ({ projects, loaded }) => {
	if (loaded) {
		return grouped(projects.flat()).map(mapPairs);
	} else {
		return (
			<div className="container center">
				<CircularProgress />
			</div>
		);
	}
};

export default FormatList;
