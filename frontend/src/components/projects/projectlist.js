import React, { Component } from "react";
import ProjectSummary from "./projectsummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

function mapDepends(projects, uid) {
	if (projects && uid) {
		// console.log("MAP DEPENDS if", projects);
		return projects.filter((p) => p.authorID === uid);
	} else {
		// console.log("MAP DEPENDS else", projects);
		return projects;
	}
}

function makeLink(proj) {
	console.log("THIS IS PROJ FOR MAKELINK", proj);
	return (
		<div className="col s12 m6" key={proj.id}>
			<Link to={`/project/${proj.id}`}>
				<ProjectSummary project={proj} />{" "}
			</Link>
		</div>
	);
}

function grouped(projects) {
	const group = [];
	for (var i = 0; i < projects.length; i++) {
		if (i < projects.length - 1) {
			group.push([projects[i], projects[i + 1]]);
			i++;
		} else {
			group.push([projects[i]]);
		}
	}
	//console.log("THIS IS GROUPED", group);
	return group;
}

function mapPairs(pair) {
	console.log("PAIR", pair);
	if (pair.length < 2) {
		return (
			<div className="row" key={pair[0].id}>
				{makeLink(pair[0])}
			</div>
		);
	} else {
		return (
			<div className="row" key={pair[0].id}>
				{makeLink(pair[0])}
				{makeLink(pair[1])}
			</div>
		);
	}
}

class ProjectList extends Component {
	state = {
		pLoad: false,
		check: true
	};
	componentDidUpdate() {
		console.log("UPDATE", this.props.projects);
		if (this.state.check) {
			this.setState({
				pLoad: this.props.projects && this.props.projects.length !== 0,
				check: false
			});
		}
	}
	render() {
		const { projects, auth } = this.props;
		console.log("RENDER", projects);
		console.log("STATE", this.state);
		return (
			<div className="project-list section">
				{this.state.pLoad
					? grouped(mapDepends(projects, auth.uid)).map(mapPairs)
					: []}
				{console.log(
					this.state.pLoad
						? grouped(mapDepends(projects, auth.uid)).map(mapPairs)
						: "davis is troll"
				)}
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	console.log(ownProps);
	console.log("map state to", state.firestore.ordered.projects);
	return {
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((props) => {
		console.log("CONNECT PROPS", props);
		return [
			{
				collection: "projects",
				orderBy: ["createdAt", "desc"],
				limit: 2
			}
		];
	})
)(ProjectList);
