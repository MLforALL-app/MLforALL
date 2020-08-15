import React, { Fragment } from "react";
import createImg from "../../../pictures/backgrounds/create.svg";
import CreateProject from "./createproject";
import "../../../styling/build.css";
import No1 from "../../../pictures/project/number1.png";
import No2 from "../../../pictures/project/number2.png";
import No3 from "../../../pictures/project/number3.png";

const CreateLanding = () => {
  return (
    <Fragment>
      <div className="row container">
        <h1 className="purple-text">Welcome to Create Project! </h1>
        <div className="col s12 m6 create-animation">
          <p style={{color: "gray", fontSize: "24px"}}>Here, you can: </p>
          <ul style={{ listStyleType: "none" }}>
            <li
              style={{ backgroundImage: `url(${No1})` }}
              className="number-image"
            >
              <p className="option-lists">
                Download <strong>or</strong> Upload{" "}
                <strong> your own CSV datasets</strong>
              </p>
            </li>
            <li
              style={{ backgroundImage: `url(${No2})` }}
              className="number-image"
            >
              <p className="option-lists">
                {" "}
                Customize <strong>your dataset and</strong> create{" "}
                <strong>your own Machine Learning model</strong>
              </p>
            </li>
            <li
              style={{ backgroundImage: `url(${No3})` }}
              className="number-image"
            >
              <p className="option-lists">
                {" "}
                Play, test, <strong>and</strong> share{" "}
                <strong>your awesome models to the world!</strong>
              </p>
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
          style={{ position: "absolute", left: "15vw", top: "10px" }}
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
