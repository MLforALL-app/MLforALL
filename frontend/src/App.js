import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import MyProjects from "./components/dashboard/myprojects";
import ProjectDetails from "./components/projects/projectdetails/projectdetails";
import SignIn from "./components/auth/Signin";
import Forgot from "./components/auth/resetPass";
import VerifyEmailProject from "./components/auth/verify";
import CreateProjectContainer from "./components/projects/newProject/newprojectpage.js";
import JoeLand from "./components/info/joeLand";
import BuildProject from "./components/projects/newProject/buildproject";
import ScrollToTop from "./components/layouts/scrollToTop";

// import Footer from "./components/info/footer";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<ScrollToTop />
				<Switch>
					<Route path="/me/:uid" component={MyProjects} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/project/:pid" component={ProjectDetails} />
					<Route path="/edit/:pid" component={BuildProject} />
					<Route path="/v/:pid" component={VerifyEmailProject} />
					<Route path="/signin" component={SignIn} />
					<Route path="/forgot" component={Forgot} />
					<Route path="/create" component={CreateProjectContainer} />
					<Route exact path="/" component={JoeLand} />
				</Switch>
				{/*<Footer />*/}
			</div>
		</BrowserRouter>
	);
}

export default App;
