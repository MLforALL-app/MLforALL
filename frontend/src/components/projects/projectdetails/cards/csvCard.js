import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DeleteProject from "./confirmDel";

const printVarNames = (variables) => {
	return variables.map((v) => " " + v.name);
};

const shorten = (s) => {
	return s.length < 30 ? s : s.substr(0, 27) + "...";
};

const edit = (setRedirect) => {
	return (
		<button
			className="btn-flat waves-effect waves-light"
			style={{ display: "inline" }}
			onClick={() => {
				setRedirect(true);
			}}
		>
			<span className="purple-text">Edit</span>
		</button>
	);
};

// COMPONENT To Show the CSV Card information. This is where the
// delete project functionality is housed
const CSVCard = ({ pid, auth, project, history }) => {
	const [redirect, setRedirect] = useState(false);
	const owner = auth.uid === project.authorID;
	return (
		<div className="col s12" style={{ textAlign: "right" }}>
			<h4>
				<span className="purple-text">Project Details</span>
			</h4>
			<div className="row">
				<div className="col s0 m5"></div>
				<div className="col s12 m7">
					<p>
						The various parameters used in{" "}
						{shorten(project.csvName)} include
						{printVarNames(project.variables)}. Feeling rough around
						the edges? Use the links below to change your project.
					</p>
				</div>
			</div>
			{redirect ? <Redirect to={`/edit/${pid}`} /> : <span></span>}
			{owner ? (
				<span>
					{edit(setRedirect)}
					<DeleteProject
						auth={auth}
						pid={pid}
						project={project}
						history={history}
					/>
				</span>
			) : (
				<span></span>
			)}{" "}
		</div>
	);
};

export default CSVCard;
