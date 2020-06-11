import React, { Component } from "react";
import ProjectList from "../projects/projectlist";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";
import HelpBox from "../layouts/helpbox";

class UserProfile extends Component {
	render() {
		const { projects, auth, user, pageuid } = this.props;
		const poss = user
			? user.firstName + " " + user.lastName + "'s models"
			: "";
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		if (this.props.auth.uid === this.props.pageuid)
			return <Redirect to={`/me/${auth.uid}`} />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<h1>
						<span className="purple-text">
							{poss}
							<HelpBox
								header="My models"
								placement="right-start"
								desc="Click on the cards to view your classification models!"
							/>
						</span>
					</h1>
					<ProjectList projects={projects} uid={pageuid} />
					<div className="video center">
						<Link to="/create">
							<button className="btn btn-sec z-depth-0">
								Inspired? Click here to create your own!
							</button>
						</Link>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log("STATE", state);
	console.log("ownProps", ownProps);
	// need better way to do this
	const pageAuthor = ownProps.match.params.uid;
	const users = state.firestore.data.users;
	const user = users ? users[pageAuthor] : null;
	return {
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth,
		pageAuthor: ownProps.match.params.uid,
		user: user,
		pageuid: pageAuthor
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect([
		{ collection: "projects", orderBy: ["createdAt", "desc"] },
		{ collection: "users" }
	])
)(UserProfile);
