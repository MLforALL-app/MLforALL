import React from "react";
import { NavLink } from "react-router-dom";
// import { Link } from "react-scroll";

function Signedoutlinks() {
  return (
    <ul className="right">
      <li>
        <NavLink to="/">
          <span className="purple-text">Home</span>
        </NavLink>{" "}
      </li>
      <li>
        <NavLink to="/about">
          <span className="purple-text">About Us</span>
        </NavLink>{" "}
      </li>
      <li>
        <NavLink id="nav-cta" to="/join">
          <button className="btn btn-sec waves-effect waves-light z-depth-0">
            Start Now
          </button>
        </NavLink>
      </li>
    </ul>
  );
}

export default Signedoutlinks;
