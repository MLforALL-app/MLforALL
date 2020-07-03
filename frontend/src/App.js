import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { isBrowser } from "react-device-detect";
// Page layout
import Navbar from "./components/layouts/Navbar";
import SignIn from "./components/auth/Signin";
import Forgot from "./components/auth/resetPass";
import ScrollToTop from "./components/layouts/scrollToTop";
import Lost from "./components/info/lost";
import Mobile from "./components/info/mobile";
import GHPages from "./components/info/ghpages";
import VerifyEmailProject from "./components/auth/verify";
// Landing page
import Landing from "./components/info/landing";
import About from "./components/info/about";
// Dashboard related / showing projects
import Dashboard from "./components/dashboard/dashboard";
import MyProjects from "./components/dashboard/myprojects";
import UserProfile from "./components/dashboard/userProfile";
// Project detail page
import ProjectDetails from "./components/projects/projectdetails/projectdetails";
// Creating projects
import CreateProjectContainer from "./components/projects/newProject/newprojectpage.js";
import EditProject from "./components/projects/newProject/editproject";
// help page
import MainDoc from "./components/education/mainDoc";
import "./App.css";

function App() {
	if (isBrowser) {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<ScrollToTop />
					<Switch>
						<Route exact path="/user/:uid" component={UserProfile} />
						<Route exact path="/myprofile" component={MyProjects} />
						<Route exact path="/dashboard" component={Dashboard} />
						<Route exact path="/project/:pid" component={ProjectDetails} />
						<Route exact path="/edit/:pid" component={EditProject} />
						<Route exact path="/forgot" component={Forgot} />
						<Route exact path="/create" component={CreateProjectContainer} />
						<Route exact path="/help" component={MainDoc} />
						<Route exact path="/about" component={About} />
						<Route exact path="/" component={Landing} />
						<Route path="/MLforAll" component={GHPages} />
						<Route component={Lost} />
					</Switch>
					{/*<Footer />*/}
				</div>
			</BrowserRouter>
		);
	} else {
		return (
			<BrowserRouter>
				<div className="App">
					<Navbar />
					<ScrollToTop />
					<Switch>
						<Route exact path="/verify" component={VerifyEmailProject} />
						<Route exact path="/forgot" component={Forgot} />
						<Route exact path="/signin" component={SignIn} />
						<Route exact path="/about" component={About} />
						<Route exact path="/" component={Landing} />
						<Route path="/MLforAll" component={GHPages} />
						<Route component={Mobile} />
					</Switch>
				</div>
			</BrowserRouter>
		);
	}
}

export default App;
