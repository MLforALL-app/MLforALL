import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/layouts/Navbar";
import Dashboard from "./components/dashboard/dashboard";
import ProjectDetails from "./components/projects/projectdetails";
import SignIn from "./components/auth/Signin";
import SignUp from "./components/auth/Signup";
//import "./App.css";

function App() {
	return (
		<BrowserRouter>
			<div className="App">
				<Navbar />
				<Switch>
					<Route exact path="/" component={Dashboard} />
					<Route path="/project/:id" component={ProjectDetails} />
					<Route path="/signin" component={SignIn} />
					<Route path="/signup" component={SignUp} />
				</Switch>
			</div>
		</BrowserRouter>
	);
}

export default App;
