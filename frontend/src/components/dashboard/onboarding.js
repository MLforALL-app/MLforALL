import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import logo from "../../pictures/backgrounds/logo.png";
import createimg from "../../pictures/landing/LP4.svg";
import playimg from "../../pictures/landing/LP5.svg";
import exploreimg from "../../pictures/landing/LP8.svg";
import martial from "../../pictures/backgrounds/temporary.png";
import { updateUserInfo } from "../../store/actions/authActions";
import { connect } from "react-redux";

const introduce = (handleChange) => {
  return (
    <form className="center onboard-comp">
      <h2 className="purple-text">Hi! Welcome to MLforALL</h2>
      <img className="onboard-mascot" src={martial} alt="" />
      <h5> My name is Martial, and I'll be your guide. What's your name?</h5>
      <div className="input-field">
        <label htmlFor="firstName">First Name</label>
        <input type="text" id="firstName" onChange={handleChange} />
      </div>
      <div className="input-field">
        <label htmlFor="lastName">Last Name</label>
        <input type="text" id="lastName" onChange={handleChange} />
      </div>
    </form>
  );
};

const overview = (first, last) => {
  return (
    <div className="onboard-comp" style={{ textAlign: "left !important" }}>
      <h2 className="purple-text">
        Hey there {first} {last}
      </h2>
      <div className="container">
        <p className="option-lists">
          <strong>
            MLforALL is machine learning made easier. Here, you'll be able to{" "}
          </strong>
          create
          <strong> machine learning models without coding experience, </strong>
          play,{" "}
          <strong>
            test, and experiment with your models using our in-house prediction
            format, and{" "}
          </strong>
          explore<strong> other people's models in our community.</strong>
        </p>
        <img className="onboard-mascot" src={martial} alt="" />
      </div>
    </div>
  );
};

const create = () => {
  return (
    <div className="onboard-comp">
      <h2 className="purple-text">Create</h2>
      <div className="container" style={{ marginBottom: "-5rem" }}>
        <h5>
          Follow our step by step process to make a machine learning model
          without experience.
        </h5>
      </div>
      <img
        src={createimg}
        alt="Create Your Own Machine Learning Models"
        className="onboard-image"
      />
    </div>
  );
};

const play = () => {
  return (
    <div className="onboard-comp">
      <h2 className="purple-text">Play</h2>
      <div className="container" style={{ marginBottom: "-1rem" }}>
        <h5>
          Input values into sliders and get immediate results on what your model
          predicts!
        </h5>
      </div>
      <img
        src={playimg}
        alt="Play around with other Machine Learning Models"
        className="onboard-image"
      />
    </div>
  );
};

const explore = () => {
  return (
    <div className="onboard-comp">
      <h2 className="purple-text">Explore</h2>
      <div className="container">
        <h5>
          Access a whole community of machine learning enthusiasts to discover
          and share your models with.
        </h5>
      </div>
      <img
        src={exploreimg}
        alt="Explore and Discover new Models!"
        className="onboard-image"
      />
    </div>
  );
};

const cta = (update, uid, newUser) => {
  return (
    <div className="onboard-comp">
      <h2 className="purple-text">Get Started Now!</h2>
      <div className="container">
        {" "}
        <h5>
          Make sure you've entered your name before you get started. Hope you're
          excited! I'll see you there.
        </h5>
        <img
          className="onboard-mascot"
          src={martial}
          alt=""
          style={{ marginBottom: "3rem" }}
        />
      </div>
      <button
        className="btn btn-sec anchor waves-effect waves-light z-depth-0 lpButtons"
        onClick={() => {
          if (newUser.firstName !== "" && newUser.lastName !== "") {
            update(uid, newUser);
          }
        }}
      >
        Enter MLforALL
      </button>
    </div>
  );
};

class Onboarding extends Component {
  // State to keep track of if our pop up is open
  state = {
    open: false,
    firstName: "",
    lastName: "",
    index: 0,
  };

  componentDidUpdate(prev) {
    if (this.props !== prev) {
      this.setState({ open: this.props.me && this.props.user === undefined });
    }
  }

  // Event handler to increment array index
  handleClickNav = (inc, complist) => (e) => {
    this.setState((prevState) => {
      return {
        index: Math.abs(prevState.index + inc) % complist.length,
      };
    });
  };
  // eventHandler to update our state the way text has
  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  MakeButton = ({ children, color, inc, complist }) => {
    return (
      <button
        className="btn-flat waves-effect waves-light"
        style={{ display: "inline", color: { color } }}
        onClick={this.handleClickNav(inc, complist)}
      >
        {children}
      </button>
    );
  };

  render() {
    const { firstName, lastName, open, index } = this.state;
    const { auth, updateUserInfo } = this.props;
    const complist = [
      introduce(this.handleChange),
      overview(firstName, lastName),
      create(),
      play(),
      explore(),
      cta(updateUserInfo, auth.uid, { firstName, lastName }),
    ];
    const MakeButton = this.MakeButton;
    return (
      <Dialog
        open={open}
        onClose={this.handleClose}
        className="dialog-onboarding"
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent className="center">
          <img
            src={logo}
            alt=""
            style={{ width: "7rem", marginBottom: "-2rem" }}
          />
          {complist[index]}
        </DialogContent>
        <DialogActions className="center">
          <MakeButton color="purple" inc={-1} complist={complist}>
            Back
          </MakeButton>
          <MakeButton color="purple" inc={1} complist={complist}>
            Next
          </MakeButton>
        </DialogActions>
      </Dialog>
    );
  }
}

// For this component, we want to pass in auth as a prop
// from the Redux state
const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

// We want to associate a dispatch call to the project action deleteMLProject
const mapDispatchToProps = (dispatch) => {
  return {
    updateUserInfo: (uid, newUser) => dispatch(updateUserInfo(uid, newUser)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Onboarding);
