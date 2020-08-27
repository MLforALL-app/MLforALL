import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteProject from "./confirmDel";
import UploadIMG from "../uploadimg";
import "firebase/storage";
import firebase from "../../../../config/fbConfig";
import "../../../../styling/projectdetails.css";

const edit = () => {
  return (
    <button
      className="btn btn-outline-edit anchor-160 waves-effect waves-light z-depth-0"
      style={{ display: "inline", margin: "7px" }}
    >
      <span className="pd_text3" style={{ color: "#FFFFFF" }}>
        Edit
      </span>
    </button>
  );
};

// COMPONENT To Show the CSV Card information. This is where the
// delete project functionality is housed
const CSVCard = ({ pid, auth, project, history }) => {
  const [csvUrl, setcsvUrl] = useState("");
  const owner = auth.uid === project.authorID;
  const csvPath = project.authorID + "/" + pid + "/" + project.csvName;
  var csvRef = firebase.storage().ref(csvPath);
  csvRef
    .getDownloadURL()
    .then((url) => {
      setcsvUrl(url);
    })
    .catch((err) => {});

  return (
    <div className="col s12" style={{ backgroundColor: "#001064" }}>
      <div style={{ textAlign: "left", marginTop: "30px" }}>
        <span className="pd_text1">Project Details</span>
      </div>
      <div
        style={{ textAlign: "left", marginTop: "15px", marginBottom: "50px" }}
      >
        <span className="pd_text2">
          {" "}
          Curious to learn more? Download the CSV file and create your own!{" "}
        </span>
      </div>
      {owner ? (
        <div>
          <div style={{ textAlign: "left", marginBottom: "20px" }}>
            <span className="pd_text1">Project Details</span>
          </div>
          <div style={{ marginBottom: "20px" }}>
            <span>
              <DeleteProject
                auth={auth}
                pid={pid}
                project={project}
                history={history}
              />
              <Link to={`/edit/${pid}`}>{edit()}</Link>
              <UploadIMG project={project} projectID={pid} />
            </span>
          </div>
        </div>
      ) : (
        <span></span>
      )}{" "}
      {csvUrl === "" ? (
        <span></span>
      ) : (
        <a target="_blank" rel="noreferrer noopener" href={csvUrl}>
          <button
            className="btn-flat waves-effect waves-light"
            style={{ display: "inline" }}
          >
            Download the CSV Here
          </button>
        </a>
      )}
    </div>
  );
};

export default CSVCard;
