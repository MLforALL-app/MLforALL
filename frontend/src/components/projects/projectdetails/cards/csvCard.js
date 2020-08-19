import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteProject from "./confirmDel";
import "firebase/storage";
import firebase from "../../../../config/fbConfig";

const edit = () => {
	return (
		<button
			className="btn-flat waves-effect waves-light"
			style={{ display: "inline" }}>
			<span className="purple-text">Edit This Project</span>
		</button>
	);
};

// COMPONENT To Show the CSV Card information. This is where the
// delete project functionality is housed
const CSVCard = ({ pid, auth, project, history }) => {
	const [csvUrl, setcsvUrl] = useState("");
	const owner = auth.uid === project.authorID;
	const csvPath = project.csvPath;
	var csvRef = firebase.storage().ref(csvPath);
	csvRef
		.getDownloadURL()
		.then((url) => {
			setcsvUrl(url);
		})
		.catch((err) => {});

	return (
		<div className="col s12" style={{ textAlign: "right" }}>
			<h4>
				<span className="purple-text">Project Details</span>
			</h4>
			<div className="row">
				<div className="col s0 m5"></div>
				<div className="col s12 m7">
					<p>
						Curious to learn more? Use the link below to download the CSV.
						Feeling rough around the edges? Edit or delete your project!
					</p>
				</div>
			</div>
			{owner ? (
				<span>
					<DeleteProject
						auth={auth}
						pid={pid}
						project={project}
						history={history}
					/>
					<Link to={`/edit/${pid}`}>{edit()}</Link>
				</span>
			) : (
				<span></span>
			)}{" "}
			{csvUrl === "" ? (
				<span></span>
			) : (
				<a target="_blank" rel="noreferrer noopener" href={csvUrl}>
					<button
						className="btn-flat waves-effect waves-light"
						style={{ display: "inline" }}>
						Download the CSV Here
					</button>
				</a>
			)}
		</div>
	);
};

export default CSVCard;
