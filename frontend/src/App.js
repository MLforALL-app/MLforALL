import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import MyProjects from "./components/dashboard/myprojects";
import ProjectDetails from "./components/projects/projectdetails/projectdetails";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
import CreateProject from "./components/projects/createproject";
import LandingPage from "./components/info/landing";
//import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Switch>
					<Route path="/me/:uid" component={MyProjects} />
					<Route path="/dashboard" component={Dashboard} />
					<Route path="/project/:id" component={ProjectDetails} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
					<Route path="/create" component={CreateProject} />
					<Route exact path="/" component={LandingPage} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
