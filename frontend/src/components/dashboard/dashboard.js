import React, { Component } from "react";
// import Notifications from "./notifcations";
import ProjectList from "../projects/projectList/projectlist";
import SortForm from "./sortform";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Dashboard extends Component {
  state = {
    orderBy: "createdAt",
    limit: 8,
  };
  render() {
    const { auth } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    if (!auth.emailVerified) return <Redirect to={`/verify`} />;
    //if (refresh) return <Redirect to="/dashboard" />;
    return (
      <div className="dashboard container">
        <div className="row">
          <h1>
            <span className="purple-text">Explore </span>
          </h1>
          <h4 style={{ float: "left" }}>See what others are up to.</h4>
          <SortForm
            handleDropChange={(e) =>
              this.setState({
                orderBy: e.target.value,
              })
            }
            orderBy={this.state.orderBy}
          />
        </div>
        {/*<div className="row">
					<Notifications notifications={notifications} />
				</div>*/}
        <ProjectList orderBy={this.state.orderBy} limit={this.state.limit} />
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
