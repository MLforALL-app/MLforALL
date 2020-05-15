import React from "react";

function ProjectDetails(props) {
	const id = props.match.params.id;
	return (
		<div className="container section project-details">
			<div className="card z-depth-0">
				<div className="card-content">
					<span className="card-title"> Project Title: {id} </span>
					<p>
						{" "}
						According to all known laws of aviation, there is no way
						a bee should be able to fly. Its wings are too small to
						get its fat little body off the ground. The bee, of
						course, flies anyway because bees don't care what humans
						think is impossible. Yellow, black. Yellow, black.
						Yellow, black. Yellow, black. Ooh, black and yellow!
						Let's shake it up a little. Barry! Breakfast is ready!
					</p>
				</div>
				<div className="card-action grey lighten-4 grey-text">
					<div>Posted by Len Huang </div>
					<div>April 20th</div>
				</div>
			</div>
		</div>
	);
}

export default ProjectDetails;
