import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { motion } from "framer-motion";
import { sendVerify } from "../../store/actions/authActions";
import authImg from "../../pictures/backgrounds/auth.svg";

class VerifyEmailProject extends Component {
  // pid = unique projID, auth = firebase auth object
  handleClick = () => {
    this.props.sendVerify();
  };
  button = () => {
    if (this.props.auth.emailVerified) {
      return <Redirect to="myprofile" />;
    } else {
      return (
        <React.Fragment>
          <p className="grey-text">
            It may take a few minutes for the email to send.{" "}
          </p>
          <p className="grey-text">Still don't see the email? </p>
          <button className="btn z-depth-0 anchor" onClick={this.handleClick}>
            Resend Email
          </button>
        </React.Fragment>
      );
    }
  };
  render() {
    const { auth, sentMsg } = this.props;
    if (!auth.uid) return <Redirect to="/" />;
    const message = (msg) => {
      if (msg === "noo") {
        return <p className="red-text">Email could not be sent</p>;
      } else if (msg === "yay") {
        return <p className="green-text">Email Sent!</p>;
      } else {
        return <p>{msg}</p>;
      }
    };
    return (
      <motion.div
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        className="verify"
      >
        <div className="container center">
          <h1 className="purple-text">Please verify your email</h1>
          <h5>
            You're almost there! We sent an email to <b>{auth.email}</b>
          </h5>
          <div className="header-subrow"> {this.button()}</div>
          <p> After you verify, please refresh this page.</p>
          <div className="header-subrow">{message(sentMsg)}</div>
        </div>
        <img className="auth-image" alt="" src={authImg}></img>
      </motion.div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    sentMsg: state.auth.sent.verify,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    sendVerify: () => dispatch(sendVerify()),
  };
};

export default compose(connect(mapStateToProps, mapDispatchToProps))(
  VerifyEmailProject
);
