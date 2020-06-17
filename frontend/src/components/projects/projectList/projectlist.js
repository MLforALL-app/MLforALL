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
		maxPage: 0,
		projects: [],
		nextPage: [],
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
			const initNext = documentSnapshot.docs.map(this.docMap);
			const lastVis = this.tail(documentSnapshot.docs);
			console.log("Init_next", initNext);
			console.log("Init_lastVis", lastVis.data().title);
			// load the next page
			this.setState((prev) => {
				prev.lastVisible.push(lastVis);
				return {
					nextPage: initNext,
					lastVisible: prev.lastVisible
				};
			});
			this.getProjects();
		});
	}
	getProjects() {
		// load the current page (snapshot) from next and convert to list
		this.setState({ pLoad: false }); //begin load
		const { orderBy, direction, limit } = this.props;
		const { nextPage, lastVisible } = this.state;
		this.setState((prev) => {
			// Load current snapshot from next
			console.log("pushing on nextpage");
			prev.projects.push(nextPage);
			console.log("Updated projects", prev.projects);
			return { projects: prev.projects };
		});
		// update "next page" with new page
		const ref = db.collection("projects");
		ref.orderBy(orderBy, direction)
			.limit(limit)
			.startAt(this.tail(lastVisible))
			.get()
			.then((documentSnapshot) => {
				const getNext = documentSnapshot.docs.map(this.docMap);
				const lastVis = this.tail(documentSnapshot.docs);
				console.log("get_next", getNext);
				console.log("get_lastVis", lastVis.data().title);
				// update next here, update lastVisible accordingly
				this.setState((prev) => {
					prev.lastVisible.push(lastVis);
					console.log("update last visible", prev.lastVisible);
					return {
						nextPage: getNext,
						lastVisible: prev.lastVisible,
						maxPage: prev.maxPage + 1,
						pLoad: true
					};
				});
			});
	}
	handleClick(dir) {
		const direction = dir === "next" ? 1 : -1;
		const { page, maxPage } = this.state;
		return () => {
			this.setState((prev) => {
				return { page: prev.page + direction };
			});
			if (page >= maxPage) {
				console.log("click! YES if getting projects...");
				this.getProjects();
			} else {
				console.log("click! Yes else getting.");
				this.getProjects();
			}
		};
	}
	componentDidMount() {
		this.initProjects();
	}
	render() {
		const { projects, page } = this.state;
		console.log("page number", page);
		console.log("RENDER PROJECT", projects[page]);
		console.log("pLOAD", this.state.pLoad);
		return (
			<div className="project-list section">
				<FormatList projects={projects[page]} />
				<div className="row pagination-select">
					{this.pageArrows(true, true)}
				</div>
			</div>
		);
	}
}

export default ProjectList;
