import React, { Component } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import logo from "../../pictures/backgrounds/logo.png";
import createimg from "../../pictures/landing/LP4.svg";
import playimg from "../../pictures/landing/LP5.svg";
import exploreimg from "../../pictures/landing/LP8.svg";
import { updateUserInfo } from "../../store/actions/authActions";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

const introduce = (handleChange) => {
  return (
    <form className="center">
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
    <div>
      <h3>Hey there {first}</h3>
      On MLforALL you can:
      <ul>
        <li>Create</li>
        <li>Explore</li>
        <li>Play</li>
      </ul>
    </div>
  );
};

const create = () => {
  return (
    <div>
      <h5>Create Your Own Machine Learning Models</h5>
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
    <div>
      <h5>Play around with other Machine Learning Models</h5>
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
    <div>
      <h5>Explore and Discover new Models!</h5>
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
    <div>
      <h5>Get Started Now!</h5>
      <NavLink to="/create">
        <button
          className="btn btn-sec anchor waves-effect waves-light z-depth-0 lpButtons"
          onClick={() => update(uid, newUser)}
        >
          Enter MLforALL
        </button>
      </NavLink>
    </div>
  );
};

class Onboarding extends Component {
  // State to keep track of if our pop up is open
  state = {
    open: this.props.me && this.props.user === undefined,
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
          <h2 className="purple-text">Hi! Welcome to MLforALL</h2>
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
