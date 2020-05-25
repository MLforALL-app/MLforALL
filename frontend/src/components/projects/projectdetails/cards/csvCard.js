import React from "react";
import DeleteProject from "./confirmDel";

const CSVCard = (id, auth, project) => {
	return (
		<div className="card z-depth-0">
			<div className="card-content">
				<span className="card-title">Dataset Information</span>
				<p>
					Here is some intro information about {project.csvName}.
					Ideally this is where some of our renderCSV stuff will go
				</p>
			</div>
			<div className="card-action grey lighten-4 grey-text">
				<a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
					Download/reference link here
				</a>

				{auth.uid === project.authorID ? (
					<DeleteProject auth={auth} id={id} project={project} />
				) : (
					<span></span>
				)}
			</div>
		</div>
	);
};

export default CSVCard;
