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
import EditProject from "./components/projects/newProject/editproject";
import ScrollToTop from "./components/layouts/scrollToTop";
import MainDoc from "./components/education/mainDoc";
import Lost from "./components/info/lost";

// import Footer from "./components/info/footer";
import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<ScrollToTop />
				<Switch>
					<Route exact path="/me/:uid" component={MyProjects} />
					<Route exact path="/dashboard" component={Dashboard} />
					<Route
						exact
						path="/project/:pid"
						component={ProjectDetails}
					/>
					<Route exact path="/edit/:pid" component={EditProject} />
					<Route
						exact
						path="/v/:pid"
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
}

export default App;
