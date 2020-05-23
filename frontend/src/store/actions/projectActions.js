
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
		const csvPath = getState().firebase.auth.uid + "/" + project.title + "/" + csvName;
		
		var csvRef = storage.ref(csvPath);
		csvRef.put(csvToUpload)
		   .then((snapshot) => {
				console.log("uploaded csv!");
		   })
		   .catch((err) => {
			   console.log("csv upload error");
		   });
	};
};

export const deleteProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const projectID = "something";
		const firestore = getFirestore();
		firestore
			.collection("projects")
			.delete(projectID)
			.then((snapshot) => {
				dispatch({ type: "DELETE_PROJECT" });
			})
			.catch((err) => {
				dispatch({ type: "DELETE_PROJECT_ERROR", err });
			});
		/*// Create a reference to the file to delete
			var desertRef = storageRef.child('images/desert.jpg');

			// Delete the file
			desertRef.delete().then(function() {
			// File deleted successfully
			}).catch(function(error) {
			// Uh-oh, an error occurred!
			});
 */
	};
};
