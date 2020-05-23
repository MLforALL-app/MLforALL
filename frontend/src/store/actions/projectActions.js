export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		const date = new Date();
		// Will need some way to accomplish this
		const csvName = "dummy.csv";
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
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
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
