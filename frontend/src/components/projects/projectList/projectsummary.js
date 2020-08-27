import React from "react";
import moment from "moment";
import img1 from "../../../pictures/default_image/default-image.jpg";
import "../../../styling/cards.css";
import LazyLoad from "react-lazyload";

//issue number 60 add banner/background
const ProjectSummary = ({ project }) => {
  const shorten = (s) => {
    return s.length < 15 ? s : s.substr(0, 13) + "..";
  };

  const bg = () => {
    return project.imgRef ? project.imgRef : img1;
  };

  return (
    <div className="project-summary">
      <div
        className="card card-summary z-depth-1"
        style={{ maxWidth: "300px" }}
      >
        <LazyLoad>
          <div
            className="card-picture"
            style={{
              backgroundImage: `url(${bg()})`,
              backgroundColor: "#283593",
            }}
          ></div>
        </LazyLoad>
        <div className="card-content content-sum">
          <span className="card-title card-title-sum"> {project.title} </span>
          <p>
            {project.content.length > 100
              ? project.content.substr(0, 100) + "..."
              : project.content}
          </p>
        </div>

        <div className="card-action card-action-sum">
          <div style={{ float: "left" }}>
            {moment(project.createdAt.toDate()).format("M/D/Y")}
          </div>
          <div style={{ float: "right" }}>
            <span className="hearts">&hearts;</span>
            {shorten(
              project.authorFirstName + " " + project.authorLastName
            )}{" "}
          </div>
          <div style={{ clear: "both" }}></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;
