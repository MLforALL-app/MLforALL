import React, { Component } from "react";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import HelpBox from "../layouts/helpbox";
//import fetchMine from "./fetchmine";

class MyProjects extends Component {
	state = {
		orderBy: "createdAt",
		limit: 5,
		startAt: 0,
		direction: "asc"
	};
	render() {
		const { auth } = this.props;
		//const projects = fetchMine(auth.uid);
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<h1>
						<span className="purple-text">
							My models.{" "}
							<HelpBox
								header="My models"
								placement="right-start"
								desc="Click on the cards to view your classification models!"
							/>
						</span>
					</h1>
					<ProjectList
						orderBy={this.state.orderBy}
						limit={this.state.limit}
						direction={this.state.direction}
						startAt={this.state.startAt}
						uid={auth.uid}
					/>
					<div className="video center">
						<Link to="/create">
							<div className="btn btn-sec waves-effect waves-light z-depth-0">
								Click Here to Create More!
							</div>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		auth: state.firebase.auth
	};
};

export default connect(mapStateToProps)(MyProjects);
