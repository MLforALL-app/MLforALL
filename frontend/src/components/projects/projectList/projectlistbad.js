import React, { Component } from "react";
import ProjectSummary from "./projectsummary";
import CircularProgress from "@material-ui/core/CircularProgress";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { db } from "../../../config/fbConfig";
import "../../styling/dashboard.css";

const makeLink = (proj) => {
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
		nextPage: [],
		lastVisible: [],
		count: 0,
		maxCount: 0,
		index: 0,
		lastPage: null
	};
	// doc map helper
	docMap(doc) {
		var proj = doc.data();
		proj["pid"] = doc.id;
		return proj;
	}
	initProjects() {
		// Get first round of projects and store second one in "next"
		this.setState({ pLoad: false });
		const { orderBy, direction, limit } = this.props;
		// temporarily make limit large
		const projRef = db.collection("projects");
		const projGet = projRef.orderBy(orderBy, direction).limit(limit).get();
		projGet.then((documentSnapshots1) => {
			var docList = documentSnapshots1.docs;
			console.log("INIT PROJECT", docList.map(this.docMap));
			console.log("INIT LASTVIS", docList[docList.length - 1].data());
			projGet.then((documentSnapshots2) => {
				this.setState({
					projects: docList.map(this.docMap),
					nextPage: documentSnapshots2.docs.map(this.docMap),
					lastVisible: [docList[docList.length - 1]],
					maxCount: 1,
					pLoad: true
				});
			});
		});
	}
	getProjects() {
		// load existing ones and then store new ones in next
	}
	handleClick(dir) {
		const { count, index, maxCount, projects, lastVisible } = this.state;
		const { limit, orderBy } = this.props;
		const direction = dir === "next" ? 1 : -1;
		/*
		console.log("Max Count: ", maxCount);
		console.log("Current Count: ", count);
		console.log("Current Index: ", index);
		console.log("Projects.length", projects.length);
		console.log("projects", projects);
		console.log("lastvis", lastVisible);
		*/
		// insert a safety check here
		return () => {
			this.setState((prev) => {
				return {
					index: prev.index + limit * direction,
					count: prev.count + direction
				};
			});
			// get next next page
			if (count * limit > projects.length) {
				console.log("enter if");
				this.setState({ pLoad: false });
				db.collection("projects")
					.orderBy(orderBy)
					.startAfter(lastVisible[lastVisible.length - 1])
					.limit(limit)
					.get()
					.then((documentSnapshots) => {
						var docList = documentSnapshots.docs;
						this.setState((prev) => {
							// update with new projects
							return {
								projects: prev.projects.concat(
									docList.map(this.docMap)
								),
								lastVisible: docList[docList.length - 1],
								maxCount: prev.maxCount + 1,
								lastPage:
									docList.length < limit ? maxCount : null,
								pLoad: true
							};
						});
					});
			} else {
				console.log("else");
			}
		};
	}

	componentDidMount() {
		this.initProjects();
	}
	render() {
		const {
			projects,
			pLoad,
			count,
			index,
			lastPage,
			nextPage
		} = this.state;
		const { limit } = this.props;
		console.log("nextPage", nextPage);
		const showPrev = count > 0;
		const showNext = lastPage ? count < lastPage : true;
		return (
			<div className="project-list section">
				{pLoad ? (
					grouped(projects.slice(index, index + limit)).map(mapPairs)
				) : (
					<div className="container center">
						<CircularProgress />
					</div>
				)}
				<div className="row pagination-select">
					<h4 className="purple-text center">
						{showPrev ? (
							<span onClick={this.handleClick("before")}>
								<NavigateBeforeIcon className="pagination-icon" />{" "}
							</span>
						) : (
							<span></span>
						)}
						{count + 1}{" "}
						{showNext ? (
							<span onClick={this.handleClick("next")}>
								<NavigateNextIcon className="pagination-icon" />
							</span>
						) : (
							<span></span>
						)}
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
