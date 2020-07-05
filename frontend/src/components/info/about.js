import React, { Component } from "react";
import { connect } from "react-redux";
import davImg from "../../pictures/headshots/davis.jpg";
import joeImg from "../../pictures/headshots/joe.jpeg";
import lenImg from "../../pictures/headshots/len.JPG";
import maxImg from "../../pictures/headshots/max.jpg";
import meghaImg from "../../pictures/headshots/megha.jpg";
import rongImg from "../../pictures/headshots/rong.jpg";
import img1 from "../../pictures/about/ausvg1.svg";
import img3 from "../../pictures/about/ausvg3.svg";
import img7 from "../../pictures/about/ausvg7.svg";
import "../../styling/landing.css";
import "../../styling/about.css";
import SignUp from "../auth/Signup";
import { Element, Link } from "react-scroll";
import { Redirect } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <div className="row center">
        <div className="col s0 m3"></div>
        <div className="col s12 m6 container ap-header">
          <div>
            <h1 className="purple-text abt">About Us</h1>
            <p>Learn more about the team.</p>
          </div>
        </div>
        <div className="col s0 m3"></div>
      </div>

      <div className="row center aplearn">
        <Link to="signup" transition={500} smooth={true}>
          <hr className="ap-line" />
        </Link>
      </div>
    </div>
  );
};

const OurGoal = () => {
  return (
		<div
			className="row img-row"
			style={{ backgroundImage: `url(${img3})`, backgroundColor: "white" }}
		>
			<div className="row center ap2">
				<div className="col s0 m3"></div>
				<div className="col s12 m6">
					<br /> <br /> <br /> <br /> <br /> <br />
					<h4 className="purple-text boldText">Our Goal</h4>
					<br />
					<p>
							MLforALL is a platform designed by four ambitious students, Davis,
							Joseph, Len, and Max seeking to spread the excitement behind
							machine learning models to people from all kinds of backgrounds.
							MLforALL simplifies the math and the small details and grants you
							freedom to make observations, draw conclusions, and create
							visualizations about data.
					</p>
				</div>
				<div className="col s0 m3"></div>
			</div>
		</div>
	);
};


const WWA = () => {
  return (
		<div
			className="row img-row"
			style={{ backgroundImage: `url(${img3})`, backgroundColor: "white" }}
		>
			<div className="row center ap2">
				<div className="col s0 m3"></div>
				<div className="col s12 m6">
					<br /> <br /> <br /> <br /> <br /> <br />
					<h4 className="purple-text boldText">Who We Are</h4>
					<br />
					<p>
						Davis, Joseph, Len, and Max are from all different areas of
						studies, places of the world, and walks of life. But what brings
						them together is their shared interest in educating people about
						topics they're passionate about.
						<strong> #MyHeartIsInTheWork</strong>
					</p>
				</div>
				<div className="col s0 m3"></div>
			</div>
		</div>
  );
};

const team = [
  {
    name: "Davis Wojnovich",
    title: "Data Science Lead",
    link: "https://www.linkedin.com/in/davis-wojnovich-560740165/",
    img: davImg,
  },
  {
    name: "Joseph Kim",
    title: "UI Design Lead",
    link: "https://www.linkedin.com/in/josephkimdesign/",
    img: joeImg,
  },
  {
    name: "Len Huang",
    title: "Agile / Tech Lead",
    link: "https://www.linkedin.com/in/len-huang/",
    img: lenImg,
  },
  {
    name: "Max Hirsch",
    title: "Machine Learning Lead",
    link: "https://www.linkedin.com/in/max-hirsch/",
    img: maxImg,
  },
  {
    name: "Megha Jain",
    title: "Software Engineer",
    link: "https://mlforall.xyz",
    img: meghaImg,
  },
  {
    name: "Rong Feng Ye",
    title: "Software Engineer",
    link: "https://www.linkedin.com/in/rong-ye/",
    img: rongImg,
  },
];

const makePicture = (name, title, link, picture) => {
  return (
    <div key={name} style={{ padding: "1.8rem" }} className="center">
      <a target="_blank" rel="noreferrer noopener" href={link}>
        <img className="headshot-img" src={picture} alt="Dav" />
      </a>
      <h5>{name}</h5>
      <h6>{title}</h6>
    </div>
  );
};

const headshot = () => {
  return (
    <div className="center container">
      <h4 className="purple-text">Meet Our Team</h4>
      <div className="land-row">
        {team.map((p) => makePicture(p.name, p.title, p.link, p.img))}
      </div>
    </div>
  );
};

const landSign = () => {
  return (
    <div>
      <div
        className="row img-row"
        style={{ backgroundImage: `url(${img7})`, backgroundColor: "white" }}
      >
        <div className="row center">
          <div className="container ap-touch center">
            <Element name="signup" className="element">
              <span>
                <h4 className="purple-text">Get In Touch!</h4>
              </span>
              <span>
                <p className="p-signup">
                  Please fill out this form and we will be in touch as soon as
                  possible!
                </p>
              </span>
              <div className="container land-row">
                <SignUp className="center" />
              </div>
            </Element>
          </div>
        </div>
      </div>
    </div>
  );
};

class About extends Component {
  render() {
    const { auth } = this.props;
    if (!auth.uid) {
      return (
        <div className="white-background-landing">
          <Header />
          <OurGoal />
          <WWA />
          {headshot()}
          {landSign()}
        </div>
      );
    } else {
      // Don't let people see landing page
      return <Redirect to="/dashboard" />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps)(About);
