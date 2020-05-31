import React from "react";
import DeleteProject from "./confirmDel";

const printVarNames = (variables) => {
	return variables.map((v) => " " + v.name);
};

const shorten = (s) => {
	return s.length < 30 ? s : s.substr(0, 27) + "...";
};

// COMPONENT To Show the CSV Card information. This is where the
// delete project functionality is housed
const CSVCard = ({ id, auth, project }) => {
	return (
		<div className="col s12" style={{ textAlign: "right" }}>
			<h4>
				<span className="purple-text">About the CSV</span>
			</h4>
			<div className="row">
				<div className="col s0 m5"></div>
				<div className="col s12 m7">
					<p>
						The various parameters used in{" "}
						{shorten(project.csvName)} include
						{printVarNames(project.variables)}.
					</p>
				</div>
			</div>
			{auth.uid === project.authorID ? (
				<DeleteProject auth={auth} id={id} project={project} />
			) : (
				<span></span>
			)}{" "}
		</div>
	);
};

export default CSVCard;
