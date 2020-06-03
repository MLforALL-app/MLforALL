import React from "react";
import moment from "moment";
import HelpBox from "../../../layouts/helpbox";

// DESCRIPTION CARD
const DescCard = ({ project }) => {
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
				<div className="col s12 m6">{project.content}</div>
			</div>

			<div style={{ color: "#808080", textAlign: "right" }}>
				Posted with <span className="hearts">&hearts;</span> by{" "}
				<span style={{ fontWeight: "bold" }}>
					{project.authorFirstName} {project.authorLastName}
				</span>{" "}
				on {moment(project.createdAt.toDate()).format("LLL")}
			</div>
		</div>
	);
};

export default DescCard;
