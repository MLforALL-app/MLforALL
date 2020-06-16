import React, { Component } from "react";
import ProjectSummary from "./projectsummary";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { db } from "../../config/fbConfig";
import "../../styling/dashboard.css";

const makeLink = (proj) => {
	//console.log("THIS IS PROJ FOR MAKELINK", proj);
	return (
		<div className="col s12 m6" key={proj.pid}>
			<Link to={`/project/${proj.pid}`}>
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
	return group;
};

const mapPairs = (pair) => {
	if (pair.length < 2) {
		return (
			<div className="row" key={pair[0].authorID + pair[0].title}>
				{makeLink(pair[0])}
			</div>
		);
	} else {
		return (
			<div
				className="row"
				key={
					pair[0].authorID +
					pair[1].authorID +
					pair[0].title +
					pair[1].title
				}>
				{makeLink(pair[0])}
				{makeLink(pair[1])}
			</div>
		);
	}
};

class ProjectList extends Component {
	state = {
		pLoad: false,
		projects: [],
		lastVisible: null,
		count: 0,
		index: 0
	};
	// doc map helper
	docMap(doc) {
		var proj = doc.data();
		proj["pid"] = doc.id;
		return proj;
	}
	initProjects() {
		// Get first round of projects
		this.setState({ pLoad: false });
		const { orderBy, direction, limit } = this.props;
		console.log("init state", this.state);
		// temporarily make limit large
		db.collection("projects")
			.orderBy(orderBy, direction)
			.limit(20)
			.get()
			.then((documentSnapshots) => {
				var docList = documentSnapshots.docs;
				this.setState({
					projects: docList.map(this.docMap),
					pLoad: true
				});
			});
	}
	handleClick(dir) {
		const { count, projects, lastVisible } = this.state;
		const { limit } = this.props;
		const direction = dir === "next" ? 1 : -1;
		return () => {
			//check if maybe loading not necessary
			if (count * limit < projects.length) {
				this.setState((prev) => {
					return {
						index: prev.index + limit * direction,
						count: prev.count + direction
					};
				});
			}
			//if not, readjust index
			//else, make query
		};
	}
	componentDidMount() {
		this.initProjects();
	}
	render() {
		const { projects, pLoad, count, index } = this.state;
		const { limit } = this.props;
		console.log("Render", this.state);
		console.log(count);

		return (
			<div className="project-list section">
				{pLoad
					? console.log("slice", projects.slice(index, index + limit))
					: "'"}
				{pLoad ? (
					grouped(projects.slice(index, index + limit)).map(mapPairs)
				) : (
					<div className="container center">
						<CircularProgress />
					</div>
				)}
				<div className="row pagination-select">
					<h4 className="purple-text center">
						{" "}
						<span onClick={this.handleClick("before")}>
							<NavigateBeforeIcon className="pagination-icon" />
						</span>{" "}
						{count + 1}{" "}
						<span onClick={this.handleClick("next")}>
							<NavigateNextIcon className="pagination-icon" />
						</span>
					</h4>
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

export default connect(mapStateToProps)(ProjectList);
