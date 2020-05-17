import React from "react";
import ProjectList from "../projects/projectlist";
import firebase from "../../config/fbConfig";

const getProject = (firestore) => {
	return (projID) => {
		return firestore
			.collection("projects")
			.doc(projID)
			.get()
			.then((doc) => {
				return doc.data();
			})
			.catch((err) => {
				console.log("error with project firestore", err);
			});
	};
};

const fetchMine = (uid) => {
	const firestore = firebase.firestore();
	const myList = firestore
		.collection("users")
		.doc(uid)
		.get()
		.then((doc) => {
			const projects = doc.data().projects.map(getProject(firestore));
			console.log(typeof projects);
			console.log(projects);
			return <ProjectList projects={projects} />;
		})
		.catch((err) => {
			console.log("Error with user firestore", err);
			return <h3> ERROR: Something went wrong with our servers. </h3>;
		});
	return myList;
};

export default fetchMine;
