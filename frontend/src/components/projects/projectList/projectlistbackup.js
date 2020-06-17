import React, { Component } from "react";
import FormatList from "./formatList";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class ProjectList extends Component {
	state = {
		pLoad: false,
		check: true,
		pList: []
	};
	componentDidUpdate() {
		//console.log("UPDATE", this.props.projects);
		if (this.state.check) {
			this.setState({
				pLoad: this.props.projects && this.props.projects.length !== 0,
				check: false
			});
		}
	}
	render() {
		const { projects } = this.props;
		const { pLoad } = this.state;
		//console.log("RENDER PROJECT", projects);
		//console.log("pLOAD", this.state.pLoad);
		return (
			<div className="project-list section">
				<FormatList projects={projects} loaded={pLoad} />
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
		if (ownProps.uid && !ownProps.limit) {
			return [
				{
					collection: "projects",
					where: [["authorID", "==", ownProps.uid]],
					orderBy: [ownProps.orderBy, ownProps.direction],
					startAt: 0
				}
			];
		} else {
			return [
				{
					collection: "projects",
					orderBy: [ownProps.orderBy, ownProps.direction],
					limit: ownProps.limit,
					startAt: 0
				}
			];
		}
	})
)(ProjectList);
