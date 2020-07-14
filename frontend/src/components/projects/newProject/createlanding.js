import React, { Fragment } from "react";
import createImg from "../../../pictures/backgrounds/create.svg";
import CreateProject from "./createproject";
import "../../../styling/build.css";

const CreateLanding = () => {
  return (
    <Fragment>
      <div className="row container">
        <h1 className="purple-text">Welcome to Create Project! </h1>
        <div className="col s6 create-animation" style={{paddingRight: "5vw"}}>
					<br/>
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
        <div className="col s6" style={{paddingLeft: "5vw"}}>
          <CreateProject />
          {/* <img className="create-animation" src={createImg} alt="" /> */}
        </div>
      </div>
      <div className="row container center" style={{paddingTop: "5vh"}}>
        <img className="create-animation" src={createImg} alt="" />
      </div>
    </Fragment>
  );
};

export default CreateLanding;
