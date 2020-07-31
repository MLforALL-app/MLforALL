import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import {
  initializeCSVForProject
} from "../../../store/actions/projectActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../../../styling/createproject.css";

class UploadCSV extends Component {
  state = {
    csv: "",
    fileUploadMessage: "Waiting For File...",
    showError: false,
    errorText: "",
    drag: false,
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

    // this.props.uploadCSVtoStorage(
    //   this.state.csv,
    //   this.props.project,
    //   this.props.projectID
    // );

    // this.props.updateCsvData(
    //   this.state.csv,
    //   this.props.project,
    //   this.props.projectID,
    //   false 
    // );
  };

  // Prevents files from being downloaded when dragged into the screen
  dragOverHandler = (e) => {
    e.preventDefault();
  };

  dragEnterHandler = () => {
    console.log("entered");
    this.setState({ drag: true });
  };

  dragLeaveHandler = () => {
    console.log("left");
    this.setState({ drag: false });
  };

  // Passed into Guide to handle the event of clicking an example link
  clickHandler = (value) => () => {
    //case on value "which is name of file, to reference to storage"
    const {initializeCSVForProject, projectID} = this.props;
    initializeCSVForProject(null, value, projectID);
    // console.log("LOOK HERE", value);
  };

  render() {
    return (
      <div className="upload-csv">
        <div className="row" style={{ backgroundColor: "#eeeeee" }}>
          <div className="container">
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
            {/* Submit through computer form */}
            <form onSubmit={this.handleSubmit}>
              <div className="file-field input-field">
                <div
                  className="btn waves-effect waves-light z-depth-0"
                  style={{ borderRadius: "50px" }}
                >
                  <span>Browse</span>
                  <input
                    type="file"
                    id="csvName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="file-path-wrapper">
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
                className={this.state.drag ? "" : "dborder"}
                onDrop={this.dropHandler}
                onDragOver={this.dragOverHandler}
                onDragEnter={this.dragEnterHandler}
                onDragLeave={this.dragLeaveHandler}
                style={{ backgroundColor: "#F5F5F5", color: "#636B7F" }}
              >
                <br />
                {this.state.csv === "" ? (
                  <p className="center">
                    <div style={{ fontSize: 20 }}>
                      <strong>Choose a file </strong>or drag it here
                    </div>
                  </p>
                ) : (
                  <p className="center " style={{ fontSize: 20 }}>
                    <strong>File Uploaded</strong>
                  </p>
                )}
              </div>
              {/* this is the submit button */}
              <div className="input-field">
                <button
                  className="btn waves-effect waves-light z-depth-0"
                  style={{ borderRadius: "50px" }}
                >
                  {this.state.fileUploadMessage}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Guide clickHandle={this.clickHandler} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // uploadCSVtoStorage: (csv, project, id) =>
    //   dispatch(uploadCSVtoStorage(csv, project, id)),
    // updateCsvData: (csv, project, id) =>
    //   dispatch(updateCsvData(csv, project, id)),
    initializeCSVForProject: (csv, example, pid) => 
      dispatch(initializeCSVForProject(csv, example, pid)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCSV);
