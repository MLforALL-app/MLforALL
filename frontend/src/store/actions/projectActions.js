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
				// Instead we will opt for querying
				// Add projectID to user
				// appendProjectToUser(snapshot.id, firestore, authorID);
				/*addUserProject(
					snapshot.id,
					firestore,
					uid,
					project,
					fname,
					lname,
					date
				);*/
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

/*

Note to self from youtube comment

Joel Greek
1 year ago
You probably figured this out already since you wrote this 4 months ago but maybe someone else who watches this video now will ask the same question:
One could probably do this in the firestore cloud I guess. (Lesson 32), if you set the 'allow read, write: if request.auth.uid != userId'
Not sure if this is best practice, (probably not), but it works. cheers!

*/
