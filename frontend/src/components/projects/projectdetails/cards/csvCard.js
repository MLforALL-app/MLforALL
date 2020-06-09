import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import DeleteProject from "./confirmDel";
import "firebase/storage";
import firebase from "../../../../config/fbConfig";

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
	const [csvUrl, setcsvUrl] = useState("");
	const [redirect, setRedirect] = useState(false);
	const owner = auth.uid === project.authorID;
	const csvPath = project.authorID + "/" + pid + "/" + project.csvName;
	var csvRef = firebase.storage().ref(csvPath);
	csvRef
		.getDownloadURL()
		.then((url) => {
			console.log("This the url", url);
			setcsvUrl(url);
		})
		.catch((err) => {
			console.log("SOMETHING wrong uhOh", err);
		});

	return (
		<div className="col s12" style={{ textAlign: "right" }}>
			<h4>
				<span className="purple-text">Project Details</span>
			</h4>
			<div className="row">
				<div className="col s0 m5"></div>
				<div className="col s12 m7">
					<p>
						Curious to learn more? Use the link below to download
						the CSV. Feeling rough around the edges? Edit or delete
						your project!
					</p>
				</div>
			</div>
			{redirect ? <Redirect to={`/edit/${pid}`} /> : <span></span>}
			{owner ? (
				<span>
					<DeleteProject
						auth={auth}
						pid={pid}
						project={project}
						history={history}
					/>
					{edit(setRedirect)}
				</span>
			) : (
				<span></span>
			)}{" "}
			{csvUrl === "" ? (
				<span></span>
			) : (
				<a href={csvUrl}>
					<button
						className="btn-flat waves-effect waves-light"
						style={{ display: "inline" }}
					>
						Download the CSV Here
					</button>
				</a>
			)}
		</div>
	);
};

export default CSVCard;
