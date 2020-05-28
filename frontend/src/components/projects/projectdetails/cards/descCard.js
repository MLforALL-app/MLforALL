import React from "react";
import moment from "moment";

// DESCRIPTION CARD
const DescCard = ({ project }) => {
	return (
		<div className="card z-depth-1">
			<div className="card-content">
				<span className="card-title">{project.title}</span>
				<p>{project.content}</p>
			</div>
			<div className="card-action">
				<div>
					Posted with <span className="hearts">&hearts;</span> by{" "}
					<span style={{ fontWeight: "bold" }}>
						{project.authorFirstName} {project.authorLastName}
					</span>{" "}
					on {moment(project.createdAt.toDate()).format("LLL")}
				</div>
			</div>
		</div>
	);
};

export default DescCard;
