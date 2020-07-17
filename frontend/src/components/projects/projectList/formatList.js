import React from "react";
import ProjectSummary from "./projectsummary";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Link } from "react-router-dom";

const makeLink = (proj) => {
  return (
    <div className="col s12 m4" key={`link_${proj.pid}`}>
      <Link to={`/project/${proj.pid}`}>
        <ProjectSummary project={proj} />{" "}
      </Link>
    </div>
  );
};

const grouped = (projects) => {
  const group = [];
  for (var i = 0; i < projects.length; i++) {
    if (i < projects.length - 2) {
      group.push([projects[i], projects[i + 1], projects[i + 2]]);
      i += 3;
    } else if (i < projects.length - 1) {
      group.push([projects[i], projects[i + 1]]);
      i += 2;
    } else {
      group.push([projects[i]]);
      i++;
    }
  }
  return group;
};

// const mapPairs = (pair) => {
// 	if (pair.length < 2) {
// 		return (
// 			<div className="row" key={`row_${pair[0].pid}`}>
// 				{makeLink(pair[0])}
// 			</div>
// 		);
// 	} else {
// 		return (
// 			<div className="row" key={`row_${pair[0].pid}`}>
// 				{makeLink(pair[0])}
// 				{makeLink(pair[1])}
// 			</div>
// 		);
// 	}
// };

const mapTriples = (trip) => {
  if (trip.length < 2) {
    return (
      <div className="row" key={`row_${trip[0].pid}`}>
        {makeLink(trip[0])}
      </div>
    );
  } else if (trip.length < 3) {
    return (
      <div className="row" key={`row_${trip[0].pid}`}>
        {makeLink(trip[0])}
        {makeLink(trip[1])}
      </div>
    );
  } else {
    return (
      <div className="row" key={`row_${trip[0].pid}`}>
        {makeLink(trip[0])}
        {makeLink(trip[1])}
        {makeLink(trip[2])}
      </div>
    );
  }
};

const FormatList = ({ projects }) => {
  if (projects) {
    return grouped(projects).map(mapTriples);
  } else {
    return (
      <div className="container center">
        <CircularProgress />
      </div>
    );
  }
};

export default FormatList;
