import React, { Component } from "react";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
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

const Header = (biz) => {
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
          <h1 className="purple-text"> {biz ? biz.landing.tagline : ""}</h1>
          <h6>
            {" "}
            <p>{biz ? biz.landing.goal : ""}</p>{" "}
          </h6>
        </div>
        <div style={{ paddingTop: "3rem" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            <button className="btn btn-outline anchor-160 waves-effect waves-light z-depth-0">
              Sign Up
            </button>
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

const Land2 = (biz) => {
  return (
    <div className="row center">
      <h4>
        {" "}
        <br /> {biz ? biz.landing.intro : ""}
      </h4>
      <div
        className="col s0 m6 lp-header row-bg land-col"
        style={{ backgroundImage: `url(${img3})` }}
      >
        <div className="left-block container lp-text">
          <h4 className="purple-text">{biz ? biz.landing.lp2Head : ""}</h4>
          <h5>
            {biz ? biz.landing.lp2Text : ""}
            <br />
          </h5>
          <button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0">
            Create
          </button>
        </div>
      </div>

      <div
        className="col s0 m6 lp-header row-bg"
        style={{ backgroundImage: `url(${img4})` }}
      ></div>
    </div>
  );
};

const Land3 = (biz) => {
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
          <h4 className="purple-text">{biz ? biz.landing.lp3Head : ""}</h4>
          <h5>{biz ? biz.landing.lp3Text : ""}</h5>
        </div>
      </div>
    </div>
  );
};

const Land4 = (biz) => {
  return (
    <div className="row center">
      <div
        className="col s0 m6 lp-header row-bg land-col"
        style={{ backgroundImage: `url(${img7})` }}
      >
        <div className="left-block container lp-text">
          <h4 className="purple-text">{biz ? biz.landing.lp4Head : ""}</h4>
          <h5>{biz ? biz.landing.lp4Text : ""}</h5>
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

const Body = (biz) => {
  return (
    <div className="landing-container">
      {Land2(biz)}
      {Land3(biz)}
      {Land4(biz)}
    </div>
  );
};

class Landing extends Component {
  render() {
    const { auth, biz } = this.props;
    if (!auth.uid) {
      return (
        <div className="white-background-landing">
          {Header(biz)}
          <LearnMoreLine />
          <LearnMore />
          <Element name="Body" className="element">
            {Body(biz)}
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
    biz: state.firestore.data.business,
  };
};

// export default connect(mapStateToProps)(Landing);

export default compose(
  connect(mapStateToProps),
  firestoreConnect([{ collection: "business" }])
)(Landing);
