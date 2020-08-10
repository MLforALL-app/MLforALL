import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import EnterForm from "./form";
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

const Join = (props) => {
  // from props, retrieve authError and auth objects
  const { auth } = props;
  // route protection, shouldn't be able to sign in again
  if (auth.uid) return <Redirect to="/myprofile" />;
  return (
    <div className="signin">
      <div className="container center">
        <h2 className="purple-text">Get Started</h2>
        <h6>
          <i>
            Log in or Sign Up to join our community and start creating machine
            learning models.
          </i>
        </h6>
        <EnterForm>
          <StyledFirebaseAuth
            uiConfig={uiConfig}
            firebaseAuth={firebase.auth()}
          />
        </EnterForm>
      </div>
      <img className="auth-image" alt="" src={authImg}></img>
    </div>
  );
};

// Redux to associate state of this component with the props its passed in
const mapStateToProps = (state) => {
  return { authError: state.auth.authError, auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Join);
