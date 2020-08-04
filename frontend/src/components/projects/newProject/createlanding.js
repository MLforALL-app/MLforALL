import React, { Fragment } from "react";
import createImg from "../../../pictures/backgrounds/create.svg";
import CreateProject from "./createproject";
import "../../../styling/build.css";

const CreateLanding = () => {
  return (
    <Fragment>
      <div className="row container ">
        <h1 className="purple-text">Welcome to Create Project! </h1>
        <div
          className="col s12 m6 create-animation"
          style={{ paddingRight: "5vw" }}
        >
          <br />
          <ul>
            <li>
              <h5>1. Download or Upload your own CSV datasets</h5>
            </li>
            <li>
              <h5>
                2. Fine tune parameters to and select Machine Learning models
              </h5>
            </li>
            <li>
              <h5> 3. Play, test, and share your models!</h5>
            </li>
          </ul>
        </div>
        <div className="col s0 m6" style={{ paddingLeft: "5vw" }}>
          <img className="create-animation" src={createImg} alt="" />
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <h4
          className="purple-text"
          style={{ position: "absolute", left: "15vw" , top: "10px"}}
        >
          Start by naming your project
        </h4>
        <div className="row container center" style={{ paddingTop: "5vh" }}>
          <CreateProject />
        </div>
      </div>
    </Fragment>
  );
};

export default CreateLanding;
