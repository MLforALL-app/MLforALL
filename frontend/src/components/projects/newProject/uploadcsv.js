import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import {
  uploadCSVtoStorage,
  updateCsvData,
} from "../../../store/actions/projectActions";
import { Alert, AlertTitle } from "@material-ui/lab";
import "../../../styling/drag.css";

class UploadCSV extends Component {
  state = {
    csv: "",
    fileUploadMessage: "Waiting For File...",
    showError: false,
		errorText: "",
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

  getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  getFileExtensionDrop = (filename) => {
    return filename.split("/").pop();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.showError || this.state.csv === "") {
      return;
    }
    console.log(this.state.csv);
    this.props.uploadCSVtoStorage(
      this.state.csv,
      this.props.project,
      this.props.projectID
    );

    this.props.updateCsvData(
      this.state.csv,
      this.props.project,
      this.props.projectID
    );
  };

  dropHandler = (e) => {
    console.log(e);
    console.log(e.dataTransfer);
    console.log(e.dataTransfer.files[0]);
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

  dragOverHandler = (e) => {
		e.preventDefault();
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
            {/* This is the form */}
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
              <div
                id="drop_zone"
                onDrop={this.dropHandler}
								onDragOver={this.dragOverHandler}
								style={{backgroundColor: "#F5F5F5", color: "#636B7F"}}
              >
								<br />
								{(this.state.csv === "") ?
                (<p className="center" >
                  <div style={{ fontSize: 20 }}>
                    <strong>Choose a file </strong>or drag it here
                  </div>
                </p>) : this.state.fileName}
              </div>
              {/* this is just the submit button */}
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
        <Guide />
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
    uploadCSVtoStorage: (csv, project, id) =>
      dispatch(uploadCSVtoStorage(csv, project, id)),
    updateCsvData: (csv, project, id) =>
      dispatch(updateCsvData(csv, project, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadCSV);
