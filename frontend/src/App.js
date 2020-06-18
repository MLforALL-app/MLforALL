import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { isBrowser } from "react-device-detect";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import MyProjects from "./components/dashboard/myprojects";
import UserProfile from "./components/dashboard/userProfile";
import ProjectDetails from "./components/projects/projectdetails/projectdetails";
import SignIn from "./components/auth/Signin";
import Forgot from "./components/auth/resetPass";
import VerifyEmailProject from "./components/auth/verify";
import CreateProjectContainer from "./components/projects/newProject/newprojectpage.js";
import JoeLand from "./components/info/joeLand";
import BuildProject from "./components/projects/newProject/buildproject";
import ScrollToTop from "./components/layouts/scrollToTop";
import MainDoc from "./components/education/mainDoc";
import Lost from "./components/info/lost";
import Mobile from "./components/info/mobile";

// import Footer from "./components/info/footer";
import "./App.css";

function App() {
	if (isBrowser) {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<ScrollToTop />
					<Switch>
						<Route
							exact
							path="/user/:uid"
							component={UserProfile}
						/>
						<Route exact path="/myprofile" component={MyProjects} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route
							exact
							path="/project/:pid"
							component={ProjectDetails}
						/>
						<Route
							exact
							path="/edit/:pid"
							component={BuildProject}
						/>
						<Route
							exact
							path="/verify"
							component={VerifyEmailProject}
						/>
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/forgot" component={Forgot} />
						<Route
							exact
							path="/create"
							component={CreateProjectContainer}
						/>
						<Route exact path="/edu" component={MainDoc} />
						<Route exact path="/" component={JoeLand} />
						<Route component={Lost} />
					</Switch>
					{/*<Footer />*/}
				</div>
			</BrowserRouter>
		);
	} else {
		return <Mobile />;
	}
}

export default App;
