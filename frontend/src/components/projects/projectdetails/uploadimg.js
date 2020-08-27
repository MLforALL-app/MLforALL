import React, { Component } from "react";
import { connect } from "react-redux";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { initializeIMGForProject } from "../../../store/actions/projectActions";
import { Alert, AlertTitle } from "@material-ui/lab";

class UploadIMG extends Component {
  state = {
    img: "",
    fileUploadMessage: "Waiting For Image...",
    showError: false,
    errorText: "",
    open: false,
  };

  // Event handlers to open and close the popup
  handleClickOpen = (e) => {
    this.setState({
      open: true,
      img: "",
      fileUploadMessage: "Waiting For Image...",
      showError: false,
      errorText: "",
    });
  };
  handleClose = (e) => {
    this.setState({ open: false });
  };

  //handles a selection of image from files
  handleChange = (e) => {
    if (!e.target.files[0]) {
      return;
    }
    let file = e.target.files[0];
    console.log("Got file", file);
    if (file.size > 50 * 1000000) {
      this.setState({
        showError: true,
        errorText: "Files above 50 Megabytes are not supported",
        fileUploadMessage: "File Too Large",
      });
    } else if (!this.validImageType(file["type"])) {
      this.setState({
        fileUploadMessage: "Invalid File Type. Upload a JPEG, PNG, JPG Please.",
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

  validImageType = (fileType) => {
    const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];
    return validImageTypes.includes(fileType);
  };

  //handles a confirmation of new photo
  handleSubmit = (e) => {
    console.log("submission");
    e.preventDefault();
    //if there is an error in state or no image, return
    if (this.state.showError || this.state.img === "") {
      return;
    }

    this.props.initializeIMGForProject(this.state.img, this.props.projectID);
    this.setState({ open: false });
  };

  render() {
    return (
      <span>
        <button
          className="btn btn-outline-edit anchor-160 waves-effect waves-light z-depth-0"
          style={{ display: "inline", margin: "7px" }}
          onClick={this.handleClickOpen}
        >
          <span className="pd_text3" style={{ color: "#FFFFFF" }}>
            Change Picture
          </span>
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Edit Your Picture</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Find an image with the extension .jpg or .png
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
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="btn-flat waves-effect waves-light"
              style={{ display: "inline", color: "red" }}
              onClick={this.handleClose}
            >
              Cancel
            </button>
            <form onSubmit={this.handleSubmit}>
              <div className="file-field input-field">
                <div
                  className="btn-flat waves-effect waves-light"
                  style={{ display: "inline", color: "green" }}
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
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              </div>
              <div className="input-field">
                <button
                  className="btn-flat waves-effect waves-light"
                  style={{ display: "inline", color: "green" }}
                >
                  {this.state.fileUploadMessage}
                </button>
              </div>
            </form>
          </DialogActions>
        </Dialog>
      </span>
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
    initializeIMGForProject: (img, id) =>
      dispatch(initializeIMGForProject(img, id)),
    // updateImgData: (img, project, id) =>
    //   dispatch(updateImgData(img, project, id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadIMG);
