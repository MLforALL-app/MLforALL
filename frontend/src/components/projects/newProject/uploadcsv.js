import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import { initializeCSVForProject } from "../../../store/actions/projectActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../../../styling/createproject.css";
import searchPic from "../../../pictures/project/search.png";
import uploadPic from "../../../pictures/project/upload.png";

var BoxColor = "#F5F5F5";

class UploadCSV extends Component {
  state = {
    csv: "",
    stage: 0,
    fileUploadMessage: "Waiting For File...",
    showError: false,
    errorText: "",
    // drag: false,
  };

  handleChange = (e) => {
    // e.preventDefault();
    if (!e.target.files[0]) {
      return;
    }
    let file = e.target.files[0];
    if (file.size > 50 * 1000000) {
      this.setState({
        showError: true,
        errorText: "Files above 50 Megabytes are not supported",
        fileUploadMessage: "File Too Large",
      });
    } else if (this.getFileExtension(file.name) !== "csv") {
      this.setState({
        fileUploadMessage: "Invalid File Type. Upload a CSV Please.",
        errorText: "Invalid File Type",
        showError: true,
      });
    } else {
      this.setState({
        csv: file,
        showError: false,
        fileUploadMessage: "Upload",
      });
    }
  };

  // The 'handleSubmit' for drag and dropped files
  dropHandler = (e) => {
    e.preventDefault();
    // this.setState({ drag: false });
    BoxColor = "#F5F5F5";
    if (!e.dataTransfer.files[0]) {
      return;
    }
    let file = e.dataTransfer.files[0];
    if (file.size > 50 * 1000000) {
      this.setState({
        showError: true,
        errorText: "Files above 50 Megabytes are not supported",
        fileUploadMessage: "File Too Large",
      });
    } else if (
      this.getFileExtensionDrop(e.dataTransfer.items[0].type) !== "csv"
    ) {
      this.setState({
        fileUploadMessage: "Invalid File Type. Upload a CSV Please.",
        errorText: "Invalid File Type",
        showError: true,
      });
    } else {
      this.setState({
        csv: file,
        showError: false,
        fileUploadMessage: "Upload",
      });
    }
  };

  getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  // dragged files are within the event differently
  getFileExtensionDrop = (filename) => {
    return filename.split("/").pop();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.showError || this.state.csv === "") {
      return;
    }
    //case on whether we need to put an example into storage

    this.props.initializeCSVForProject(
      this.state.csv,
      "",
      this.props.projectID
    );
  };

  // Prevents files from being downloaded when dragged into the screen
  dragOverHandler = (e) => {
    e.preventDefault();
    // this.setState({ drag: true });
    BoxColor = "#E3E1E1";
    console.log("dragOver", BoxColor);
  };

  dragEnterHandler = () => {
    // this.setState({ drag: true });
    BoxColor = "#E3E1E1";
    console.log("dragenter", BoxColor);
  };

  dragLeaveHandler = () => {
    // this.setState({ drag: false });
    BoxColor = "#F5F5F5";
    console.log("dragleave", BoxColor);
  };

  // Passed into Guide to handle the event of clicking an example link
  clickHandler = (value) => () => {
    //case on value "which is name of file, to reference to storage"
    const { initializeCSVForProject, projectID } = this.props;
    initializeCSVForProject(null, value, projectID);
  };

  setZerothState = () => {
    this.setState({
      stage: 0,
    });
  };

  setFirstState = () => {
    this.setState({
      stage: 1,
    });
  };

  setSecondState = () => {
    this.setState({
      stage: 2,
    });
  };

  backState = () => {
    this.setStage({
      stage: this.state.stage - 1,
    });
  };

  backButton = () => {
    return (
      <div>
        <button
          className="btn btn-sec waves-effect waves-light z-depth-0 begin-button"
          onClick={this.backState}
        >
          Back
        </button>
      </div>
    );
  };

  uploadButton = () => {
    return (
      <div>
        <button
          className="btn btn-outline anchor-160 waves-effect waves-light z-depth-0"
          onClick={this.setSecondState}
        >
          Upload CSV
        </button>
      </div>
    );
  };

  zerothStage = () => {
    return (
      <div style={{ minHeight: "85vh" }}>
        <div className="row container center">
          <h1>
            <span className="purple-text">Choose Your Dataset</span>
          </h1>
        </div>
        <div className="row center">
          <p className="choose-statement">Please select one:</p>
          <div className="col s6 m6">
            <button
              className="choose-button"
              style={{
                backgroundImage: `url(${searchPic})`,
                right: "57%",
              }}
              onClick={this.setFirstState}
            >
              <span className="purple-text center button-text">
                Browse library
              </span>
            </button>
          </div>
          <div className="col s6 m6">
            <button
              className="choose-button"
              style={{
                backgroundImage: `url(${uploadPic})`,
                left: "57%",
              }}
              onClick={this.setSecondState}
            >
              <span className="purple-text center button-text">
                Upload file
              </span>
            </button>
          </div>
        </div>
        <div className="row center" style={{ marginTop: "24vw" }}>
          <div className="col s6 m6">
            <span className="button-desc" style={{ left: "17%" }}>
              Browse <strong>and</strong> select <strong>existing CSVs</strong>
            </span>
          </div>
          <div className="col s6 m6">
            <span className="button-desc" style={{ right: "17%" }}>
              Upload <strong>your own CSVs</strong>
            </span>
          </div>
        </div>
      </div>
    );
  };

  browseStage = () => {
    return (
      <div>
        <div className="row container center">
          <h1 className="purple-text browse-header">
            Try some of our datasets!
          </h1>
          <span className="browseP">
            We have gathered fun datasets for you to experiment with:
          </span>
          <Guide clickHandle={this.clickHandler} />
        </div>
        <div className="row container center">{this.uploadButton()}</div>
      </div>
    );
  };

  uploadStage = () => {
    return (
      <div>
        <div className="row container center">
          <h1>
            <span className="purple-text">Upload your data file</span>
          </h1>
          <p className="choose-statement">File must be a CSV and under 50MB</p>
          {this.state.showError ? (
            <Alert severity="error">
              <AlertTitle>Error</AlertTitle>
              <strong>{this.state.errorText}</strong>
            </Alert>
          ) : (
            <span></span>
          )}
          {!this.state.showError && this.state.csv !== "" ? (
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <strong>Successful CSV Upload</strong>
            </Alert>
          ) : (
            <span></span>
          )}
          <br />
          <div className="new-dropBox center">
            <form
              onSubmit={this.handleSubmit}
              style={{ padding: "0", height: "100%" }}
            >
              <div className="file-field input-field">
                <div
                  className="btn waves-effect waves-light z-depth-0"
                  style={{
                    borderRadius: "50px",
                    position: "absolute",
                    top: "27vw",
                  }}
                >
                  <span>Browse</span>
                  <input
                    type="file"
                    id="csvName"
                    onChange={this.handleChange}
                  />
                </div>
                <div
                  className="file-path-wrapper"
                  style={{ position: "absolute", left: "100px", top: "27vw" }}
                >
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="Upload .csv file"
                    accept=".csv"
                  />
                </div>
              </div>
              {/* Drag and Drop box */}
              <div
                // finish making conditional rendering when file is dragged over
                id="drop_zone"
                onDrop={this.dropHandler}
                onDragOver={this.dragOverHandler}
                style={{
                  color: "#636B7F",
                  backgroundImage: `url(${uploadPic})`,
                }}
              >
                <br />
                {this.state.csv === "" ? (
                  <p className="center dropzone-text">
                    <strong>Choose a file </strong>or drag it here
                  </p>
                ) : (
                  <p
                    className="center dropzone-text"
                    style={{ position: "absolute", right: "8vw" }}
                  >
                    <strong>File Uploaded</strong>
                  </p>
                )}
              </div>
              {/* this is the submit button */}
              <div className="input-field">
                <button
                  className="btn waves-effect waves-light z-depth-0"
                  style={{ borderRadius: "50px", marginTop: "10vw" }}
                >
                  {this.state.fileUploadMessage}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.stage === 0) return this.zerothStage();
    else if (this.state.stage === 1) return this.browseStage();
    else return this.uploadStage();
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    initializeCSVForProject: (csv, example, pid) =>
      dispatch(initializeCSVForProject(csv, example, pid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCSV);
