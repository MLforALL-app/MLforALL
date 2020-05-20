import React from "react";
import moment from "moment";

const DescCard = (project) => {
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">{project.title}</span>
				<p>{project.content}</p>
			</div>
			<div className="card-action grey lighten-4 grey-text">
				<div>
					Posted with <span className="hearts">&hearts;</span> by{" "}
					{project.authorFirstName} {project.authorLastName}
				</div>
				<div>{moment(project.createdAt.toDate()).format("LLL")}</div>
			</div>
		</div>
	);
};

export default DescCard;
