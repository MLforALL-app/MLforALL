import React, { Component } from "react";
import { connect } from "react-redux";
// Import images like this
import img1 from "../../pictures/landing/LP1.svg";
import img3 from "../../pictures/landing/LP3.svg";
import img4 from "../../pictures/landing/LP4.svg";
import img5 from "../../pictures/landing/LP5.svg";
import img6 from "../../pictures/landing/LP6.svg";
import img7 from "../../pictures/landing/LP7.svg";
import img8 from "../../pictures/landing/LP8.svg";
import img9 from "../../pictures/landing/LP9.svg";
// Import css files like this
import "../../styling/landing.css";
import "../../styling/features.css";
import SignUp from "../auth/Signup";
import { Element, Link } from "react-scroll";
import { Redirect } from "react-router-dom";

const LandSign = () => {
  return (
    <div
      className="row fullrow-bg"
      style={{ backgroundImage: `url(${img9})`, backgroundColor: "white" }}
    >
      <div className="container land land-sign" style={{ textAlign: "center" }}>
        <Element name="signup" className="element">
          <h2> Sign up now! </h2>
          <h5> Be a part of the community and start creating! </h5>
          <SignUp />
        </Element>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div
      className="row fullrow-bg "
      style={{ backgroundImage: `url(${img1})`, backgroundColor: "white" }}
    >
      <div
        className="container col s12 m4 offset-m4 lp-header land-col"
        style={{ textAlign: "center" }}
      >
        <div>
          <h1 className="purple-text"> MLforALL </h1>
          <h6>
            {" "}
            <p>
              {" "}
              Create, share, explore, and play with Machine Learning Models
              created by others.
            </p>{" "}
          </h6>
        </div>
        <div style={{ paddingTop: "3rem" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            <Link to="signup" transition={500} smooth={true}>
              <button className="btn btn-outline anchor-160 waves-effect waves-light z-depth-0">
                Sign Up
              </button>
            </Link>
            <div className="divider"></div>
            <button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0">
              Create
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

const Land2 = () => {
  return (
    <div className="row center">
      <h4>
        {" "}
        <br /> What can you do here?
      </h4>
      <div
        className="col s0 m6 lp-header row-bg land-col"
        style={{ backgroundImage: `url(${img3})` }}
      >
        <div className="left-block container lp-text">
          <h4 className="purple-text">
            Create your own Machine Learning Models!
          </h4>
          <h5>
            Be guided through a beginner-friendly process on how to create a
            Machine Learning Model.
            <br />
          </h5>
          <div style={{ paddingTop: "20px" }}>
            <button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0">
              Create
            </button>
          </div>
        </div>
      </div>

      <div
        className="col s0 m6 lp-header row-bg"
        style={{ backgroundImage: `url(${img4})` }}
      ></div>
    </div>
  );
};

const Land3 = () => {
  return (
    <div className="row center">
      <div
        className="col s0 m6 lp-header row-bg"
        style={{ backgroundImage: `url(${img5})` }}
      ></div>
      <div
        className="col s0 m6 lp-header row-bg land-col"
        style={{ backgroundImage: `url(${img6})` }}
      >
        <div className="left-block container">
          <h4 className="purple-text">
            Play around with other Machine Learning Models!
          </h4>
          <h5>Test out other people/s models and see how they perform!</h5>
        </div>
      </div>
    </div>
  );
};

const Land4 = () => {
  return (
    <div className="row center">
      <div
        className="col s0 m6 lp-header row-bg land-col"
        style={{ backgroundImage: `url(${img7})` }}
      >
        <div className="left-block container lp-text">
          <h4 className="purple-text">Explore and Discover new Models!</h4>
          <h5>
            Share your Machine Learning Model with the world, and view others as
            well
          </h5>
        </div>
      </div>
      <div
        className="col s0 m6 lp-header row-bg"
        style={{ backgroundImage: `url(${img8})` }}
      ></div>
    </div>
  );
};

const LearnMoreLine = () => {
  return (
    <Link to="Body" transition={500} smooth={true}>
      <hr className="lp-line" style={{ cursor: "pointer" }} />
    </Link>
  );
};

const LearnMore = () => {
  return (
    <Link to="Body" transition={500} smooth={true}>
      <p
        style={{
          textAlign: "center",
          margin: "0",
          color: "grey",
          cursor: "pointer",
        }}
      >
        Learn more
      </p>
      <p style={{ textAlign: "center", margin: "0" }}>
        <i
          className="arrow down"
          style={{
            border: "solid grey",
            borderWidth: "0 1.5px 1.5px 0",
            display: "inline-block",
            padding: "3px",
            transform: "rotate(45deg)",
            WebkitTransform: "rotate(45deg)",
            cursor: "pointer",
          }}
        ></i>
      </p>
    </Link>
  );
};

const Body = () => {
  return (
    <div className="landing-container">
      {Land2()}
      {Land3()}
      {Land4()}
    </div>
  );
};

class Landing extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return (
        <div className="white-background-landing">
          {Header()}
          <LearnMoreLine />
          <LearnMore />
          <Element name="Body" className="element">
            {Body()}
          </Element>
          <LearnMoreLine />
          <LandSign />
        </div>
      );
    } else {
      // Don't let people see landing page
      return <Redirect to="/dashboard" />;
    }
  }
}

// This lets us know if someone is logged in or not
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(Landing);
