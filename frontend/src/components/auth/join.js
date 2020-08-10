import React, { Component } from "react";
import { connect } from "react-redux";
import { signIn } from "../../store/actions/authActions";
import { Redirect, Link } from "react-router-dom";
import SignUp from "./form";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import authImg from "../../pictures/backgrounds/auth.svg";
import firebase from "../../config/fbConfig";
import "../../styling/auth.css";

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/myprofile",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
  ],
};

class Join extends Component {
  // State to keep track of what user types
  state = {
    email: "",
    password: "",
  };

  // eventHandler to update our state the way text has
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  // Call REDUX action signIn to sign user in given state
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.signIn(this.state);
  };

  render() {
    // from props, retrieve authError and auth objects
    const { authError, auth } = this.props;
    // route protection, shouldn't be able to sign in again
    if (auth.uid) return <Redirect to="/myprofile" />;
    return (
      <div className="signin">
        <div className="container center">
          <h2 className="purple-text">Get Started</h2>
          <h4>
            Log in or Sign Up to join our community and start creating machine
            learning models
          </h4>
          <SignUp>
            <StyledFirebaseAuth
              uiConfig={uiConfig}
              firebaseAuth={firebase.auth()}
            />
          </SignUp>
        </div>
        <img className="auth-image" alt="" src={authImg}></img>
      </div>
    );
  }
}

// Redux to associate state of this component with the props its passed in
const mapStateToProps = (state, ownProps) => {
  return { authError: state.auth.authError, auth: state.firebase.auth };
};

// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
  return {
    signIn: (creds) => dispatch(signIn(creds)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Join);
