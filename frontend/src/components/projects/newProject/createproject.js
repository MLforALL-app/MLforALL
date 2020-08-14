import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject } from "../../../store/actions/projectActions";
import "../../../styling/createproject.css";

class CreateProject extends Component {
  state = {
    title: "",
    showWarning: false,
  };
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    if (this.state.title === "") {
      this.setState({ showWarning: true });
    } else {
      this.setState({ showWarning: false });
      this.props.createProject(this.state);
    }
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (!auth.emailVerified) return <Redirect to={`/verify`} />;
    return (
      <div className="create-project">
        <div className="row slider-row">
          <div
            className="container"
            style={{
              backgroundColor: "white",
              width: "100%",
            }}
          >
            <form onSubmit={this.handleSubmit} style={{ position: "relative" }}>
              {this.state.showWarning ? (
                <p style={{ color: "red" }}>Please Enter a Project Name</p>
              ) : (
                <p></p>
              )}
              <div className="input-field">
                <label htmlFor="title">Insert a title here!</label>
                <input
                  autoComplete="off"
                  type="text"
                  id="title"
                  onChange={this.handleChange}
                  style={{
                    width: "50%",
                    paddingRight: "200px",
                    position: "absolute",
                    left: 0,
                  }}
                />
                <button 
                  className="btn btn-sec waves-effect 
                  waves-light z-depth-0 begin-button">
                  Begin
                </button>
              </div>
            </form>
          </div>
        </div>
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
    createProject: (project) => dispatch(createProject(project)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
