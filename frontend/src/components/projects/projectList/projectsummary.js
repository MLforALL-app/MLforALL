import React from "react";
import moment from "moment";
import img1 from "../../../pictures/landing/LP4.svg";
//issue number 60 add banner/background
const ProjectSummary = ({ project }) => {
  const shorten = (s) => {
    return s.length < 15 ? s : s.substr(0, 13) + "..";
  };

  //   const background = () => {
  // 	  return {project ? project.backgroundImage : `url(${img1})`}
  //   }
  return (
    <div className="project-summary">
      <div className="card z-depth-1" style={{ maxWidth: "325px" }}>
        <div
          className="card-picture"
          style={{ backgroundImage: `url(${img1})`, backgroundColor: "white" }}
        ></div>
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
            {shorten(project.authorFirstName + " " + project.authorLastName)}{" "}
            <span className="hearts">&hearts;</span>
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
