import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import { signUp, signIn } from "../../store/actions/authActions";

class SignUp extends Component {
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
    this.props.signUp(this.state);
  };

  render() {
    // from props, retrieve authError and auth objects
    const { authError, signUp, children } = this.props;
    return (
      <div
        className="container"
        style={{ paddingTop: "2rem", maxWidth: "700px" }}
      >
        <form className="center" onSubmit={this.handleSubmit}>
          <div className="input-field">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" onChange={this.handleChange} />
          </div>
          <div className="input-field">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" onChange={this.handleChange} />
          </div>

          <br />
          <div className="center">
            <button
              id="my-mdl"
              className="btn mdl-button mdl-js-button mdl-button--raised firebaseui-idp-button firebaseui-id-idp-button"
              style={{}}
            >
              <span
                style={{ color: "#fff" }}
                className="firebaseui-idp-icon-wrapper"
              >
                {signUp ? <MailIcon /> : <DraftsIcon />}
              </span>
              <span className="firebaseui-idp-text ">
                {signUp ? "Join with Email" : "Log In with Email"}
              </span>
            </button>
            {children}
            <div className="red-text center">
              {authError ? <p>{authError}</p> : null}
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth, authError: state.auth.authError };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signUp: (newUser) => dispatch(signUp(newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
