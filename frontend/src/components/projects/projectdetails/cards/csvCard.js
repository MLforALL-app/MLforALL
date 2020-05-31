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
const CSVCard = ({ pid, auth, project }) => {
	const [redirect, setRedirect] = useState(false);
	const owner = auth.uid === project.authorID;
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
			{redirect ? <Redirect to={`/edit/${pid}`} /> : <span></span>}
			{owner ? (
				<span>
					<DeleteProject auth={auth} pid={pid} project={project} />
					{edit(setRedirect)}
				</span>
			) : (
				<span></span>
			)}{" "}
		</div>
	);
};

export default CSVCard;
