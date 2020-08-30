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
import { Redirect, NavLink } from "react-router-dom";
// import is browser
import { isBrowser } from "react-device-detect";
// import { CSSTransition } from "react-transition-group";

const showImg = (img, b) => {
  return isBrowser || b ? `url(${img})` : "";
};

const lpHeader = isBrowser ? " lp-header" : " lp-header-mobile";
const lpText = isBrowser ? " lp-text" : "";

const LandSign = () => {
  return (
    <div
      className="row fullrow-bg"
      style={{ backgroundImage: `url(${img9})`, backgroundColor: "white" }}
    >
      <div className="container land land-sign" style={{ textAlign: "center" }}>
        <Element name="signup" className="element">
          <h2
            className="purpleHeader"
            style={{ lineHeight: "41px", marginTop: "3em" }}
          >
            {" "}
            Sign up now!{" "}
          </h2>
          <h5 className="infoText">
            {" "}
            Be a part of the community and start creating!{" "}
          </h5>
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
      <div className="col s0 m3"></div>
      <div
        className={"container col s12 m6 land-col" + lpHeader}
        style={{ textAlign: "center" }}
      >
        <div>
          <h1 className="purple-text MLforAll1 center"> MLforALL </h1>
          <h6>
            {" "}
            <p className="MLforAll2 center" style={{ maxWidth: "590px" }}>
              {" "}
              Create, share, explore, and play with Machine Learning Models
              created by others.
            </p>{" "}
          </h6>
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <span style={{ whiteSpace: "nowrap" }}>
            <Link to="signup" transition={500} smooth={true}>
              <button className="btn btn-outline anchor-160 waves-effect waves-light z-depth-0 lpButtons ">
                Sign Up
              </button>
            </Link>
            <div className="divider"></div>
            <NavLink to="/signin">
              <button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0 lpButtons ">
                Create
              </button>
            </NavLink>
          </span>
        </div>
      </div>
      <div className="col s0 m3"></div>
    </div>
  );
};

const Land2 = () => {
  return (
    <div className="row center">
      <div className="WTD">
        <h4 className="center"> What can you do here?</h4>
      </div>
      <div
        className={`col s12 m6 row-bg land-col ${lpHeader}`}
        style={{ backgroundImage: showImg(img3) }}
      >
        <div className={`left-block container ${lpText}`}>
          <h4 className="purple-text purpleHeader">
            Create your own Machine Learning Models!
          </h4>
          <h5 className="infoText">
            Learn about and experiment with machine learning without coding
            experience in our guided process.
            <br />
          </h5>
          <div style={{ paddingTop: "30px" }}>
            <NavLink to="/signin">
              <button className="btn btn-sec anchor-160 waves-effect waves-light z-depth-0 lpButtons ">
                Create
              </button>
            </NavLink>
          </div>
        </div>
      </div>
      <div
        className={"col s12 m6 row-bg" + lpHeader}
        style={{ backgroundImage: showImg(img4, true) }}
      ></div>
    </div>
  );
};

const Land3 = () => {
  const landthree = [
    <div
      key="image"
      className={"col s12 m6 row-bg" + lpHeader}
      style={{ backgroundImage: showImg(img5, true) }}
    ></div>,
    <div
      key="text"
      className={"col s12 m6 row-bg land-col" + lpHeader}
      style={{ backgroundImage: showImg(img6) }}
    >
      <div className="left-block container">
        <h4 className="purple-text purpleHeader">
          Play around with other Machine Learning Models!
        </h4>
        <h5 className="infoText">
          Test out other people/s models and see how they perform!
        </h5>
      </div>
    </div>,
  ];
  return (
    <div className="row center">
      {isBrowser ? landthree : landthree.reverse()}
    </div>
  );
};

const Land4 = () => {
  return (
    <div className="row center">
      <div
        className={"col s12 m6 row-bg land-col" + lpHeader}
        style={{ backgroundImage: showImg(img7) }}
      >
        <div className={"left-block container" + lpText}>
          <h4 className="purple-text purpleHeader">
            Explore and Discover new Models!
          </h4>
          <h5 className="infoText">
            Share your Machine Learning Model with the world, and view others as
            well
          </h5>
        </div>
      </div>
      <div
        className={"col s12 m6 row-bg" + lpHeader}
        style={{ backgroundImage: showImg(img8, true) }}
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
