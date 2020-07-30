import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../../../styling/createproject.css";
class BuildProject extends Component {
  // State to keep track of if our pop up is open
  state = {
    open: false,
    buildingText: "Building the Project",
    redirect: false,
    incomplete: "",
  };

  // Event handlers to open and close the popup
  handleClickOpen = (e) => {
    if (!this.props.projectComplete) {
      this.setState({
        incomplete: "Please Fill Out the Entire Model",
      });
      return;
    } else {
      this.setState({
        incomplete: "",
      });
    }
    this.setState({ open: true });
  };
  handleClose = (e) => {
    this.setState({ open: false });
  };
  // if we choose to delete, make a dispatch to REDUX
  handleBuild = (pid, auth, project, history) => {
    return () => {
      this.props.handleSubmit(null);
    };
  };

  handleProjectFail = (e) => {
    this.setState({
      redirect: true,
    });
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps !== this.props && this.props.buildFail) {
      this.setState({
        buildingText: "Uh Oh, the project failed building",
      });
    }
  };

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/myprofile" />;
    }
    return (
      <span>
        <button onClick={this.handleClickOpen} className="btn-large z-depth-0">
          Build the model!
        </button>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
          classes="card"
        >
          {this.props.submitLoad ? (
            <div>
              <DialogTitle id="alert-dialog-title" className="purple-text">
                {this.state.buildingText}
              </DialogTitle>
              {this.props.buildFail ? (
                <div className="row center">
                  <button
                    className="btn waves-effect waves-light z-depth-0"
                    onClick={this.handleProjectFail}
                  >
                    Abort Project{" "}
                  </button>
                </div>
              ) : (
                <div className="row center">
                  <CircularProgress />
                </div>
              )}
            </div>
          ) : (
            <div>
              <DialogTitle id="alert-dialog-title" className="purple-text">
                Is this the project you want to build
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  {this.props.getContent("")}
                </DialogContentText>
              </DialogContent>

              <DialogActions>
                <button
                  className="btn-flat waves-effect waves-light"
                  style={{ display: "inline", color: "#382980" }}
                  onClick={this.handleClose}
                >
                  No
                </button>
                <button
                  className="btn-flat waves-effect waves-light"
                  style={{ display: "inline", color: "#382980" }}
                  onClick={this.handleBuild()}
                >
                  Yes, Build It!
                </button>
              </DialogActions>
            </div>
          )}
        </Dialog>
        <div style={{ color: "#ff0000" }}>{this.state.incomplete}</div>
      </span>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    buildFail: state.project.buildFail,
    projectComplete: state.project.cWPFull,
  };
};

export default connect(mapStateToProps)(BuildProject);
