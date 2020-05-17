/*

const appendProjectToUser = (projID, firestore, uid) => {
	const userRef = firestore.collection("users").doc(uid);
	userRef
		.get()
		.then((doc) => {
			const userData = doc.data();
			// is there cleaner way to do this besides push?
			var updated = userData.projectList;
			const length = updated.push(projID);
			userRef.update({
				...userData,
				projects: updated
			});
		})
		.catch((err) => {
			console.log("Uh oh something wrong with appending list", err);
		});
};

*/
/*
const addUserProject = (projID, firestore, uid, proj, fname, lname, date) => {
	firestore
		.collection("users")
		.doc(uid)
		.collection("user_projects")
		.doc(projID)
		.set({
			...proj,
			authorFirstName: fname,
			authorLastName: lname,
			authorID: uid,
			createdAt: date
		})
		.then()
		.catch();
	console.log("USER PROJECT ADDED");
};
*/

export const createProject = (project) => {
	return (dispatch, getState, { getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const fname = getState().firebase.profile.firstName;
		const lname = getState().firebase.profile.lastName;
		const uid = getState().firebase.auth.uid;
		const date = new Date();
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: fname,
				authorLastName: lname,
				authorID: uid,
				createdAt: date
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
			})
			.catch((err) => {
				dispatch({ type: "CREATE_PROJECT_ERROR", err });
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
