import React, { Component } from "react";
import FormatList from "./formatList";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { db } from "../../../config/fbConfig";
import "../../../styling/dashboard.css";

class ProjectList extends Component {
	state = {
		pLoad: false,
		page: 0,
		projects: [],
		nextSnapshot: null,
		lastVisible: []
	};
	tail(list) {
		return list[list.length - 1];
	}
	docMap(doc) {
		var proj = doc.data();
		proj["pid"] = doc.id;
		return proj;
	}
	pageArrows(showPrev, showNext) {
		var arrows = { left: null, right: null };
		if (showPrev) {
			arrows.left = (
				<span onClick={this.handleClick("before")}>
					<NavigateBeforeIcon className="pagination-icon" />{" "}
				</span>
			);
		}
		if (showNext) {
			arrows.right = (
				<span onClick={this.handleClick("next")}>
					<NavigateNextIcon className="pagination-icon" />
				</span>
			);
		}
		return (
			<h4 className="purple-text center">
				{arrows.left} {this.state.page + 1} {arrows.right}
			</h4>
		);
	}
	initProjects() {
		// put the first page in "next" to be called by getProject
		const { orderBy, direction, limit } = this.props;
		const ref = db.collection("projects");
		const query = ref.orderBy(orderBy, direction).limit(limit).get();
		query.then((documentSnapshot) => {
			console.log("Initproj_snap", documentSnapshot);
			console.log("Initproj_lastVis", this.tail(documentSnapshot.docs));
			this.setState({
				nextSnapshot: documentSnapshot,
				lastVisible: this.tail(documentSnapshot.docs)
			});
			this.getProjects();
		});
	}
	getProjects() {
		// load the current page (snapshot) from next
		this.setState({ pLoad: false }); //begin load
		const { orderBy, direction, limit } = this.props;
		const { nextSnapshot, lastVisible } = this.state;
		this.setState((prev) => {
			// Load current snapshot from next
			const docList = nextSnapshot.docs;
			prev.projects.push(docList.map(this.docMap));
			console.log("Updated projects", prev.projects);
			return { projects: prev.projects };
		});
		// update "next page"
		const ref = db.collection("projects");
		const query = ref
			.orderBy(orderBy, direction)
			.limit(limit)
			.startAt(lastVisible);
		query.get().then((documentSnapshot) => {
			console.log("get_snap", documentSnapshot);
			console.log("get_lastVis", this.tail(documentSnapshot.docs));
			this.setState({
				nextSnapshot: documentSnapshot,
				lastVisible: this.tail(documentSnapshot.docs),
				pLoad: true
			});
		});
	}
	handleClick(dir) {
		return () => console.log(dir);
	}
	componentDidMount() {
		this.initProjects();
	}
	render() {
		const { pLoad, projects } = this.state;
		console.log("RENDER PROJECT", projects);
		console.log("pLOAD", this.state.pLoad);
		return (
			<div className="project-list section">
				<FormatList projects={projects} loaded={pLoad} />
				<div className="row pagination-select">
					{this.pageArrows(true, true)}
				</div>
			</div>
		);
	}
}

export default ProjectList;
