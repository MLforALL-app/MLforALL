import React, { Component } from "react";
import FormatList from "./formatList";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import { db } from "../../../config/fbConfig";
import "../../../styling/dashboard.css";
import "../../../styling/cards.css";

class ProjectList extends Component {
	state = {
		page: 0,
		maxPage: 0,
		projects: [],
		lastVisible: [],
		nextPage: null
	};
	getDir(orderBy) {
		return orderBy === "createdAt" ? "desc" : "asc";
	}
	initState() {
		return {
			page: 0,
			maxPage: 0,
			projects: [],
			lastVisible: [],
			nextPage: null
		};
	}
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
		if (showPrev || showNext || this.state.page > 0) {
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
		} else {
			return <span></span>;
		}
	}
	initUserProjects() {
		// don't have pagination for an indivdual user's projects
		const { orderBy, uid } = this.props;
		const dir = this.getDir(orderBy);
		const ref = db.collection("projects");
		const query = ref
			.orderBy(orderBy, dir)
			.where("authorID", "==", uid)
			.get();
		query
			.then((documentSnapshot) => {
				const myProjects = documentSnapshot.docs.map(this.docMap);
				this.setState({ projects: [myProjects] });
			})
			.catch((err) => console.log(err));
	}
	initProjects() {
		// put the first page in "next" to be called by getProject
		const { orderBy, limit } = this.props;
		const dir = this.getDir(orderBy);
		const ref = db.collection("projects");
		const query = ref.orderBy(orderBy, dir).limit(limit).get();
		query
			.then((documentSnapshot) => {
				const initNext = documentSnapshot.docs.map(this.docMap);
				const lastVis = this.tail(documentSnapshot.docs);
				// load the next page
				this.setState((prev) => {
					prev.lastVisible.push(lastVis);
					return {
						nextPage: initNext,
						lastVisible: prev.lastVisible
					};
				});
				this.getProjects();
			})
			.catch((err) => console.log(err));
	}
	getProjects() {
		// load the current page (snapshot) from next and convert to list
		const { orderBy, limit } = this.props;
		const { nextPage, lastVisible } = this.state;
		this.setState((prev) => {
			// Load current snapshot from next
			prev.projects.push(nextPage);
			return { projects: prev.projects };
		});
		// update "next page" with new page
		const ref = db.collection("projects");
		const dir = this.getDir(orderBy);
		ref.orderBy(orderBy, dir)
			.limit(limit)
			.startAt(this.tail(lastVisible))
			.get()
			.then((documentSnapshot) => {
				const getNext = documentSnapshot.docs.map(this.docMap);
				const lastVis = this.tail(documentSnapshot.docs);
				// update next here, update lastVisible accordingly
				this.setState((prev) => {
					prev.lastVisible.push(lastVis);
					return {
						nextPage: getNext,
						lastVisible: prev.lastVisible,
						maxPage: prev.maxPage + 1
					};
				});
			})
			.catch((err) => console.log(err));
	}
	handleClick(dir) {
		const increment = dir === "next" ? 1 : -1;
		const { page, maxPage } = this.state;
		return () => {
			// maintain ordering as well
			// only get projects while moving fwd
			if (page >= maxPage - 1 && increment === 1) {
				this.getProjects();
			}
			this.setState((prev) => {
				return { page: prev.page + increment };
			});
		};
	}
	resetProjects() {
		this.setState(this.initState());
		if (this.props.uid) {
			this.initUserProjects();
		} else {
			this.initProjects();
		}
	}
	componentDidMount() {
		this.resetProjects();
	}
	componentDidUpdate(prevProps) {
		if (prevProps && prevProps !== this.props) {
			this.resetProjects();
		}
	}
	render() {
		const { projects, page } = this.state;
		const { limit, uid } = this.props;
		const shownextpre = projects[page]
			? projects[page].length === limit
			: true; // not sure
		const showNext = uid ? false : shownextpre;
		return (
			<div className="project-list section">
				<FormatList projects={projects[page]} />
				<div className="row pagination-select">
					{projects[page] ? (
						this.pageArrows(page > 0, showNext)
					) : (
						<span></span>
					)}
				</div>
			</div>
		);
	}
}
export default ProjectList;
