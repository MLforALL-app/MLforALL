import React, { useState } from "react";
import moment from "moment";
import HelpBox from "../../../layouts/helpbox";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { updateContent } from "../../../../store/actions/projectActions";

// DESCRIPTION CARD
const DescCard = ({ project, pid, updateContent, auth }) => {
	const [content, setContent] = useState(project.content);
	const [edit, setEdit] = useState(false);
	const handleChange = (e) => {
		setContent(e.target.value);
	};
	const handleSubmit = () => {
		if (edit) {
			console.log("submit");
			setEdit(false);
			setContent(content);
			updateContent(content, pid);
		} else {
			console.log("begin edit");
			setEdit(true);
		}
	};
	const editButton = () => {
		//console.log(auth);
		//console.log(project);
		if (auth.uid === project.authorID)
			return (
				<div onClick={handleSubmit}>
					{edit ? <SaveIcon /> : <EditIcon />}
				</div>
			);
	};
	return (
		<div className="col s12">
			<h1>
				<span className="purple-text">{project.title}</span>{" "}
				<HelpBox
					header="Play with Machine Learning Models!"
					placement="bottom"
					desc="Welcome to the ML Model Play Page. Here, you'll be able to input test values for various machine learning models and see what the output would be! Test it out and see how accurate this model is."
				/>
			</h1>
			<div className="row">
				{edit ? (
					<div className="col s12 m6">
						<div className="input-field">
							<label htmlFor="textarea1">
								Write a description!
							</label>
							<textarea
								className="materialize-textarea"
								id="textarea1"
								onChange={handleChange}
								value={content}>
								{content}
							</textarea>
						</div>
					</div>
				) : (
					<div className="col s12 m6">{project.content}</div>
				)}
				{editButton()}
			</div>
			<div style={{ color: "#808080", textAlign: "right" }}>
				Posted with <span className="hearts">&hearts;</span> by{" "}
				<span className="purple-text" style={{ fontWeight: "bold" }}>
					<u>
						{" "}
						<Link to={`/user/${project.authorID}`}>
							{project.authorFirstName} {project.authorLastName}
						</Link>
					</u>
				</span>{" "}
				on {moment(project.createdAt.toDate()).format("LLL")}
			</div>
		</div>
	);
};

const mapStateToProps = (state, ownProps) => {
	const pid = ownProps.pid;
	const project = ownProps.project;
	return {
		pid,
		project,
		auth: state.firebase.auth
	};
};

// Redux to associate action call to a dispatch
const mapDispatchToProps = (dispatch) => {
	return {
		updateContent: (content, pid) => dispatch(updateContent(content, pid))
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(DescCard);
