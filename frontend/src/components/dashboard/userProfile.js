import React, { Component } from "react";
import ProjectList from "../projects/projectList/projectlist";
import SortForm from "./sortform";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { Redirect, Link } from "react-router-dom";

class UserProfile extends Component {
	state = {
		orderBy: "createdAt",
		limit: 8
	};
	render() {
		const { auth, user, pageuid } = this.props;
		const { orderBy, limit } = this.state;
		const poss = user
			? user.firstName + " " + user.lastName + "'s models"
			: "";
		// Route Protection
		if (!auth.uid) return <Redirect to="/" />;
		if (!auth.emailVerified) return <Redirect to={`/verify`} />;
		if (auth.uid === pageuid) return <Redirect to="/me" />;
		// maybe instead of redirecting, we can have another sign up page here
		// otws good to go
		// TODO: change const projects so its only this user's projects
		// pass this in to project list uid={auth.uid}
		return (
			<div>
				<div className="dashboard container">
					<div className="row">
						<h1>
							<span className="purple-text">{poss}</span>
						</h1>
						<SortForm
							handleDropChange={(e) =>
								this.setState({
									orderBy: e.target.value
								})
							}
							orderBy={this.state.orderBy}
						/>
						<h4 style={{ float: "left" }}>
							View other people's projects
						</h4>
					</div>
					<ProjectList
						orderBy={orderBy}
						limit={limit}
						uid={auth.uid}
					/>
					<div className="center">
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
	//console.log("STATE", state);
	//console.log("ownProps", ownProps);
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
