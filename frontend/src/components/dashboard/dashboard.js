import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectList/projectlist";
import SortForm from "./sortform";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "../../styling/dashboard.css";

class Dashboard extends Component {
  state = {
    orderBy: "createdAt",
    limit: 8,
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (!auth.emailVerified) return <Redirect to={`/verify`} />;
    return (
      <div style={{ backgroundColor: "white" }}>
        <div className="dashboard container">
          <div className="row">
            <span className="title-dash"> See what others are up to.</span>
            <div
              className="subtitle-dash"
              style={{ float: "left", whiteSpace: "nowrap" }}
            >
              Explore, play, and share!
            </div>
          </div>
          <span>
            <SortForm
              handleDropChange={(e) =>
                this.setState({
                  orderBy: e.target.value,
                })
              }
              orderBy={this.state.orderBy}
            />
          </span>
          <br></br>
          <br></br>
          <hr></hr>
          <br></br>
          <div style={{ marginTop: "20px" }}>
            <ProjectList
              orderBy={this.state.orderBy}
              limit={this.state.limit}
            />
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

export default connect(mapStateToProps)(Dashboard);
