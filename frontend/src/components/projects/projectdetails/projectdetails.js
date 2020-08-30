import React from "react";
import GenerateSliders from "./slide/generateSliders";
import DescCard from "./cards/descCard";
import CSVCard from "./cards/csvCard";
import UploadIMG from "./uploadimg";
import projectSource from "../../../config/collection";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import "../../../styling/projectdetails.css";
import img1 from "../../../pictures/default_image/default-image.jpg";

/* MAIN COMPONENT
 * Uses the helper components DescCard, Generate Sliders, and CSV Card
 * to create the view project page.
 */
const ProjectDetails = (props) => {
  // id = unique projID, auth = firebase auth object, project = firestore
  const { pid, auth, project, history } = props;
  // Route protection
  if (!auth.uid) return <Redirect to="/" />;
  if (!auth.emailVerified) return <Redirect to={`/verify`} />;
  if (project) {
    const bg = () => {
      return project.imgRef ? project.imgRef : img1;
    };
    return (
      <div className="project-details" style={{ backgroundColor: "white" }}>
        <div
          className="container project-picture"
          style={{
            backgroundImage: `url(${bg()})`,
            backgroundColor: "#283593",
          }}
        ></div>
        <div className="row container">
          <DescCard project={project} pid={pid} />
        </div>
        <GenerateSliders project={project} uid={auth.uid} pid={pid} />
        <div
          className="row container"
          style={{ marginBottom: "75px", padding: "40px" }}
        >
          <div className="rwrapper">
            <UploadIMG project={project} projectID={pid} />
          </div>
          <div
            className="pd_text5"
            style={{ float: "right", marginTop: "-30px", marginRight: "30px" }}
          >
            click to add images
          </div>
        </div>
        <div className="row container">
          <CSVCard pid={pid} auth={auth} project={project} history={history} />
        </div>
      </div>
    );
  } else {
    return (
      <div className="container center">
        <Link to="/dashboard">
          There was an error loading this project... click here to go back
        </Link>
        {/*<Redirect to="/dashboard" />*/}
      </div>
    );
  }
};

/* The props we need for this component are the project ID,
 * auth object, and project object. We get the entire projects
 * collections so that we can get the current one based off [id] */
const mapStateToProps = (state, ownProps) => {
  const pid = ownProps.match.params.pid;
  const projects = state.firestore.data[projectSource];
  const project = projects ? projects[pid] : null;
  // lets change this to somehow query in firestoreConnect
  return {
    pid,
    project,
    auth: state.firebase.auth,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: projectSource }])
)(ProjectDetails);
