import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const MyProjects = (props) => {
  const { auth } = props;
  // Route Protection
  if (!auth.uid) return <Redirect to="/" />;
  if (!auth.emailVerified) return <Redirect to={`/verify`} />;
  return <Redirect to={`/user/${auth.uid}`} />;
};

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(MyProjects);
