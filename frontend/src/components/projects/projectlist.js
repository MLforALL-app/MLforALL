import React, { Component } from "react";
import ProjectSummary from "./projectsummary";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

const makeLink = (proj) => {
	console.log("THIS IS PROJ FOR MAKELINK", proj);
	return (
		<div className="col s12 m6" key={proj.id}>
			<Link to={`/project/${proj.id}`}>
				<ProjectSummary project={proj} />{" "}
			</Link>
		</div>
	);
};

const grouped = (projects) => {
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
};

const mapPairs = (pair) => {
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
};

class ProjectList extends Component {
	state = {
		pLoad: false,
		check: true,
		pList: []
	};
	componentDidUpdate() {
		console.log("UPDATE", this.props.projects);
		console.log(
			"update pLoad",
			this.props.projects && this.props.projects.length !== 0
		);
		if (this.state.check) {
			this.setState({
				pLoad: this.props.projects && this.props.projects.length !== 0,
				check: false
			});
		}
	}
	render() {
		const { projects, auth } = this.props;
		console.log("RENDER PROJECT", projects);
		console.log("pLOAD", this.state.pLoad);
		return (
			<div className="project-list section">
				{this.state.pLoad
					? console.log("grouping", grouped(projects))
					: console.log("grouping not loaded")}
				{this.state.pLoad ? grouped(projects).map(mapPairs) : []}
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		projects: state.firestore.ordered.projects,
		auth: state.firebase.auth
	};
};

export default compose(
	connect(mapStateToProps),
	firestoreConnect((ownProps) => {
		return [
			{
				collection: "projects",
				orderBy: [ownProps.orderBy, ownProps.direction],
				limit: ownProps.limit,
				startAt: ownProps.startAt
			}
		];
	})
)(ProjectList);
