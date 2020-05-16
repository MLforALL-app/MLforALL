const appendProjectToUser = (projID, firestore, uid) => {
	const userRef = firestore.collection("users").doc(uid);
	userRef.get().then((doc) => {
		const userData = doc.data();
		// is there cleaner way to do this besides push?
		var updated = userData.projects;
		const length = updated.push(projID);
		userRef.update({
			...userData,
			projects: updated
		});
	});
};

export const createProject = (project) => {
	return (dispatch, getState, { getFirebase, getFirestore }) => {
		// make async call to database
		const firestore = getFirestore();
		const profile = getState().firebase.profile;
		const authorID = getState().firebase.auth.uid;
		firestore
			.collection("projects")
			.add({
				...project,
				authorFirstName: profile.firstName,
				authorLastName: profile.lastName,
				authorID,
				createdAt: new Date()
			})
			.then((t) => {
				// Add projectID to user
				appendProjectToUser(t.id, firestore, authorID);
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
