
//import { storage } from "../../config/fbConfig.js";

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
		project["csvName"] = csvName;
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
				//console.log(snapshot);
				dispatch({ type: "CREATE_PROJECT", project, snapshot});
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
			});
	};
};

export const uploadCSV = (csvName, projName) => {
	return (dispatch, getState, {getFirebase}) => {
		console.log(csvName);
		const firebase = getFirebase();
		const csvPath = getState().firebase.auth.uid + "/" + projName + "/" + csvName.name;
		var csvRef = firebase.storage().ref(csvPath);
		csvRef.put(csvName)
		.then((snapshot) => {
			 console.log("uploaded csv!");
			 dispatch({ type: "UPLOAD_CSV" });
		})
		.catch((err) => {
			dispatch({ type: "UPLOAD_CSV_ERROR" });
			console.log("csv upload error");
		});
		
	}

}

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
