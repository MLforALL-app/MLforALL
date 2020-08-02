import React, { Component } from "react";
import Guide from "./guidingInfo";
import { connect } from "react-redux";
import { uploadImgtoStorage } from "../../../store/actions/projectActions";
import { Alert, AlertTitle } from "@material-ui/lab";

class UploadIMG extends Component {
  state = {
    img: "",
    fileUploadMessage: "Waiting For Image...",
    showError: false,
    errorText: "",
  };

  handleChange = (e) => {
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
    } else if (
      this.getFileExtension(file.name) !== "png" ||
      this.getFileExtension(file.name) !== "jpeg"
    ) {
      this.setState({
        fileUploadMessage: "Invalid File Type. Upload a JPEG or PNG Please.",
        errorText: "Invalid File Type",
        showError: true,
      });
    } else {
      this.setState({
        img: file,
        showError: false,
        fileUploadMessage: "Upload",
      });
    }
  };

  getFileExtension = (filename) => {
    return filename.split(".").pop();
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.showError || this.state.img === "") {
      return;
    }

    this.props.uploadImgtoStorage(
      this.state.img,
      this.props.project,
      this.props.projectID
    );
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
            {!this.state.showError && this.state.img !== "" ? (
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                <strong>Successful Image Upload</strong>
              </Alert>
            ) : (
              <span></span>
            )}

            <form onSubmit={this.handleSubmit}>
              <div className="file-field input-field">
                <div
                  className="btn waves-effect waves-light z-depth-0"
                  style={{ borderRadius: "50px" }}
                >
                  <span>Browse</span>
                  <input
                    type="file"
                    id="imgName"
                    onChange={this.handleChange}
                  />
                </div>
                <div className="file-path-wrapper">
                  <input
                    className="file-path validate"
                    type="text"
                    placeholder="Upload .jpeg/.png file"
                    accept="image/png, image/jpeg"
                  />
                </div>
              </div>
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
    uploadImgtoStorage: (img, project, id) =>
      dispatch(uploadImgtoStorage(img, project, id)),
    // updateImgData: (img, project, id) =>
    //   dispatch(updateImgData(img, project, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadIMG);
