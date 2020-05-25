import { storage } from "../../config/fbConfig.js";

export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		const date = new Date();
		// We get the csv name from the csv project (called csvName for conveinence)
		const csvName = project.csvName.name;
		//Store the file to upload for later
		const csvToUpload = project.csvName;
		console.log(project.csvName.name);
		project["csvName"] = csvName;
		var success = false;
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: fname,
				authorLastName: lname,
				authorID: uid,
				createdAt: date,
				csvName: csvName,
				models: [],
				variables: []
			})
			.then((snapshot) => {
				dispatch({ type: "CREATE_PROJECT", project });
				success = true;
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
		console.log(success);
		//Project is created, now we have to upload the file
		const csvPath =
			getState().firebase.auth.uid + "/" + project.title + "/" + csvName;

		var csvRef = storage.ref(csvPath);
		csvRef
			.put(csvToUpload)
			.then((snapshot) => {
				console.log("uploaded csv!");
			})
			.catch((err) => {
				console.log("csv upload error");
			});
	};
};

export const deleteMLProject = (id, auth, project) => {
	return (dispatch, getState, { getFirestore, getFirebase }) => {
		// get todelete files
		const delCSV = project.csvName;
		console.log("DEL CSV", delCSV);
		// might be a source of bugs in the future
		var delVars = Object.values(project.models);
		console.log("TYPE OF DEL VARS", typeof delVars);
		delVars.push(delCSV);
		console.log("TO DELETE", delVars);
		// make async call to database
		const firestore = getFirestore();
		console.log("STORAGE PATH", auth.uid + "/" + project.title);
		firestore
			.collection("projects")
			.doc(id)
			.delete()
			.then((snapshot) => {
				dispatch({ type: "DELETE_PROJECT_DOC" });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_PROJECT_DOC_ERROR", err });
			});
		const storageRef = getFirebase().storage();
		delVars.forEach((filename) => {
			storageRef
				.ref(auth.uid + "/" + project.title + "/" + filename)
				.delete()
				.then(() => {
					console.log("Delete correctly from storage");
				})
				.catch((err) => {
					console.log("uh oh spagetthio", err);
				});
		});
	};
};
