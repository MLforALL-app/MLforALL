import React, { Component } from "react";
import ProjectList from "../projects/projectList/projectlist";
import projectSource from "../../config/collection";
import SortForm from "./sortform";
import Onboarding from "./onboarding";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

class UserProfile extends Component {
  state = {
    orderBy: "createdAt",
    limit: 8,
    me: this.props.auth.uid === this.props.pageuid,
  };
  render() {
    const { auth, user, pageuid } = this.props;
    const { orderBy, limit, me } = this.state;
    var poss = "";
    var tagline = "";
    var cta = "";
    if (me) {
      poss = "My models.";
      tagline = "Your central hub.";
      cta = "Click here to get started!";
    } else {
      poss = user ? user.firstName + " " + user.lastName + "'s models." : "";
      tagline = "View other people's models.";
      cta = "Want to make models like these? Click here!";
    }
    // Route Protection
    if (!auth.uid) return <Redirect to="/" />;
    if (!auth.emailVerified) return <Redirect to={`/verify`} />;
    return (
      <div>
        <div className="dashboard container">
          <div className="row">
            <h1>
              <span className="purple-text">{poss}</span>
            </h1>
            <SortForm
              handleDropChange={(e) =>
                this.setState({
                  orderBy: e.target.value,
                })
              }
              orderBy={this.state.orderBy}
              me={me}
            />
            <h4 style={{ float: "left" }}>{tagline}</h4>
          </div>
          <ProjectList orderBy={orderBy} limit={limit} uid={pageuid} />
          <div className="center">
            <Link to="/create">
              <button className="btn btn-sec z-depth-0">{cta}</button>
            </Link>
            <Onboarding me={me} user={user} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  // need better way to do this
  const pageAuthor = ownProps.match.params.uid;
  const users = state.firestore.data.users;
  const user = users ? users[pageAuthor] : null;
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth,
    pageAuthor: ownProps.match.params.uid,
    user: user,
    pageuid: pageAuthor,
  };
};

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: projectSource, orderBy: ["createdAt", "desc"] },
    { collection: "users" },
  ])
)(UserProfile);
