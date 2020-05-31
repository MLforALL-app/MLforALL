import React from "react";
import moment from "moment";

// DESCRIPTION CARD
const DescCard = ({ project }) => {
	return (
		<div className="col s12">
			<h1>
				<span className="purple-text">{project.title}</span>
			</h1>
			<div className="row">
				<div className="col s12 m6">
					<p>{project.content}</p>
				</div>
			</div>

			<div style={{ color: "#cecece", textAlign: "right" }}>
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
