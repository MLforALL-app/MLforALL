import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { createProject } from "../../../store/actions/projectActions";

class CreateProject extends Component {
  state = {
    title: "",
    showWarning: false,
  };
  handleChange = (e) => {
    console.log("name of the project", e.target.value);
    this.setState({
      [e.target.id]: e.target.value,
    });
    console.log("look", this.state);
    // console.log("Here", [e.target.id]);
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
              backgroundColor: "#F5F5F5",
              width: "100%"
            }}
          >
            <form onSubmit={this.handleSubmit}>
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
                />
              </div>
              <div className="input-field">
                <button className="btn btn-sec waves-effect waves-light z-depth-0">
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
