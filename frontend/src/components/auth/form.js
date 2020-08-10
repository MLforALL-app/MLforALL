import React, { Component } from "react";
import { connect } from "react-redux";
import DraftsIcon from "@material-ui/icons/Drafts";
import MailIcon from "@material-ui/icons/Mail";
import { signUp, signIn } from "../../store/actions/authActions";

class EnterForm extends Component {
  // State to keep track of what user types
  state = {
    firstTime: true,
    email: "",
    password: "",
  };
  handleSwitch = (e) => {
    e.preventDefault();
    this.setState((prevState) => {
      return { ...prevState, firstTime: !prevState.firstTime };
    });
  };
  // eventHandler to update our state the way text has
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };
  // Call REDUX action signIn to sign user in given state
  handleSubmit = (first) => (e) => {
    e.preventDefault();
    // If its the first time someone's signing in, sign up
    const { signUp, signIn } = this.props;
    first ? signUp(this.state) : signIn(this.state);
  };
  // button for our auth flow
  ourButton = () => {
    return (
      <button
        id="my-mdl"
        className="btn mdl-button mdl-js-button mdl-button--raised firebaseui-idp-button firebaseui-id-idp-button"
      >
        <span style={{ color: "#fff" }} className="firebaseui-idp-icon-wrapper">
          {this.state.firstTime ? <MailIcon /> : <DraftsIcon />}
        </span>
        <span className="firebaseui-idp-text ">
          {this.state.firstTime ? "Join with Email" : "Log In with Email"}
        </span>
      </button>
    );
  };
  render() {
    // from props, retrieve authError and auth objects
    const { firstTime } = this.state;
    const { authError, children } = this.props;
    return (
      <div className="container" style={{ maxWidth: "700px" }}>
        <h4 className="purple-text"> {firstTime ? "Sign Up" : "Sign In"} </h4>
        <button
          className="btn-flat"
          onClick={this.handleSwitch}
          style={{ fontSize: "1rem", textDecoration: "underline" }}
        >
          {firstTime
            ? "Already a user? Click here to sign in!"
            : "Not signed up yet? Click here to join!"}
        </button>
        <form className="center" onSubmit={this.handleSubmit(firstTime)}>
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
            {this.ourButton()}
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
    signIn: (credentials) => dispatch(signIn(credentials)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EnterForm);
