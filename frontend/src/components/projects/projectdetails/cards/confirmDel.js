import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { deleteMLProject } from "../../../../store/actions/projectActions";
import { connect } from "react-redux";
// import { Redirect } from "react-router-dom";

// DELETE button in csvCard to handle deleting projects
class DeleteProject extends Component {
  // State to keep track of if our pop up is open
  state = {
    open: false,
  };

  // Event handlers to open and close the popup
  handleClickOpen = (e) => {
    this.setState({ open: true });
  };
  handleClose = (e) => {
    this.setState({ open: false });
  };
  // if we choose to delete, make a dispatch to REDUX
  handleDelete = (pid, auth, project, history) => {
    return () => {
      this.setState({ open: false });
      this.props.deleteMLProject(pid, auth.uid, project, false);
      history.push(`/myprofile`);
    };
  };

  render() {
    const { pid, auth, project, history } = this.props;
    return (
      <span>
        <button
          className="btn-flat waves-effect waves-light"
          style={{ display: "inline" }}
          onClick={this.handleClickOpen}
        >
          <span className="purple-text">Delete This Project</span>
        </button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Delete this model once and ml for all?
          </DialogTitle>
          <DialogContent style={{ maxWidth: "40rem" }}>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this absolutely awesome machine
              learning model for you and others to experiment with?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <button
              className="btn-flat waves-effect waves-light"
              style={{ display: "inline", color: "green" }}
              onClick={this.handleClose}
            >
              Keep It!
            </button>
            <button
              className="btn-flat waves-effect waves-light"
              style={{ display: "inline", color: "red" }}
              onClick={this.handleDelete(pid, auth, project, history)}
            >
              Delete Forever {" :("}
            </button>
          </DialogActions>
        </Dialog>
      </span>
    );
  }
}

// For this component, we want to pass in auth as a prop
// from the Redux state
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

// We want to associate a dispatch call to the project action deleteMLProject
const mapDispatchToProps = (dispatch) => {
  return {
    deleteMLProject: (id, auth, project, update) =>
      dispatch(deleteMLProject(id, auth, project, update)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProject);
